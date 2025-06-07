// Interface para os tokens
export interface Tokens {
    access: string;
    refresh: string;
}

// Classe para gerenciar tokens de forma segura
class TokenService {
    private readonly ACCESS_TOKEN_KEY = 'token';
    private readonly REFRESH_TOKEN_KEY = 'refreshToken';
    private readonly TOKEN_EXPIRY_KEY = 'tokenExpiry';

    // Método para salvar tokens
    saveTokens(tokens: Tokens): void {
        // Armazenar o token de acesso
        localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.access);

        // Armazenar o token de atualização
        localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh);

        // Calcular e armazenar a data de expiração do token (assumindo 15 minutos)
        const expiryTime = new Date();
        expiryTime.setMinutes(expiryTime.getMinutes() + 15);
        localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toISOString());
    }

    // Método para obter o token de acesso
    getAccessToken(): string | null {
        return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    // Método para obter o token de atualização
    getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    // Método para verificar se o token está expirado
    isTokenExpired(): boolean {
        const expiryTimeStr = localStorage.getItem(this.TOKEN_EXPIRY_KEY);

        if (!expiryTimeStr) {
            return true;
        }

        const expiryTime = new Date(expiryTimeStr);
        const currentTime = new Date();

        return currentTime >= expiryTime;
    }

    // Método para limpar todos os tokens
    clearTokens(): void {
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
    }
}

export default new TokenService();

