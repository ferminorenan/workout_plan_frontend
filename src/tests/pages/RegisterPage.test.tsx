import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import RegisterPage from '../../pages/RegisterPage';

// Mock do hook useAuth
jest.mock('../../contexts/AuthContext', () => {
    const originalModule = jest.requireActual('../../contexts/AuthContext');
    return {
        ...originalModule,
        useAuth: jest.fn(),
    };
});

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('RegisterPage', () => {
    beforeEach(() => {
        // Configuração padrão do mock
        mockUseAuth.mockReturnValue({
            user: null,
            isAuthenticated: false,
            loading: false,
            login: jest.fn().mockResolvedValue(true),
            register: jest.fn().mockResolvedValue(true),
            logout: jest.fn(),
        });
    });

    it('deve renderizar o formulário de registro', () => {
        render(
            <BrowserRouter>
                <RegisterPage />
            </BrowserRouter>
        );

        expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
    });

    it('deve chamar a função register com os dados corretos', async () => {
        const mockRegister = jest.fn().mockResolvedValue(true);
        mockUseAuth.mockReturnValue({
            user: null,
            isAuthenticated: false,
            loading: false,
            login: jest.fn().mockResolvedValue(true),
            register: mockRegister,
            logout: jest.fn(),
        });

        render(
            <BrowserRouter>
                <RegisterPage />
            </BrowserRouter>
        );

        // Preencher o formulário
        await userEvent.type(screen.getByLabelText(/nome/i), 'Test User');
        await userEvent.type(screen.getByLabelText(/e-mail/i), 'test@example.com');
        await userEvent.type(screen.getByLabelText(/senha/i), 'password123');
        await userEvent.type(screen.getByLabelText(/confirmar senha/i), 'password123');

        // Enviar o formulário
        await userEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

        // Verificar se a função register foi chamada com os dados corretos
        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalledWith('Test User', 'test@example.com', 'password123');
        });
    });

    it('deve mostrar erro quando as senhas não coincidem', async () => {
        render(
            <BrowserRouter>
                <RegisterPage />
            </BrowserRouter>
        );

        // Preencher o formulário com senhas diferentes
        await userEvent.type(screen.getByLabelText(/nome/i), 'Test User');
        await userEvent.type(screen.getByLabelText(/e-mail/i), 'test@example.com');
        await userEvent.type(screen.getByLabelText(/senha/i), 'password123');
        await userEvent.type(screen.getByLabelText(/confirmar senha/i), 'different');

        // Enviar o formulário
        await userEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

        // Verificar se a mensagem de erro é exibida
        expect(screen.getByText(/as senhas não coincidem/i)).toBeInTheDocument();
    });

    it('deve mostrar mensagem de erro quando o registro falha', async () => {
        const mockRegister = jest.fn().mockResolvedValue(false);
        mockUseAuth.mockReturnValue({
            user: null,
            isAuthenticated: false,
            loading: false,
            login: jest.fn().mockResolvedValue(true),
            register: mockRegister,
            logout: jest.fn(),
        });

        render(
            <BrowserRouter>
                <RegisterPage />
            </BrowserRouter>
        );

        // Preencher o formulário
        await userEvent.type(screen.getByLabelText(/nome/i), 'Test User');
        await userEvent.type(screen.getByLabelText(/e-mail/i), 'test@example.com');
        await userEvent.type(screen.getByLabelText(/senha/i), 'password123');
        await userEvent.type(screen.getByLabelText(/confirmar senha/i), 'password123');

        // Enviar o formulário
        await userEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

        // Verificar se a mensagem de erro é exibida
        await waitFor(() => {
            expect(screen.getByText(/erro ao cadastrar usuário/i)).toBeInTheDocument();
        });
    });

    it('deve mostrar indicador de carregamento durante o registro', async () => {
        // Mock da função register que demora para resolver
        const mockRegister = jest.fn().mockImplementation(
            () => new Promise(resolve => setTimeout(() => resolve(true), 100))
        );

        mockUseAuth.mockReturnValue({
            user: null,
            isAuthenticated: false,
            loading: false,
            login: jest.fn().mockResolvedValue(true),
            register: mockRegister,
            logout: jest.fn(),
        });

        render(
            <BrowserRouter>
                <RegisterPage />
            </BrowserRouter>
        );

        // Preencher o formulário
        await userEvent.type(screen.getByLabelText(/nome/i), 'Test User');
        await userEvent.type(screen.getByLabelText(/e-mail/i), 'test@example.com');
        await userEvent.type(screen.getByLabelText(/senha/i), 'password123');
        await userEvent.type(screen.getByLabelText(/confirmar senha/i), 'password123');

        // Enviar o formulário
        await userEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

        // Verificar se o indicador de carregamento é exibido
        expect(screen.getByRole('progressbar')).toBeInTheDocument();

        // Esperar o registro terminar
        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalled();
        });
    });

    it('deve validar o formato do email', async () => {
        render(
            <BrowserRouter>
                <RegisterPage />
            </BrowserRouter>
        );

        // Preencher o formulário com email inválido
        await userEvent.type(screen.getByLabelText(/nome/i), 'Test User');
        await userEvent.type(screen.getByLabelText(/e-mail/i), 'invalid-email');
        await userEvent.type(screen.getByLabelText(/senha/i), 'password123');
        await userEvent.type(screen.getByLabelText(/confirmar senha/i), 'password123');

        // Enviar o formulário
        await userEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

        // Verificar se a mensagem de erro é exibida
        expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument();
    });
});

