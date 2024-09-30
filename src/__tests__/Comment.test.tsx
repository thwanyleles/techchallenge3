import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Comment from '../components/Comment';
import { Comment as CommentType } from '../types/Comment';

describe('Comment Component', () => {
    const mockComment: CommentType = {
        id: '1',
        post_id: '123',
        author: 'John Doe',
        content: 'This is a test comment.',
        created_at: new Date().toISOString(),
    };

    const mockOnDelete = jest.fn();

    test('renders comment with author, content, and timestamp', () => {
        render(<Comment {...mockComment} onDelete={mockOnDelete} isLoggedIn={false} />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('This is a test comment.')).toBeInTheDocument();
        expect(screen.getByText(new Date(mockComment.created_at).toLocaleString())).toBeInTheDocument();
    });

    test('does not show delete button when user is not logged in', () => {
        render(<Comment {...mockComment} onDelete={mockOnDelete} isLoggedIn={false} />);

        const deleteButton = screen.queryByRole('button', { name: /delete comment/i });
        expect(deleteButton).not.toBeInTheDocument();
    });

    test('shows delete button when user is logged in', () => {
        render(<Comment {...mockComment} onDelete={mockOnDelete} isLoggedIn={true} />);

        const deleteButton = screen.getByRole('button', { name: /delete comment/i });
        expect(deleteButton).toBeInTheDocument();
    });

    test('calls onDelete when delete button is clicked', () => {
        render(<Comment {...mockComment} onDelete={mockOnDelete} isLoggedIn={true} />);

        const deleteButton = screen.getByRole('button', { name: /delete comment/i });
        fireEvent.click(deleteButton);

        expect(mockOnDelete).toHaveBeenCalledWith(mockComment.id);
    });
});