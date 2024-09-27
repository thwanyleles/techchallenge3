'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from "@/services/api";
import { FaSave } from 'react-icons/fa'; // Ícone de salvar
import { FaHome } from 'react-icons/fa'; // Ícone de casa
import { BsFillPlusCircleFill } from 'react-icons/bs'; // Ícone de adição

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
            <header className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => router.push('/')}
                        className="bg-[#E35D5D] p-2 rounded hover:bg-red-600 flex items-center"
                    >
                        <FaHome className="text-white" size={24} />
                    </button>
                    <button
                        onClick={() => router.push('/admin')}
                        className="bg-[#E0E0E0] text-black py-2 px-4 rounded hover:bg-gray-300"
                    >
                        Sala do Professor
                    </button>
                </div>
                <button
                    onClick={() => router.push('/create-post')}
                    className="bg-[#E35D5D] text-white py-2 px-4 rounded hover:bg-red-600 flex items-center"
                >
                    <BsFillPlusCircleFill className="mr-1" />
                    Novo Post
                </button>
            </header>

            <div className="bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Criar Post</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Título
                        </label>
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
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                            Autor
                        </label>
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
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Conteúdo
                        </label>
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
                            className="flex items-center bg-[#E35D5D] text-white py-2 px-4 rounded hover:bg-red-600"
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
