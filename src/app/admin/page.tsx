'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { usePosts } from '@/hooks/usePosts';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';

const AdminPage = () => {
    const { user } = useAuth();
    const posts = usePosts();
    const router = useRouter();

    if (!user) {
        return <p>Acesso negado. Você precisa estar logado para acessar esta página.</p>;
    }

    const handleEdit = (id: string) => {
        router.push(`/post/${id}/edit`);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este post?')) {
            try {
                await api.delete(`/posts/${id}`);
            } catch (error) {
                console.error('Erro ao excluir post:', error);
                alert('Erro ao excluir post. Tente novamente.');
            }
        }
    };

    const handleCreatePost = () => {
        router.push('/create-post');
    };

    return (
        <div className="container mx-auto p-4">
            <button onClick={() => router.back()} className="mb-4 bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600">Voltar</button>
            <h1 className="text-2xl font-bold mb-4">Sala do Professor</h1>
            <button onClick={handleCreatePost} className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Criar Novo Post
            </button>
            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post.id} className="p-4 border rounded shadow-sm bg-white">
                        <h2 className="text-xl font-bold">{post.title}</h2>
                        <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
                        <div className="text-sm text-gray-500">
                            <p>Autor: {post.author}</p>
                            <p>Data: {new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                        <button onClick={() => handleEdit(post.id)} className="mt-2 mr-2 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">Editar</button>
                        <button onClick={() => handleDelete(post.id)} className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Excluir</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
