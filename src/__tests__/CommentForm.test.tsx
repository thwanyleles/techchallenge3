import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CommentForm from '../components/CommentForm';
import api from '../services/api';

jest.mock('../services/api', () => ({
    post: jest.fn(),
}));

describe('CommentForm Component', () => {
    const mockPostId = '1';
    const mockOnCommentSuccess = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the comment form', () => {
        render(<CommentForm postId={mockPostId} onCommentSuccess={mockOnCommentSuccess} />);

        expect(screen.getByPlaceholderText('Seu nome')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Deixe seu comentário...')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /comentar/i })).toBeInTheDocument();
    });

    test('submits the comment successfully', async () => {
        (api.post as jest.Mock).mockResolvedValue({ data: { id: '1', author: 'John Doe', content: 'Test comment' } });

        render(<CommentForm postId={mockPostId} onCommentSuccess={mockOnCommentSuccess} />);

        fireEvent.change(screen.getByPlaceholderText('Seu nome'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Deixe seu comentário...'), { target: { value: 'Test comment' } });

        fireEvent.click(screen.getByRole('button', { name: /comentar/i }));

        await waitFor(() => {
            expect(mockOnCommentSuccess).toHaveBeenCalledWith({ id: '1', author: 'John Doe', content: 'Test comment' });
        });
        expect(screen.getByPlaceholderText('Seu nome')).toHaveValue('');
        expect(screen.getByPlaceholderText('Deixe seu comentário...')).toHaveValue('');
    });

    test('does not submit when fields are empty', () => {
        render(<CommentForm postId={mockPostId} onCommentSuccess={mockOnCommentSuccess} />);

        fireEvent.click(screen.getByRole('button', { name: /comentar/i }));

        expect(mockOnCommentSuccess).not.toHaveBeenCalled();
    });

    test('shows alert on error', async () => {
        (api.post as jest.Mock).mockRejectedValue(new Error('Error'));
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(<CommentForm postId={mockPostId} onCommentSuccess={mockOnCommentSuccess} />);

        fireEvent.change(screen.getByPlaceholderText('Seu nome'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Deixe seu comentário...'), { target: { value: 'Test comment' } });

        fireEvent.click(screen.getByRole('button', { name: /comentar/i }));

        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith('Erro ao adicionar comentário. Tente novamente.');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao adicionar comentário:', expect.any(Error));
        });

        alertSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    test('does not submit when fields are empty or whitespace', () => {
        render(<CommentForm postId={mockPostId} onCommentSuccess={mockOnCommentSuccess} />);

        fireEvent.click(screen.getByRole('button', { name: /comentar/i }));
        expect(mockOnCommentSuccess).not.toHaveBeenCalled();

        // Attempt to submit with whitespace fields
        fireEvent.change(screen.getByPlaceholderText('Seu nome'), { target: { value: ' ' } });
        fireEvent.change(screen.getByPlaceholderText('Deixe seu comentário...'), { target: { value: ' ' } });
        fireEvent.click(screen.getByRole('button', { name: /comentar/i }));
        expect(mockOnCommentSuccess).not.toHaveBeenCalled();
    });
});