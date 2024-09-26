'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../services/api';

const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await api.post('/posts', { title, content, author });
            alert('Post criado com sucesso!');
            router.push('/');
        } catch (error) {
            console.error('Erro ao criar post:', error);
            alert('Erro ao criar post. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={() => router.back()}
                className="mb-4 bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
            >
                Voltar
            </button>
            <h1 className="text-2xl font-bold mb-4">Criar Novo Post</h1>
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
                    {isSubmitting ? 'Criando...' : 'Criar Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePostPage;
