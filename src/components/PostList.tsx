'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../services/api';

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
        <div className="space-y-4">
            {posts.map((post) => (
                <div key={post.id} className="p-4 border rounded shadow-sm bg-white">
                    <h2 className="text-xl font-bold">{post.title}</h2>
                    <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
                    <div className="text-sm text-gray-500">
                        <p>Autor: {post.author}</p>
                        <p>Data: {new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                    <button
                        onClick={() => handleReadMore(post.id)}
                        className="mt-2 text-blue-500 hover:underline"
                    >
                        Continuar Lendo
                    </button>
                </div>
            ))}
        </div>
    );
};

export default PostList;
