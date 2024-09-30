import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostForm from '../components/PostForm';
import api from '../services/api';

jest.mock('../services/api');

describe('PostForm Component', () => {
    const mockOnSubmitSuccess = jest.fn();
    const initialData = { id: '1', title: 'Initial Title', content: 'Initial Content', author: 'Initial Author' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the post form', () => {
        render(<PostForm onSubmitSuccess={mockOnSubmitSuccess} />);

        expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/conteúdo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/autor/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /salvar post/i })).toBeInTheDocument();
    });

    test('submits the post successfully', async () => {
        (api.post as jest.Mock).mockResolvedValue({ data: {} });

        render(<PostForm onSubmitSuccess={mockOnSubmitSuccess} />);

        fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Post Title' } });
        fireEvent.change(screen.getByLabelText(/conteúdo/i), { target: { value: 'This is a test content.' } });
        fireEvent.change(screen.getByLabelText(/autor/i), { target: { value: 'John Doe' } });

        fireEvent.click(screen.getByRole('button', { name: /salvar post/i }));

        await waitFor(() => {
            expect(mockOnSubmitSuccess).toHaveBeenCalled();
        });
    });

    test('does not submit when fields are empty', () => {
        render(<PostForm onSubmitSuccess={mockOnSubmitSuccess} />);

        fireEvent.click(screen.getByRole('button', { name: /salvar post/i }));

        expect(mockOnSubmitSuccess).not.toHaveBeenCalled();
    });

    test('shows alert on error', async () => {
        (api.post as jest.Mock).mockRejectedValue(new Error('Error'));
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(<PostForm onSubmitSuccess={mockOnSubmitSuccess} />);

        fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Post Title' } });
        fireEvent.change(screen.getByLabelText(/conteúdo/i), { target: { value: 'This is a test content.' } });
        fireEvent.change(screen.getByLabelText(/autor/i), { target: { value: 'John Doe' } });

        fireEvent.click(screen.getByRole('button', { name: /salvar post/i }));

        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith('Erro ao salvar post. Tente novamente.');
        });

        alertSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    test('updates the post successfully', async () => {
        (api.put as jest.Mock).mockResolvedValue({ data: {} });

        render(<PostForm initialData={initialData} onSubmitSuccess={mockOnSubmitSuccess} />);

        fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Updated Title' } });
        fireEvent.change(screen.getByLabelText(/conteúdo/i), { target: { value: 'Updated Content' } });
        fireEvent.change(screen.getByLabelText(/autor/i), { target: { value: 'Updated Author' } });

        fireEvent.click(screen.getByRole('button', { name: /salvar post/i }));

        await waitFor(() => {
            expect(api.put).toHaveBeenCalledWith('/posts/1', {
                title: 'Updated Title',
                content: 'Updated Content',
                author: 'Updated Author',
            });
            expect(mockOnSubmitSuccess).toHaveBeenCalled();
        });
    });
});