import React, {
    createContext,
    useState,
    useContext,
    useEffect,
} from 'react';
import AuthService from '../services/AuthService';
import { AuthContextType, AuthProviderProps, User } from 'domain/auth/AuthContext';


// =======================
// Constantes e Contexto
// =======================

const DEFAULT_AUTH_CONTEXT: AuthContextType = {
    user: null,
    isAuthenticated: false,
    loading: true,
    login: async () => false,
    register: async () => 'Função de registro não implementada',
    logout: () => { },
};

const AuthContext = createContext<AuthContextType>(DEFAULT_AUTH_CONTEXT);

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

// =======================
// Provider de Autenticação
// =======================

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // ===================
    // Funções auxiliares
    // ===================

    /**
     * Remove todos os dados de autenticação do localStorage e limpa o estado.
     */
    const clearAuthData = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setUser(null);
    };

    /**
     * Carrega os dados do usuário autenticado, caso haja token válido.
     */
    const loadUserProfile = async () => {
        try {
            const userData = await AuthService.getProfile();
            setUser(userData);
        } catch (error: any) {
            console.error('Erro ao carregar perfil:', error);
            if (error?.response?.status === 401) {
                clearAuthData();
            }
        } finally {
            setLoading(false);
        }
    };

    // ===================
    // Efeito de verificação inicial
    // ===================

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            loadUserProfile();
        } else {
            setLoading(false);
        }
    }, []);

    // ===================
    // Funções principais
    // ===================

    /**
     * Realiza login do usuário e carrega os dados no contexto.
     */
    const login = async (
        email: string,
        password: string
    ): Promise<boolean> => {
        try {
            setLoading(true);

            const { access, refresh } = await AuthService.login({ email, password });

            localStorage.setItem('token', access);
            localStorage.setItem('refreshToken', refresh);

            await loadUserProfile();
            return true;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Realiza o registro do usuário e salva dados no contexto.
     */
    const register = async (
        email: string,
        password: string,
        passwordConfirm: string
    ): Promise<true | string> => {
        try {
            setLoading(true);
            const response = await AuthService.register({
                email,
                password,
                password_confirm: passwordConfirm,
            });
            return true;
        } catch (error: any) {
            console.error('Erro ao registrar usuário:', error);

            // Tenta capturar a mensagem de erro da resposta da API
            if (error.response && error.response.data) {
                // Pode ser um objeto com mensagens específicas
                if (typeof error.response.data === 'string') {
                    return error.response.data;
                }

                if (error.response.data.message) {
                    return error.response.data.message;
                }

                // Se for um objeto com múltiplos erros
                const errors = Object.values(error.response.data).flat();
                if (errors.length > 0) {
                    return errors[0] as string;
                }
            }

            return 'Erro inesperado durante o registro';
        } finally {
            setLoading(false);
        }
    };

    /**
     * Realiza o logout do usuário e limpa o contexto.
     */
    const logout = () => {
        clearAuthData();
    };

    // ===================
    // Provedor do Contexto
    // ===================

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: Boolean(user),
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
