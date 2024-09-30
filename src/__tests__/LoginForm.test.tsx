import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

jest.mock('../hooks/useAuth');
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('LoginForm Component', () => {
    const mockLogin = jest.fn();
    const mockPush = jest.fn();

    beforeEach(() => {
        (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        jest.clearAllMocks();
    });

    test('renders the login form', () => {
        render(<LoginForm />);

        expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
    });

    test('calls login function and navigates on successful login', async () => {
        mockLogin.mockResolvedValueOnce(undefined);

        render(<LoginForm />);

        fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(mockPush).toHaveBeenCalledWith('/');
        });
    });

    test('shows alert on login error', async () => {
        mockLogin.mockRejectedValueOnce(new Error('Login failed'));

        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(<LoginForm />);

        fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'wrongpassword' } });

        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith('Erro ao fazer login. Verifique suas credenciais.');
        });

        alertSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    test('navigates to register page on register button click', () => {
        render(<LoginForm />);

        fireEvent.click(screen.getByRole('button', { name: /registrar/i }));

        expect(mockPush).toHaveBeenCalledWith('/register');
    });
});