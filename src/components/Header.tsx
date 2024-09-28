'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import Image from 'next/image';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <header className="bg-[#E35D5D] text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
                <Image
                    src="/bloguinho-logo.svg"
                    alt="Bloguinho Logo"
                    className="h-8 mr-2"
                    width={128}
                    height={128}
                />
            </div>
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <div className="flex items-center">
                            <FaUser className="mr-1" />
                            <span className="font-medium">{user.username}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 hover:text-gray-200 focus:outline-none"
                        >
                            <FiLogOut size={20} />
                            <span>Sair</span>
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => router.push('/login')}
                        className="hover:text-gray-200 focus:outline-none"
                    >
                        Login
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
