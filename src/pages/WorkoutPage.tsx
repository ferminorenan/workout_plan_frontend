
import React from 'react';
import { Box, Card, CardContent, Typography, Checkbox, List, ListItem, ListItemText, Collapse, IconButton, Button, ListItemButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Phase, WeeklyPlan, DailyWorkout, Exercise, WorkoutPlan } from '../domain/workout/Workout';
import { workoutPlanMock } from '../mocks/workoutMock'; // Using the new mock
import { useWorkoutProgress } from '../hooks/useWorkoutProgress';
import ExerciseItem from '../components/ExerciseItem';

interface DailyWorkoutDisplayProps {
    dailyWorkout: DailyWorkout;
    isDayCompleted: boolean;
    exerciseCompletion: Record<string, boolean>;
    onToggleExercise: (exerciseId: string) => void;
    onToggleDay: (dailyWorkoutId: string) => void;
}

const DailyWorkoutDisplay: React.FC<DailyWorkoutDisplayProps> = ({ dailyWorkout, isDayCompleted, exerciseCompletion, onToggleExercise, onToggleDay }) => {
    const [open, setOpen] = React.useState(true); // Default to open

    const handleToggle = () => {
        setOpen(!open);
    };

    const allExercisesCompleted = dailyWorkout.exercises.length > 0 && dailyWorkout.exercises.every(ex => exerciseCompletion[ex.id]);

    return (
        <Card variant="outlined" sx={{ mb: 1, bgcolor: isDayCompleted ? 'action.disabledBackground' : 'background.paper' }}>
            <ListItemButton onClick={handleToggle} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="subtitle1" component="div">
                        {dailyWorkout.dayOfWeek} - {dailyWorkout.type}
                        {dailyWorkout.details && <Typography variant="caption" display="block">({dailyWorkout.details})</Typography>}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={(e) => { e.stopPropagation(); onToggleDay(dailyWorkout.id); }}
                        sx={{ mr: 1 }}
                        disabled={!allExercisesCompleted && !isDayCompleted} // Enable only if all exercises are done or if already marked done (to unmark)
                    >
                        {isDayCompleted ? 'Desmarcar Dia' : 'Marcar Dia'}
                    </Button>
                    {dailyWorkout.exercises.length > 0 && (open ? <ExpandLess /> : <ExpandMore />)}
                </Box>
            </ListItemButton>
            {dailyWorkout.exercises.length > 0 && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List dense sx={{ pl: 2, pr: 2, pb: 1 }}>
                        {dailyWorkout.exercises.map((exercise) => (
                            <ExerciseItem
                                key={exercise.id}
                                exercise={exercise}
                                isCompleted={!!exerciseCompletion[exercise.id]}
                                onToggle={onToggleExercise}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </Card>
    );
};

interface WeeklyPlanDisplayProps {
    weeklyPlan: WeeklyPlan;
    exerciseCompletion: Record<string, boolean>;
    dailyCompletion: Record<string, boolean>;
    onToggleExercise: (exerciseId: string) => void;
    onToggleDay: (dailyWorkoutId: string) => void;
}

const WeeklyPlanDisplay: React.FC<WeeklyPlanDisplayProps> = ({ weeklyPlan, exerciseCompletion, dailyCompletion, onToggleExercise, onToggleDay }) => {
    const [open, setOpen] = React.useState(true);

    return (
        <Box sx={{ mb: 2 }}>
            <ListItemButton onClick={() => setOpen(!open)} sx={{ bgcolor: 'grey.200', borderRadius: 1 }}>
                <ListItemText primary={`${weeklyPlan.weekRange} (${weeklyPlan.frequency} - ${weeklyPlan.intensity})`} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ pl: 2, pt: 1 }}>
                    {weeklyPlan.dailyWorkouts.map((dw) => (
                        <DailyWorkoutDisplay
                            key={dw.id}
                            dailyWorkout={dw}
                            isDayCompleted={!!dailyCompletion[dw.id]}
                            exerciseCompletion={exerciseCompletion}
                            onToggleExercise={onToggleExercise}
                            onToggleDay={onToggleDay}
                        />
                    ))}
                </Box>
            </Collapse>
        </Box>
    );
};

interface PhaseDisplayProps {
    phase: Phase;
    exerciseCompletion: Record<string, boolean>;
    dailyCompletion: Record<string, boolean>;
    onToggleExercise: (exerciseId: string) => void;
    onToggleDay: (dailyWorkoutId: string) => void;
}

const PhaseDisplay: React.FC<PhaseDisplayProps> = ({ phase, exerciseCompletion, dailyCompletion, onToggleExercise, onToggleDay }) => {
    const [open, setOpen] = React.useState(true); // Start with first phase open

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <ListItemButton onClick={() => setOpen(!open)} sx={{ p: 0, mb: 1 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h5">{phase.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{phase.objective}</Typography>
                    </Box>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {phase.weeks.map((week) => (
                        <WeeklyPlanDisplay
                            key={week.id}
                            weeklyPlan={week}
                            exerciseCompletion={exerciseCompletion}
                            dailyCompletion={dailyCompletion}
                            onToggleExercise={onToggleExercise}
                            onToggleDay={onToggleDay}
                        />
                    ))}
                </Collapse>
            </CardContent>
        </Card>
    );
};

// --- Main Page Component --- //

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

