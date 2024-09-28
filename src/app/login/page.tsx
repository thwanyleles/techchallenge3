'use client';

import React from 'react';
import Image from 'next/image';
import LoginForm from "@/components/LoginForm";

const LoginPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#201F1F] px-4">
            <Image
                src="/bloguinho-logo.svg"
                alt="Bloguinho Logo"
                className="h-20 mb-4"
                width={500}
                height={500}
            />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
