import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthContext, { AuthProvider } from '../contexts/AuthContext';
import api from '../services/api';

jest.mock('../services/api');

describe('AuthProvider', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('login stores user and token in localStorage', async () => {
        const mockUser = { id: '1', username: 'Biridin', email: 'thwany@email.com' };
        const mockToken = 'mockToken';
        (api.post as jest.Mock).mockResolvedValueOnce({
            data: { token: mockToken, user: mockUser }
        });

        const TestComponent = () => {
            const context = React.useContext(AuthContext);
            if (!context) return <div>No Auth Context</div>;

            const { login, user } = context;
            return (
                <div>
                    <button onClick={() => login('john@example.com', 'password')}>
                        Log In
                    </button>
                    {user && <span>{user.username}</span>}
                </div>
            );
        };

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.click(screen.getByText('Log In'));

        await waitFor(() => {
            expect(screen.getByText('Biridin')).toBeInTheDocument();
        });

        expect(localStorage.getItem('user')).toEqual(JSON.stringify(mockUser));
        expect(localStorage.getItem('token')).toEqual(mockToken);
    });

    test('AuthContext is null when not inside AuthProvider', () => {
        const TestComponent = () => {
            const context = React.useContext(AuthContext);
            return <div>{context ? 'Has Context' : 'No Context'}</div>;
        };

        render(<TestComponent />);
        expect(screen.getByText('No Context')).toBeInTheDocument();
    });

    test('logs out user and clears context', () => {
        const mockUser = { id: '1', username: 'John Doe', email: 'john@example.com' };
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', 'mockToken');

        const TestComponent = () => {
            const context = React.useContext(AuthContext);
            if (!context) return <div>No Auth Context</div>;

            const { logout, user } = context;
            return (
                <div>
                    <span>{user ? user.username : 'No User'}</span>
                    <button onClick={logout}>Log Out</button>
                </div>
            );
        };

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.click(screen.getByText('Log Out'));

        expect(screen.getByText('No User')).toBeInTheDocument();
        expect(localStorage.getItem('user')).toBeNull();
        expect(localStorage.getItem('token')).toBeNull();
    });
});