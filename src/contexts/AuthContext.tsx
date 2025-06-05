import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Definindo o tipo para o usuário
interface User {
    id: string;
    name: string;
    email: string;
}

// Definindo o tipo para o contexto de autenticação
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

// Criando o contexto com um valor padrão
const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    loading: true,
    login: async () => false,
    register: async () => false,
    logout: () => { },
});

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

// Provedor do contexto de autenticação
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Verificar se o usuário está autenticado ao carregar a página
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Verificar se há um token no localStorage
                const token = localStorage.getItem('token');

                if (token) {
                    // Aqui você faria uma chamada para o backend para validar o token
                    // Por enquanto, vamos apenas simular um usuário autenticado
                    const userData = JSON.parse(localStorage.getItem('user') || '{}');
                    setUser(userData);
                }
            } catch (error) {
                console.error('Erro ao verificar autenticação:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Função para fazer login
    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            setLoading(true);

            // Aqui você faria uma chamada para o backend para autenticar o usuário
            // Por enquanto, vamos apenas simular um login bem-sucedido

            // Simulando uma chamada de API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulando um usuário autenticado
            const mockUser = {
                id: '1',
                name: 'Usuário Teste',
                email: email
            };

            // Armazenando o token e os dados do usuário no localStorage
            localStorage.setItem('token', 'mock-jwt-token');
            localStorage.setItem('user', JSON.stringify(mockUser));

            setUser(mockUser);
            return true;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Função para registrar um novo usuário
    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        try {
            setLoading(true);

            // Aqui você faria uma chamada para o backend para registrar o usuário
            // Por enquanto, vamos apenas simular um registro bem-sucedido

            // Simulando uma chamada de API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulando um usuário registrado
            const mockUser = {
                id: '1',
                name: name,
                email: email
            };

            // Armazenando o token e os dados do usuário no localStorage
            localStorage.setItem('token', 'mock-jwt-token');
            localStorage.setItem('user', JSON.stringify(mockUser));

            setUser(mockUser);
            return true;
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Função para fazer logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

