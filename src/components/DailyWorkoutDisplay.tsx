import React from "react";
import { DailyWorkout } from "../domain/workout/Workout";
import { Box, Button, Card, Collapse, List, ListItemButton, Typography } from "@mui/material";
import ExerciseItem from "./ExerciseItem";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

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

export default DailyWorkoutDisplay