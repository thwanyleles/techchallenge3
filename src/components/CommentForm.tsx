import React, { useState } from 'react';
import api from '../services/api';
import { CommentFormProps } from '@/types/CommentFormProps';

const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentSuccess }) => {
    const [newComment, setNewComment] = useState('');
    const [authorName, setAuthorName] = useState('');

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !authorName.trim()) return;

        try {
            const response = await api.post(`/posts/${postId}/comments`, {
                author: authorName,
                content: newComment,
            });
            onCommentSuccess(response.data);
            setNewComment('');
            setAuthorName('');
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
            alert('Erro ao adicionar comentário. Tente novamente.');
        }
    };

    return (
        <form onSubmit={handleCommentSubmit} className="mt-4">
            <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Seu nome"
                className="w-full p-2 border rounded mb-2"
                style={{ color: 'black' }}
            />
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Deixe seu comentário..."
                className="w-full p-2 border rounded"
                rows={4}
                required
                style={{ color: 'black' }}
            />
            <button type="submit" className="mt-2 bg-[#E35D5D] text-white py-2 px-4 rounded hover:bg-red-600">
                Comentar
            </button>
        </form>
    );
};

export default CommentForm;
