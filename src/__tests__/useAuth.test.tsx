import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import AuthContext from '../contexts/AuthContext';
import { User } from '@/types/User';

const mockUser: User = {
    id: '1',
    username: 'Test User',
    email: 'test@example.com',
};

const TestComponent = () => {
    const { user } = useAuth();
    return <div>{user ? 'Auth is available' : 'No User'}</div>;
};

const TestComponentWithoutProvider = () => {
    return <TestComponent />;
};

const TestComponentWithProvider = () => {
    return (
        <AuthContext.Provider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
            <TestComponent />
        </AuthContext.Provider>
    );
};

describe('useAuth', () => {
    it('should throw an error when used outside of AuthProvider', () => {
        console.error = jest.fn();

        expect(() => render(<TestComponentWithoutProvider />)).toThrow(
            'useAuth must be used within an AuthProvider'
        );

        expect(console.error).toHaveBeenCalled();
    });

    it('should return context value when used within AuthProvider', () => {
        render(<TestComponentWithProvider />);
        expect(screen.getByText('Auth is available')).toBeInTheDocument();
    });
});