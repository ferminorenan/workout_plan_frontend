import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { WorkoutPlan } from '../domain/workout/Workout';
import { useWorkoutProgress } from '../hooks/useWorkoutProgress';
import PhaseDisplay from '../components/PhaseDisplay';
import { useAuth } from '../contexts/AuthContext';
import ApiService from 'services/ApiService';

export const WorkoutPage: React.FC = () => {
    const { user, loading } = useAuth();
    const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
    const [loadingPlan, setLoadingPlan] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {
        exerciseCompletion,
        dailyCompletion,
        toggleExerciseCompletion,
        toggleDailyCompletion,
    } = useWorkoutProgress();

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const response = await ApiService.get('/api/workout-plans/');
                    if (response && response.data) {
                        // Se a resposta for uma lista, pegue o primeiro item
                        const plan = Array.isArray(response.data) ? response.data[0] : response.data;

                        // Verifica se phases existe e é um array
                        if (plan && Array.isArray(plan.phases)) {
                            setWorkoutPlan(plan);
                        } else {
                            setError('Plano de treino inválido.');
                        }
                    } else {
                        setError('Nenhum plano de treino encontrado.');
                    }
                } catch (err) {
                    console.error(err);
                    setError('Erro ao carregar o plano de treino.');
                } finally {
                    setLoadingPlan(false);
                }
            } else {
                setLoadingPlan(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading || loadingPlan) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!user) {
        return (
            <Alert severity="warning" sx={{ mt: 2 }}>
                Você precisa estar logado para acessar seu plano de treino.
            </Alert>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error}
            </Alert>
        );
    }

    if (!workoutPlan || !Array.isArray(workoutPlan.phases)) {
        return (
            <Alert severity="info" sx={{ mt: 2 }}>
                Nenhum plano de treino disponível no momento.
            </Alert>
        );
    }

    return (
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
    );
};
