'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from "@/services/api";
import { FaSave } from 'react-icons/fa';
import NavigationButtons from '@/components/NavigationButtons';

const EditPostPage: React.FC = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ title: '', content: '', author: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('Erro ao buscar post:', error);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await api.put(`/posts/${id}`, post);
            alert('Post atualizado com sucesso!');
            router.push(`/post/${id}`);
        } catch (error) {
            console.error('Erro ao atualizar post:', error);
            alert('Erro ao atualizar post. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    if (!post) return <p>Carregando...</p>;

    return (
        <div className="container mx-auto p-4">
            <NavigationButtons />
            <h1 className="text-2xl font-bold mb-4" style={{ color: '#8A8A8A' }}>Editando Post</h1>
            <div className="bg-white p-6 rounded shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium" style={{ color: '#8A8A8A' }}>Título</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="author" className="block text-sm font-medium" style={{ color: '#8A8A8A' }}>Autor</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={post.author}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium" style={{ color: '#8A8A8A' }}>Conteúdo</label>
                        <textarea
                            id="content"
                            name="content"
                            value={post.content}
                            onChange={handleChange}
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

export default EditPostPage;
