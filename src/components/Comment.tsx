import React from 'react';
import { Comment as CommentType } from '../types/Comment';
import { FaTrash } from 'react-icons/fa';

interface CommentProps extends CommentType {
    onDelete: (id: string) => void;
    isLoggedIn: boolean;
}

const Comment: React.FC<CommentProps> = ({ id, author, content, created_at, onDelete, isLoggedIn }) => {
    return (
        <div className="border rounded-lg p-4 mb-4 shadow-md bg-white flex justify-between items-start">
            <div className="flex-1">
                <strong className="text-gray-800">{author || 'Anônimo'}</strong>
                <p className="text-gray-700">{content}</p>
                <span className="text-gray-500 text-sm">{new Date(created_at).toLocaleString()}</span>
            </div>
            {isLoggedIn && (
                <button
                    onClick={() => onDelete(id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                    title="Delete comment"
                >
                    <FaTrash size={20} />
                </button>
            )}
        </div>
    );
};

export default Comment;
