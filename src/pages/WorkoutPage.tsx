import React from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { WorkoutPlan } from '../domain/workout/Workout';
import { workoutPlanMock } from '../mocks/workoutMock';
import { useWorkoutProgress } from '../hooks/useWorkoutProgress';
import PhaseDisplay from '../components/PhaseDisplay';
import { MainLayout } from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';

export const WorkoutPage: React.FC = () => {
    const { user, loading } = useAuth();
    // Normalmente você buscaria esses dados do backend
    const workoutPlan: WorkoutPlan = workoutPlanMock;

    // Use o hook personalizado para gerenciar o estado de progresso
    const {
        exerciseCompletion,
        dailyCompletion,
        toggleExerciseCompletion,
        toggleDailyCompletion,
    } = useWorkoutProgress();

    if (loading) {
        return (
            <MainLayout title="Plano de Treino">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            </MainLayout>
        );
    }

    if (!user) {
        return (
            <MainLayout title="Plano de Treino">
                <Alert severity="warning" sx={{ mt: 2 }}>
                    Você precisa estar logado para acessar seu plano de treino.
                </Alert>
            </MainLayout>
        );
    }

    return (
        <MainLayout title="Plano de Treino">
            <Box sx={{
                padding: { xs: 1, sm: 2 },
                maxWidth: '100%',
                overflowX: 'hidden'
            }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        fontWeight: 500,
                        mb: 2
                    }}
                >
                    {workoutPlan.title}
                </Typography>

                {workoutPlan.phases.map((phase, index) => (
                    <PhaseDisplay
                        key={phase.id}
                        phase={phase}
                        exerciseCompletion={exerciseCompletion}
                        dailyCompletion={dailyCompletion}
                        onToggleExercise={toggleExerciseCompletion}
                        onToggleDay={toggleDailyCompletion}
                    />
                ))}
            </Box>
        </MainLayout>
    );
};

