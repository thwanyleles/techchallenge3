'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const Footer: React.FC = () => {
    const router = useRouter();
    const { user } = useAuth();

    return (
        <footer className="bg-[#141414] text-white py-4 mt-8">
            <div className="container mx-auto flex justify-between items-start px-4">
                <div className="flex flex-col items-start space-y-2">
                    <button onClick={() => router.push('/')} className="hover:underline">
                        Home
                    </button>
                    <button
                        onClick={() => {
                            if (user) {
                                router.push('/create-post');
                            } else {
                                alert('Você precisa estar logado para criar um post.');
                                router.push('/login');
                            }
                        }}
                        className={`hover:underline ${user ? '' : 'opacity-50 cursor-not-allowed'}`}
                        disabled={!user}
                    >
                        Criar Post
                    </button>
                    <button onClick={() => router.push('/admin')} className="hover:underline">
                        Sala do Professor
                    </button>
                    <div className="text-sm text-left mt-2">
                        © 2024 - Bloguinho - Todos os direitos reservados
                    </div>
                </div>
                <div className="text-lg font-bold">
                    <img src="/bloguinho-logo.svg" alt="Bloguinho Logo" className="h-14" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
