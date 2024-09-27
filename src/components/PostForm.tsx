'use client';

import React, { useState } from 'react';
import api from '../services/api';

interface PostFormProps {
    initialData?: {
        id?: string;
        title: string;
        content: string;
        author: string;
    };
    onSubmitSuccess: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ initialData, onSubmitSuccess }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [author, setAuthor] = useState(initialData?.author || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (initialData?.id) {
                await api.put(`/posts/${initialData.id}`, { title, content, author });
            } else {
                await api.post('/posts', { title, content, author });
            }
            onSubmitSuccess();
        } catch (error) {
            console.error('Erro ao salvar post:', error);
            alert('Erro ao salvar post. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Título
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Conteúdo
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    rows={5}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                    Autor
                </label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Salvando...' : 'Salvar Post'}
            </button>
        </form>
    );
};

export default PostForm;
