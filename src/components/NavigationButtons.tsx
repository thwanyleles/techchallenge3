'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { FaHome } from 'react-icons/fa';
import { BsFillPlusCircleFill } from 'react-icons/bs';

const NavigationButtons: React.FC = () => {
    const { user } = useAuth();
    const router = useRouter();

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => router.push('/')}
                    className="bg-[#E35D5D] p-2 rounded hover:bg-red-600 flex items-center"
                    aria-label="Página Inicial"
                >
                    <FaHome className="text-white" size={24} />
                </button>
                {user && (
                    <button
                        onClick={() => router.push('/admin')}
                        className="bg-[#E0E0E0] text-black py-2 px-4 rounded hover:bg-gray-300"
                        aria-label="Sala do Professor"
                    >
                        Sala do Professor
                    </button>
                )}
            </div>
            {user && (
                <button
                    onClick={() => router.push('/create-post')}
                    className="bg-[#E35D5D] text-white py-2 px-4 rounded hover:bg-red-600 flex items-center"
                    aria-label="Criar Post"
                >
                    <BsFillPlusCircleFill className="mr-1" />
                    Novo Post
                </button>
            )}
        </div>
    );
};

export default NavigationButtons;
