'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from "@/services/api";
import { useAuth } from '@/hooks/useAuth';
import { FaPencilAlt } from 'react-icons/fa';
import { Post } from "@/types/Post";
import NavigationButtons from '@/components/NavigationButtons';

const PostPage: React.FC = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
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
            <NavigationButtons />
            <div className="bg-white p-6 rounded shadow-md">
                <h1 className="text-3xl font-bold" style={{ color: '#8A8A8A' }}>{post.title}</h1>
                <hr className="my-2 border-gray-300" />
                <div className="text-gray-700" style={{ color: '#8A8A8A' }}>{post.content}</div>
                <hr className="my-2 border-gray-300" />
                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm" style={{ color: '#8A8A8A' }}>Autor: {post.author}</span>
                    {user && (
                        <button
                            onClick={handleEdit}
                            className="bg-[#E35D5D] text-white py-2 px-4 rounded hover:bg-red-600 flex items-center"
                        >
                            <FaPencilAlt size={20} className="mr-1" />
                            <span>Editar Post</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostPage;
