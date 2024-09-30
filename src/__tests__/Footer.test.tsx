import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/hooks/useAuth', () => ({
    useAuth: jest.fn(),
}));

describe('Footer Component', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        jest.clearAllMocks();
    });

    test('renders the footer with all buttons', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: null });

        render(<Footer />);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Criar Post')).toBeInTheDocument();
        expect(screen.getByText('Sala do Professor')).toBeInTheDocument();
        expect(screen.getByText(/© 2024 - Bloguinho - Todos os direitos reservados/i)).toBeInTheDocument();
    });

    test('navigates to home when clicking on Home button', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: null });

        render(<Footer />);

        fireEvent.click(screen.getByText('Home'));
        expect(mockPush).toHaveBeenCalledWith('/');
    });

    test('navigates to create post page if user is authenticated', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: { id: '1', name: 'John Doe' } });

        render(<Footer />);

        fireEvent.click(screen.getByText('Criar Post'));
        expect(mockPush).toHaveBeenCalledWith('/create-post');
    });

    test('navigates to admin page when clicking on Sala do Professor button', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: null });

        render(<Footer />);

        fireEvent.click(screen.getByText('Sala do Professor'));
        expect(mockPush).toHaveBeenCalledWith('/admin');
    });
});