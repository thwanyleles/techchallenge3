'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from "@/services/api";
import { useAuth } from '@/hooks/useAuth';
import { FaHome } from 'react-icons/fa';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaPencilAlt } from 'react-icons/fa';

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
            <header className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => router.push('/')}
                        className="bg-[#E35D5D] p-2 rounded hover:bg-red-600 flex items-center"
                    >
                        <FaHome className="text-white" size={24} />
                    </button>
                    {user && (
                        <button
                            onClick={() => router.push('/admin')}
                            className="bg-[#E0E0E0] text-black py-2 px-4 rounded hover:bg-gray-300"
                        >
                            Sala do Professor
                        </button>
                    )}
                </div>
                {user && (
                    <button
                        onClick={() => router.push('/create-post')}
                        className="bg-[#E35D5D] text-white py-2 px-4 rounded hover:bg-red-600 flex items-center"
                    >
                        <BsFillPlusCircleFill className="mr-1" />
                        Novo Post
                    </button>
                )}
            </header>

            <div className="bg-white p-6 rounded shadow-md">
                <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
                <hr className="my-2 border-gray-300" />
                <div className="text-gray-700">{post.content}</div>
                <hr className="my-2 border-gray-300" />
                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">Autor: {post.author}</span>
                    {user && (
                        <button
                            onClick={handleEdit}
                            className="bg-[#E35D5D] text-white py-2 px-4 rounded hover:bg-red-600 flex items-center"
                        >
                            <FaPencilAlt size={20} className="mr-1" />
                            <span>Alterar</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostPage;
