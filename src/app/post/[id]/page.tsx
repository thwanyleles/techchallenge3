'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from "@/services/api";
import { useAuth } from '@/hooks/useAuth';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const { user } = useAuth();
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

    const handleEdit = () => {
        router.push(`/post/${id}/edit`);
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
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <div className="text-gray-700">{post.content}</div>
            <div className="text-sm text-gray-500">
                <p>Autor: {post.author}</p>
                <p>Data: {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
            {user && (
                <button
                    onClick={handleEdit}
                    className="mt-4 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                >
                    Editar
                </button>
            )}
        </div>
    );
};

export default PostPage;
