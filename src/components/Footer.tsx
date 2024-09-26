'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Footer: React.FC = () => {
    const router = useRouter();

    return (
        <footer className="bg-gray-800 text-white py-4 mt-8">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex space-x-4">
                    <button onClick={() => router.push('/')} className="hover:underline">
                        Home
                    </button>
                    <button onClick={() => router.push('/create-post')} className="hover:underline">
                        Criar Post
                    </button>
                    <button onClick={() => router.push('/admin')} className="hover:underline">
                        Sala do Professor
                    </button>
                </div>
                <div className="text-sm">
                    © 2024 - Bloguinho - Todos os direitos reservados
                </div>
            </div>
        </footer>
    );
};

export default Footer;
