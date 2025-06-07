import axios from 'axios';

// Definindo a URL base da API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Interface para os dados de registro
export interface RegisterData {
    email: string;
    password: string;
    password_confirm: string;
}

// Interface para os dados de login
export interface LoginData {
    email: string;
    password: string;
}

// Interface para a resposta de token
export interface TokenResponse {
    access: string;
    refresh: string;
}

// Interface para os dados do usuário
export interface UserData {
    id: string;
    username: string;
    email: string;
}

// Interface para o serviço de autenticação
export interface IAuthService {
    login(data: LoginData): Promise<TokenResponse>;
    register(data: RegisterData): Promise<TokenResponse>;
    refreshToken(token: string): Promise<TokenResponse>;
    getProfile(): Promise<UserData>;
}

// Implementação do serviço de autenticação
class AuthService implements IAuthService {
    // Método para fazer login
    async login(data: LoginData): Promise<TokenResponse> {
        try {
            const response = await axios.post(`${API_URL}/token/`, {
                email: data.email,
                password: data.password,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    }

    // Método para registrar um novo usuário
    async register(data: RegisterData): Promise<TokenResponse> {
        try {
            const response = await axios.post(`${API_URL}/register/`, {
                email: data.email,
                password: data.password,
                password_confirm: data.password_confirm
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            throw error;
        }
    }

    // Método para atualizar o token
    async refreshToken(token: string): Promise<TokenResponse> {
        try {
            const response = await axios.post(`${API_URL}/token/refresh/`, {
                refresh: token,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar token:', error);
            throw error;
        }
    }

    // Método para obter os dados do perfil do usuário
    async getProfile(): Promise<UserData> {
        try {
            // Obter o token do localStorage
            const token = localStorage.getItem('token');

            // Configurar o cabeçalho de autorização
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(`${API_URL}/profile/`, config);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter perfil do usuário:', error);
            throw error;
        }
    }
}

// Exportando uma instância do serviço
export default new AuthService();

