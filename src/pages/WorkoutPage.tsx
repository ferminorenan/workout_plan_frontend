
import React from 'react';
import { Box, Typography } from '@mui/material';
import { WorkoutPlan } from '../domain/workout/Workout';
import { workoutPlanMock } from '../mocks/workoutMock'; // Using the new mock
import { useWorkoutProgress } from '../hooks/useWorkoutProgress';
import PhaseDisplay from '../components/PhaseDisplay';


export const WorkoutPage: React.FC = () => {
    // Normally you would fetch this data
    const workoutPlan: WorkoutPlan = workoutPlanMock;

    // Use the custom hook to manage progress state
    const {
        exerciseCompletion,
        dailyCompletion,
        toggleExerciseCompletion,
        toggleDailyCompletion,
        isExerciseCompleted, // Not directly used here, but available
        isDailyWorkoutCompleted // Not directly used here, but available
    } = useWorkoutProgress(); // Can load initial state from localStorage here later

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
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
                // openInitially={index === 0} // Control which phase starts open if needed
                />
            ))}

            {/* TODO: Add Calendar View Here */}
            {/* TODO: Add Persistence Logic (useEffect to save/load from localStorage) */}
        </Box>
    );
};

