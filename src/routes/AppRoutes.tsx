import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { WorkoutPage } from '../pages/WorkoutPage';
import WorkoutOfTheDay from '../pages/WorkoutOfTheDay';
import EditProfilePage from '../pages/EditProfilePage';
import WorkoutPlanCreatePage from '../pages/WorkoutPlanCreatePage';
import { useAuth } from '../contexts/AuthContext';
import ProfilePage from 'pages/ProfilePage';
import { MainLayout } from 'components/layout/MainLayout';
import { Box, CircularProgress } from '@mui/material';


interface ProtectedRouteProps {
    children: React.ReactNode;
    title: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, title }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <MainLayout title={title}>{children}</MainLayout>;
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
                    <ProtectedRoute title="Plano de Treino">
                        <WorkoutPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/workout/create"
                element={
                    <ProtectedRoute title="Criar Plano de Treino">
                        <WorkoutPlanCreatePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/workout-of-the-day"
                element={
                    <ProtectedRoute title="Treino do dia">
                        <WorkoutOfTheDay />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute title="Perfil">
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile/edit"
                element={
                    <ProtectedRoute title="Editar Perfil">
                        <EditProfilePage />
                    </ProtectedRoute>
                }
            />

            {/* Redirecionamento da raiz */}
            <Route path="/" element={<Navigate to="/workout" replace />} />

            {/* Catch-all para rotas inexistentes */}
            <Route path="*" element={<Navigate to="/workout" replace />} />
        </Routes>
    );
};
