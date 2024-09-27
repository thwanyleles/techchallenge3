'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../services/api';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { username, email, password });
            alert('Registrado com sucesso! Faça login para continuar.');
            router.push('/login');
        } catch (error) {
            console.error('Erro ao registrar:', error);
            alert('Erro ao registrar. Tente novamente.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#201F1F] px-4">
            <h1 className="text-2xl font-bold mb-4 text-white">Registrar</h1>
            <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Nome
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        E-mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                        required
                    />
                </div>
                <div className="flex space-x-2">
                    <button
                        type="submit"
                        className="flex-1 bg-[#E35D5D] text-white py-2 rounded hover:bg-red-600"
                    >
                        Registrar
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/login')}
                        className="flex-1 bg-gray-300 text-[#E35D5D] py-2 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
