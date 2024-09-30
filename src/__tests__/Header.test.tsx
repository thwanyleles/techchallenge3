import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

jest.mock('@/hooks/useAuth');
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Header Component', () => {
    const mockLogout = jest.fn();
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        jest.clearAllMocks();
    });

    test('renders login button when user is not authenticated', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: null, logout: mockLogout });

        render(<Header />);

        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.queryByText('Sair')).not.toBeInTheDocument();
    });

    test('renders user info and logout button when user is authenticated', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: { username: 'JohnDoe' }, logout: mockLogout });

        render(<Header />);

        expect(screen.getByText('JohnDoe')).toBeInTheDocument();
        expect(screen.getByText('Sair')).toBeInTheDocument();
    });

    test('navigates to login page when clicking Login button', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: null, logout: mockLogout });

        render(<Header />);

        fireEvent.click(screen.getByText('Login'));
        expect(mockPush).toHaveBeenCalledWith('/login');
    });

    test('calls logout and navigates to home when clicking Logout button', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: { username: 'JohnDoe' }, logout: mockLogout });

        render(<Header />);

        fireEvent.click(screen.getByText('Sair'));

        expect(mockLogout).toHaveBeenCalled();
        expect(mockPush).toHaveBeenCalledWith('/');
    });
});