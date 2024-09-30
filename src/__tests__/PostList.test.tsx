import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostList from '../components/PostList';
import api from '../services/api';
import { useRouter } from 'next/navigation';

jest.mock('../services/api');
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('PostList Component', () => {
    const mockPosts = [
        { id: '1', title: 'Post 1', content: 'Content 1', author: 'Author 1', createdAt: '2023-01-01' },
        { id: '2', title: 'Post 2', content: 'Content 2', author: 'Author 2', createdAt: '2023-01-02' },
    ];
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    beforeEach(() => {
        (api.get as jest.Mock).mockResolvedValue({ data: mockPosts });

        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
        });
    });

    test('renders the component and displays posts', async () => {
        render(<PostList />);

        expect(screen.getByText('Últimos Posts:')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Post 1')).toBeInTheDocument();
            expect(screen.getByText('Post 2')).toBeInTheDocument();
        });
    });

    test('allows searching for posts', async () => {
        render(<PostList />);

        await waitFor(() => {
            expect(screen.getByText('Post 1')).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText('Buscar posts...');
        fireEvent.change(searchInput, { target: { value: 'Post 1' } });

        expect(screen.getByText('Post 1')).toBeInTheDocument();
        expect(screen.queryByText('Post 2')).not.toBeInTheDocument();
    });

    test('logs error when fetching posts fails', async () => {
        (api.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

        render(<PostList />);

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao buscar posts:', expect.any(Error));
        });

        consoleErrorSpy.mockRestore();
    });
});