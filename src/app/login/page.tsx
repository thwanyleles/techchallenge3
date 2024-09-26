'use client';

import React from 'react';
import LoginForm from "@/components/LoginForm";

const LoginPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
