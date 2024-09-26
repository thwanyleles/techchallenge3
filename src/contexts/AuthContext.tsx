import React, { createContext, useEffect, useState, ReactNode } from 'react';
import api from '../services/api';
import { User } from '@/types/User';

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUserString = localStorage.getItem('user');
        if (storedUserString) {
            try {
                const storedUser: User = JSON.parse(storedUserString);
                setUser(storedUser);
                console.log('Usuário recuperado do localStorage:', storedUser);
            } catch (error) {
                console.error('Erro ao analisar o JSON do usuário armazenado:', error);
            }
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            console.log('Tentando logar com:', username);
            const response = await api.post('/auth/login', { username, password });
            console.log('Resposta da API:', response.data);
            const { token, user } = response.data;
            if (!user) {
                console.error('Usuário não encontrado na resposta da API');
                return;
            }
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            console.log('Usuário logado:', user);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        console.log('Usuário deslogado');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
