'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../services/api';
import { BsFillPlusCircleFill } from 'react-icons/bs';

interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
}

const PostList = () => {
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

    const handleReadMore = (id: string) => {
        router.push(`/post/${id}`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {posts.map((post) => (
                <div key={post.id} className="p-4 border rounded shadow-md bg-white flex flex-col">
                    <h2 className="text-xl font-bold text-gray-800 text-center">{post.title}</h2>
                    <hr className="my-2 border-gray-300" />
                    <p className="text-gray-700 mt-2 flex-grow text-center">{post.content.substring(0, 100)}...</p>
                    <hr className="my-2 border-gray-300" />
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">Autor: {post.author}</span>
                        <button
                            onClick={() => handleReadMore(post.id)}
                            className="flex items-center text-black hover:text-gray-700"
                        >
                            <BsFillPlusCircleFill size={20} className="text-[#E35D5D] mr-1" />
                            <span>Continuar Lendo</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;
