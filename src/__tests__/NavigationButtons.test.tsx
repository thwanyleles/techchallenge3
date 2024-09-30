import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavigationButtons from '../components/NavigationButtons';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/hooks/useAuth', () => ({
    useAuth: jest.fn(),
}));

describe('NavigationButtons Component', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        jest.clearAllMocks();
    });

    test('renders home button', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: null });

        render(<NavigationButtons />);

        expect(screen.getByLabelText('Página Inicial')).toBeInTheDocument();
        expect(screen.queryByText((content, element) => {
            return element?.textContent === 'Sala do Professor';
        })).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Criar Post')).not.toBeInTheDocument();
    });

    test('navigates to home when clicking on home button', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: null });

        render(<NavigationButtons />);

        fireEvent.click(screen.getByLabelText('Página Inicial'));
        expect(mockPush).toHaveBeenCalledWith('/');
    });

    test('renders Sala do Professor button when user is authenticated', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: { id: '1', name: 'John Doe' } });

        render(<NavigationButtons />);

        expect(screen.getByText('Sala do Professor')).toBeInTheDocument();
    });

    test('navigates to admin page when clicking on Sala do Professor button', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: { id: '1', name: 'John Doe' } });

        render(<NavigationButtons />);

        fireEvent.click(screen.getByText('Sala do Professor'));
        expect(mockPush).toHaveBeenCalledWith('/admin');
    });

    test('renders Novo Post button when user is authenticated', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: { id: '1', name: 'John Doe' } });

        render(<NavigationButtons />);

        expect(screen.getByLabelText('Criar Post')).toBeInTheDocument();
    });

    test('navigates to create post page when clicking on Novo Post button', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: { id: '1', name: 'John Doe' } });

        render(<NavigationButtons />);

        fireEvent.click(screen.getByLabelText('Criar Post'));
        expect(mockPush).toHaveBeenCalledWith('/create-post');
    });
});