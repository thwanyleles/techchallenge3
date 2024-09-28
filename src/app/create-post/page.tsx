'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from "@/services/api";
import { FaSave } from 'react-icons/fa';
import NavigationButtons from '@/components/NavigationButtons';

const CreatePostPage: React.FC = () => {
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
            <NavigationButtons />
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#8A8A8A' }}>Novo Post</h2>
            <div className="bg-white p-6 rounded shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium" style={{ color: '#8A8A8A' }}>Título</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="author" className="block text-sm font-medium" style={{ color: '#8A8A8A' }}>Autor</label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium" style={{ color: '#8A8A8A' }}>Conteúdo</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900"
                            rows={5}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center bg-[#E35D5D] text-white py-2 px-4 rounded hover:bg-red-600 disabled:opacity-50"
                        >
                            <FaSave className="mr-1" />
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePostPage;
