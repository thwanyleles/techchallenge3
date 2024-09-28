'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { FaPencilAlt } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Post } from "@/types/Post";

const AdminPage: React.FC = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Erro ao buscar posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleEdit = (id: string) => {
        router.push(`/post/${id}/edit`);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este post?')) {
            try {
                await api.delete(`/posts/${id}`);
                setPosts(posts.filter(post => post.id !== id));
            } catch (error) {
                console.error('Erro ao excluir post:', error);
                alert('Erro ao excluir post. Tente novamente.');
            }
        }
    };

    const handleCreatePost = () => {
        router.push('/create-post');
    };

    if (!user) {
        return <p>Acesso negado. Você precisa estar logado para acessar esta página.</p>;
    }

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
                </div>
                <button
                    onClick={handleCreatePost}
                    className="bg-[#E35D5D] text-white py-2 px-4 rounded hover:bg-red-600 flex items-center"
                >
                    <BsFillPlusCircleFill className="mr-1" />
                    Novo Post
                </button>
            </header>

            <h2 className="text-2xl font-bold mb-4" style={{ color: '#8A8A8A' }}>Sala do Professor</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {posts.map((post) => (
                    <div key={post.id} className="p-4 border rounded shadow-md bg-white flex flex-col">
                        <h2 className="text-xl font-bold text-center" style={{ color: '#8A8A8A' }}>{post.title}</h2>
                        <hr className="my-2 border-gray-300" />
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-sm" style={{ color: '#8A8A8A' }}>Autor: {post.author}</span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(post.id)}
                                    className="flex items-center text-black hover:text-gray-700"
                                >
                                    <FaPencilAlt size={20} className="text-[#E35D5D] mr-1" />
                                    <span style={{ color: '#8A8A8A' }}>Editar</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="flex items-center text-black hover:text-gray-700"
                                >
                                    <FaTrash size={20} className="text-[#E35D5D] mr-1" />
                                    <span style={{ color: '#8A8A8A' }}>Excluir</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
