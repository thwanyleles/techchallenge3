'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from "@/services/api";
import { FaPencilAlt } from 'react-icons/fa';
import { Post } from "@/types/Post";
import NavigationButtons from '@/components/NavigationButtons';
import Comment from '@/components/Comment';
import CommentForm from '@/components/CommentForm';
import { Comment as CommentType } from "@/types/Comment";
import { useAuth } from '@/hooks/useAuth';

const PostPage: React.FC = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<CommentType[]>([]);
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

        const fetchComments = async () => {
            try {
                const response = await api.get(`/posts/${id}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error('Erro ao buscar comentários:', error);
            }
        };

        if (id) {
            fetchPost();
            fetchComments();
        }
    }, [id]);

    const handleCommentSuccess = (newComment: CommentType) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    const handleCommentDelete = async (commentId: string) => {
        const confirmDelete = window.confirm("Você tem certeza que deseja excluir este comentário?");
        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/comments/${commentId}`);
            setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('Erro ao excluir comentário:', error);
            alert('Erro ao excluir comentário. Tente novamente.');
        }
    };

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
                        <div className="flex space-x-2">
                            <button
                                onClick={handleEdit}
                                className="bg-[#E35D5D] text-white py-2 px-4 rounded hover:bg-red-600 flex items-center"
                            >
                                <FaPencilAlt size={20} className="mr-1" />
                                <span>Editar Post</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white p-6 rounded shadow-md mt-4">
                <h2 className="text-xl font-bold" style={{ color: '#8A8A8A' }}>Comentários:</h2>
                <div>
                    {comments.map(comment => (
                        <Comment
                            key={comment.id}
                            id={comment.id}
                            author={comment.author}
                            content={comment.content}
                            created_at={comment.created_at}
                            onDelete={handleCommentDelete}
                            isLoggedIn={!!user}
                        />
                    ))}
                </div>
                <CommentForm postId={Array.isArray(id) ? id[0] : id} onCommentSuccess={handleCommentSuccess} />
            </div>
        </div>
    );
};

export default PostPage;
