'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PostList from '../components/PostList';
import { useAuth } from '@/hooks/useAuth';

const HomePage = () => {
    const { user } = useAuth();
    const router = useRouter();

    const handleCreatePost = () => {
        router.push('/create-post');
    };

    const handleProfessorRoom = () => {
        router.push('/admin');
    };

    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">EducaBlog</h1>
                <div>
                    {user ? (
                        <>
                            <button
                                onClick={handleCreatePost}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
                            >
                                Criar Novo Post
                            </button>
                            <button
                                onClick={handleProfessorRoom}
                                className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 mr-2"
                            >
                                Sala do Professor
                            </button>
                        </>
                    ) : (
                        <p className="text-gray-500">Faça login para acessar mais funcionalidades.</p>
                    )}
                </div>
            </header>
            <PostList />
        </div>
    );
};

export default HomePage;
