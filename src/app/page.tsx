'use client';

import React from 'react';

import NavigationButtons from '@/components/NavigationButtons';
import PostList from "@/components/PostList";

const HomePage: React.FC = () => {

    return (
        <div className="container mx-auto p-4">
            <header className="mb-6">
                <NavigationButtons />
            </header>
            <PostList />
        </div>
    );
};

export default HomePage;
