import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import AuthService from '../../services/AuthService';

// Mock do AuthService
jest.mock('../../services/AuthService');
const mockedAuthService = AuthService as jest.Mocked<typeof AuthService>;

// Componente de teste para acessar o contexto
const TestComponent: React.FC = () => {
    const { user, isAuthenticated, loading, login, register, logout } = useAuth();

    return (
        <div>
            <div data-testid="loading">{loading ? 'true' : 'false'}</div>
            <div data-testid="authenticated">{isAuthenticated ? 'true' : 'false'}</div>
            <div data-testid="user-name">{user?.username || 'no user'}</div>
            <button onClick={() => login('test@example.com', 'password')}>Login</button>
            <button onClick={() => register('test@example.com', 'password', 'password')}>Register</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

describe('AuthContext', () => {
    beforeEach(() => {
        // Limpar mocks e localStorage antes de cada teste
        jest.clearAllMocks();
        localStorage.clear();
    });

    it('deve inicializar com valores padrão', () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(screen.getByTestId('loading')).toHaveTextContent('true');
        expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
        expect(screen.getByTestId('user-name')).toHaveTextContent('no user');
    });

    it('deve verificar a autenticação ao carregar', async () => {
        // Simular um usuário autenticado no localStorage
        const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('user', JSON.stringify(mockUser));

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Esperar que o loading termine
        await waitFor(() => {
            expect(screen.getByTestId('loading')).toHaveTextContent('false');
        });

        // Verificar que o usuário está autenticado
        expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
        expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');
    });

    it('deve fazer login com sucesso', async () => {
        // Mock da resposta de login
        const mockTokenResponse = {
            access: 'access-token',
            refresh: 'refresh-token',
        };

        const mockUserData = {
            id: '1',
            username: 'Test User',
            email: 'test@example.com',
        };

        mockedAuthService.login.mockResolvedValueOnce(mockTokenResponse);
        mockedAuthService.getProfile.mockResolvedValueOnce(mockUserData);

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Clicar no botão de login
        await act(async () => {
            userEvent.click(screen.getByText('Login'));
        });

        // Esperar que o loading termine
        await waitFor(() => {
            expect(screen.getByTestId('loading')).toHaveTextContent('false');
        });

        // Verificar que o login foi bem-sucedido
        expect(mockedAuthService.login).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'password',
        });

        expect(mockedAuthService.getProfile).toHaveBeenCalled();

        // Verificar que o usuário está autenticado
        expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
        expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');

        // Verificar que os tokens foram armazenados no localStorage
        expect(localStorage.getItem('token')).toBe('access-token');
        expect(localStorage.getItem('refreshToken')).toBe('refresh-token');
        expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUserData));
    });

    it('deve registrar um novo usuário com sucesso', async () => {
        // Mock da resposta de registro
        const mockTokenResponse = {
            access: 'access-token',
            refresh: 'refresh-token',
        };

        const mockUserData = {
            id: '1',
            username: 'Test User',
            email: 'test@example.com',
        };

        mockedAuthService.register.mockResolvedValueOnce(mockTokenResponse);
        mockedAuthService.getProfile.mockResolvedValueOnce(mockUserData);

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Clicar no botão de registro
        await act(async () => {
            userEvent.click(screen.getByText('Register'));
        });

        // Esperar que o loading termine
        await waitFor(() => {
            expect(screen.getByTestId('loading')).toHaveTextContent('false');
        });

        // Verificar que o registro foi bem-sucedido
        expect(mockedAuthService.register).toHaveBeenCalledWith({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password',
        });

        expect(mockedAuthService.getProfile).toHaveBeenCalled();

        // Verificar que o usuário está autenticado
        expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
        expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');

        // Verificar que os tokens foram armazenados no localStorage
        expect(localStorage.getItem('token')).toBe('access-token');
        expect(localStorage.getItem('refreshToken')).toBe('refresh-token');
        expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUserData));
    });

    it('deve fazer logout com sucesso', async () => {
        // Simular um usuário autenticado no localStorage
        const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('refreshToken', 'mock-refresh-token');
        localStorage.setItem('user', JSON.stringify(mockUser));

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Esperar que o loading termine
        await waitFor(() => {
            expect(screen.getByTestId('loading')).toHaveTextContent('false');
        });

        // Verificar que o usuário está autenticado
        expect(screen.getByTestId('authenticated')).toHaveTextContent('true');

        // Clicar no botão de logout
        await act(async () => {
            userEvent.click(screen.getByText('Logout'));
        });

        // Verificar que o logout foi bem-sucedido
        expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
        expect(screen.getByTestId('user-name')).toHaveTextContent('no user');

        // Verificar que os tokens foram removidos do localStorage
        expect(localStorage.getItem('token')).toBeNull();
        expect(localStorage.getItem('refreshToken')).toBeNull();
        expect(localStorage.getItem('user')).toBeNull();
    });
});

