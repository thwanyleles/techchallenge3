'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PostList from '../components/PostList';
import { useAuth } from '@/hooks/useAuth';
import { FaHome } from 'react-icons/fa';
import { BsFillPlusCircleFill } from 'react-icons/bs';

const HomePage = () => {
    const { user } = useAuth();
    const router = useRouter();

    const handleCreatePost = () => {
        router.push('/create-post');
    };

    const handleProfessorRoom = () => {
        router.push('/admin');
    };

    const handleHomeRedirect = () => {
        router.push('/');
    };

    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleHomeRedirect}
                        className="bg-[#E35D5D] p-2 rounded hover:bg-red-600 flex items-center"
                    >
                        <FaHome className="text-white" size={24} />
                    </button>
                    {user && (
                        <button
                            onClick={handleProfessorRoom}
                            className="bg-[#E0E0E0] text-black py-2 px-4 rounded hover:bg-gray-300"
                        >
                            Sala do Professor
                        </button>
                    )}
                </div>
                <div>
                    {user && (
                        <button
                            onClick={handleCreatePost}
                            className="bg-[#E35D5D] text-white py-2 px-4 rounded hover:bg-red-600 flex items-center"
                        >
                            <BsFillPlusCircleFill className="mr-1" />
                            Novo Post
                        </button>
                    )}
                </div>
            </header>
            <PostList />
        </div>
    );
};

export default HomePage;
