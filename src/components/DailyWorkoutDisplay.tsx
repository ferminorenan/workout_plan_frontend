import React from "react";
import { DailyWorkout } from "../domain/workout/Workout";
import { Box, Button, Card, Collapse, List, ListItemButton, Typography } from "@mui/material";
import ExerciseItem from "./ExerciseItem";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

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
        <Card
            variant="outlined"
            sx={{
                mb: 1.5,
                bgcolor: isDayCompleted ? 'action.disabledBackground' : 'background.paper',
                borderRadius: '6px',
                border: isDayCompleted ? '1px solid rgba(0, 0, 0, 0.2)' : '1px solid rgba(0, 0, 0, 0.12)'
            }}
        >
            <ListItemButton
                onClick={handleToggle}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: { xs: 1, sm: 1.5 }
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {isDayCompleted ? (
                            <CheckCircleOutlineIcon
                                color="success"
                                fontSize="small"
                                sx={{ mr: 0.5 }}
                            />
                        ) : (
                            <RadioButtonUncheckedIcon
                                color="action"
                                fontSize="small"
                                sx={{ mr: 0.5 }}
                            />
                        )}
                        {dailyWorkout.dayOfWeek} - {dailyWorkout.type}
                    </Typography>
                    {dailyWorkout.details && (
                        <Typography
                            variant="caption"
                            display="block"
                            sx={{
                                ml: 3,
                                fontSize: { xs: '0.7rem', sm: '0.75rem' }
                            }}
                        >
                            ({dailyWorkout.details})
                        </Typography>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        size="small"
                        variant={isDayCompleted ? "outlined" : "contained"}
                        onClick={(e) => { e.stopPropagation(); onToggleDay(dailyWorkout.id); }}
                        sx={{
                            mr: 1,
                            minWidth: { xs: '40px', sm: 'auto' },
                            px: { xs: 1, sm: 2 },
                            fontSize: { xs: '0.7rem', sm: '0.8rem' }
                        }}
                        disabled={!allExercisesCompleted && !isDayCompleted} // Enable only if all exercises are done or if already marked done (to unmark)
                    >
                        {isDayCompleted ? 'Desmarcar' : 'Concluir'}
                    </Button>
                    {dailyWorkout.exercises.length > 0 && (open ? <ExpandLess /> : <ExpandMore />)}
                </Box>
            </ListItemButton>
            {dailyWorkout.exercises.length > 0 && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List
                        dense
                        sx={{
                            pl: { xs: 1, sm: 2 },
                            pr: { xs: 1, sm: 2 },
                            pb: 1
                        }}
                    >
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

export default DailyWorkoutDisplay;