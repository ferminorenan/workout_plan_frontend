import { ReactNode } from "react";

export type User = {
    id: string;
    username: string;
    email: string;
}

// Tipo do contexto de autenticação
export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (
        email: string,
        password: string,
        passwordConfirm: string
    ) => Promise<true | string>;
    logout: () => void;
}

// Props do AuthProvider
export type AuthProviderProps = {
    children: ReactNode;
}