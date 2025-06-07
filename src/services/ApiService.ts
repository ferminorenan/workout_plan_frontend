import axios, {
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
    AxiosRequestConfig
} from 'axios';
import TokenService from './TokenService';
import AuthService from './AuthService';

class ApiService {
    private api: AxiosInstance;
    private isRefreshing = false;
    private refreshSubscribers: Array<(token: string) => void> = [];

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.api.interceptors.request.use(
            (config) => this.handleRequest(config),
            (error) => Promise.reject(error)
        );

        this.api.interceptors.response.use(
            (response) => response,
            (error) => this.handleResponseError(error)
        );
    }

    private async handleRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
        if (TokenService.getAccessToken() && TokenService.isTokenExpired()) {
            if (!this.isRefreshing) {
                this.isRefreshing = true;

                try {
                    const refreshToken = TokenService.getRefreshToken();

                    if (refreshToken) {
                        const response = await AuthService.refreshToken(refreshToken);
                        TokenService.saveTokens(response);
                        this.onRefreshSuccess(response.access);
                    } else {
                        TokenService.clearTokens();
                        window.location.href = '/login';
                    }
                } catch (error) {
                    TokenService.clearTokens();
                    window.location.href = '/login';
                } finally {
                    this.isRefreshing = false;
                }
            }

            if (this.isRefreshing) {
                return new Promise((resolve) => {
                    this.refreshSubscribers.push((token: string) => {
                        config.headers.Authorization = `Bearer ${token}`;
                        resolve(config);
                    });
                });
            }
        }

        const token = TokenService.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }

    private async handleResponseError(error: any): Promise<any> {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!this.isRefreshing) {
                this.isRefreshing = true;

                try {
                    const refreshToken = TokenService.getRefreshToken();

                    if (refreshToken) {
                        const response = await AuthService.refreshToken(refreshToken);
                        TokenService.saveTokens(response);
                        this.onRefreshSuccess(response.access);

                        originalRequest.headers.Authorization = `Bearer ${response.access}`;
                        return this.api(originalRequest);
                    } else {
                        TokenService.clearTokens();
                        window.location.href = '/login';
                    }
                } catch (error) {
                    TokenService.clearTokens();
                    window.location.href = '/login';
                } finally {
                    this.isRefreshing = false;
                }
            }

            if (this.isRefreshing) {
                return new Promise((resolve) => {
                    this.refreshSubscribers.push((token: string) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(this.api(originalRequest));
                    });
                });
            }
        }

        return Promise.reject(error);
    }

    private onRefreshSuccess(token: string): void {
        this.refreshSubscribers.forEach((callback) => callback(token));
        this.refreshSubscribers = [];
    }

    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.get<T>(url, config);
    }

    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.post<T>(url, data, config);
    }

    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.put<T>(url, data, config);
    }

    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.delete<T>(url, config);
    }
}

export default new ApiService();
