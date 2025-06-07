import axios from 'axios';
import AuthService, { LoginData, RegisterData } from '../../services/AuthService';

// Mock do axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AuthService', () => {
    // Limpar todos os mocks antes de cada teste
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    describe('login', () => {
        it('deve chamar a API com os dados corretos e retornar os tokens', async () => {
            // Dados de teste
            const loginData: LoginData = {
                email: 'test@example.com',
                password: 'password123',
            };

            // Mock da resposta da API
            const mockResponse = {
                data: {
                    access: 'access-token',
                    refresh: 'refresh-token',
                },
            };

            // Configurar o mock do axios
            mockedAxios.post.mockResolvedValueOnce(mockResponse);

            // Chamar o método de login
            const result = await AuthService.login(loginData);

            // Verificar se o axios.post foi chamado com os parâmetros corretos
            expect(mockedAxios.post).toHaveBeenCalledWith(
                expect.stringContaining('/token/'),
                {
                    email: loginData.email,
                    password: loginData.password,
                }
            );

            // Verificar se o resultado é o esperado
            expect(result).toEqual(mockResponse.data);
        });

        it('deve lançar um erro quando a API retorna um erro', async () => {
            // Dados de teste
            const loginData: LoginData = {
                email: 'test@example.com',
                password: 'password123',
            };

            // Mock do erro da API
            const mockError = new Error('Credenciais inválidas');
            mockedAxios.post.mockRejectedValueOnce(mockError);

            // Chamar o método de login e verificar se lança o erro
            await expect(AuthService.login(loginData)).rejects.toThrow(mockError);
        });
    });

    describe('register', () => {
        it('deve chamar a API com os dados corretos e retornar os tokens', async () => {
            // Dados de teste
            const registerData: RegisterData = {
                email: 'test@example.com',
                password: 'password123',
                password_confirm: 'password123'
            };

            // Mock da resposta da API
            const mockResponse = {
                data: {
                    access: 'access-token',
                    refresh: 'refresh-token',
                },
            };

            // Configurar o mock do axios
            mockedAxios.post.mockResolvedValueOnce(mockResponse);

            // Chamar o método de registro
            const result = await AuthService.register(registerData);

            // Verificar se o axios.post foi chamado com os parâmetros corretos
            expect(mockedAxios.post).toHaveBeenCalledWith(
                expect.stringContaining('/register/'),
                {
                    email: registerData.email,
                    password: registerData.password,
                }
            );

            // Verificar se o resultado é o esperado
            expect(result).toEqual(mockResponse.data);
        });

        it('deve lançar um erro quando a API retorna um erro', async () => {
            // Dados de teste
            const registerData: RegisterData = {
                email: 'test@example.com',
                password: 'password123',
                password_confirm: 'password123'
            };

            // Mock do erro da API
            const mockError = new Error('Email já está em uso');
            mockedAxios.post.mockRejectedValueOnce(mockError);

            // Chamar o método de registro e verificar se lança o erro
            await expect(AuthService.register(registerData)).rejects.toThrow(mockError);
        });
    });

    describe('refreshToken', () => {
        it('deve chamar a API com o token de atualização e retornar novos tokens', async () => {
            // Token de teste
            const refreshToken = 'refresh-token';

            // Mock da resposta da API
            const mockResponse = {
                data: {
                    access: 'new-access-token',
                    refresh: 'new-refresh-token',
                },
            };

            // Configurar o mock do axios
            mockedAxios.post.mockResolvedValueOnce(mockResponse);

            // Chamar o método de atualização de token
            const result = await AuthService.refreshToken(refreshToken);

            // Verificar se o axios.post foi chamado com os parâmetros corretos
            expect(mockedAxios.post).toHaveBeenCalledWith(
                expect.stringContaining('/token/refresh/'),
                {
                    refresh: refreshToken,
                }
            );

            // Verificar se o resultado é o esperado
            expect(result).toEqual(mockResponse.data);
        });
    });

    describe('getProfile', () => {
        it('deve chamar a API com o token de autorização e retornar os dados do usuário', async () => {
            // Token de teste
            const token = 'access-token';
            localStorage.setItem('token', token);

            // Mock da resposta da API
            const mockResponse = {
                data: {
                    id: '1',
                    name: 'Test User',
                    email: 'test@example.com',
                },
            };

            // Configurar o mock do axios
            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            // Chamar o método de obtenção de perfil
            const result = await AuthService.getProfile();

            // Verificar se o axios.get foi chamado com os parâmetros corretos
            expect(mockedAxios.get).toHaveBeenCalledWith(
                expect.stringContaining('/profile/'),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Verificar se o resultado é o esperado
            expect(result).toEqual(mockResponse.data);
        });

        it('deve lançar um erro quando a API retorna um erro', async () => {
            // Token de teste
            const token = 'access-token';
            localStorage.setItem('token', token);

            // Mock do erro da API
            const mockError = new Error('Token inválido');
            mockedAxios.get.mockRejectedValueOnce(mockError);

            // Chamar o método de obtenção de perfil e verificar se lança o erro
            await expect(AuthService.getProfile()).rejects.toThrow(mockError);
        });
    });
});

