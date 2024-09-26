'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import '../styles/globals.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
        <body className="bg-gray-900 text-white">
        <AuthProvider>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow container mx-auto p-4">
                    {children}
                </main>
                <Footer />
            </div>
        </AuthProvider>
        </body>
        </html>
    );
};

export default Layout;
