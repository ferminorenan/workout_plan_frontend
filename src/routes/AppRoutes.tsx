import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { WorkoutPage } from '../pages/WorkoutPage';
import { useAuth } from '../contexts/AuthContext';

// Componente para rotas protegidas que requerem autenticação
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // Se ainda estiver carregando, não redireciona
    if (loading) {
        return null;
    }

    // Se não estiver autenticado, redireciona para o login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Se estiver autenticado, renderiza o conteúdo da rota
    return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Rotas públicas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rotas protegidas */}
            <Route
                path="/workout"
                element={
                    <ProtectedRoute>
                        <WorkoutPage />
                    </ProtectedRoute>
                }
            />

            {/* Redirecionar a raiz para a página de workout */}
            <Route path="/" element={<Navigate to="/workout" replace />} />

            {/* Rota para qualquer caminho não encontrado */}
            <Route path="*" element={<Navigate to="/workout" replace />} />
        </Routes>
    );
};

