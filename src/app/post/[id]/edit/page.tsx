'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from "@/services/api";

const EditPostPage = () => {
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
            router.push(`/post/${id}`);  // Redireciona para a visualização do post atualizado
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
            <button
                onClick={() => router.back()}
                className="mb-4 bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
            >
                Voltar
            </button>
            <h1 className="text-2xl font-bold mb-4">Editar Post</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Título
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
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
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        rows={5}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </form>
        </div>
    );
};

export default EditPostPage;
