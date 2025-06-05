import React from "react";
import { WeeklyPlan } from "../domain/workout/Workout";
import { Box, Collapse, ListItemButton, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DailyWorkoutDisplay from "./DailyWorkoutDisplay";

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
            <ListItemButton
                onClick={() => setOpen(!open)}
                sx={{
                    bgcolor: 'grey.100',
                    borderRadius: '6px',
                    p: { xs: 1, sm: 1.5 },
                    '&:hover': {
                        bgcolor: 'grey.200',
                    }
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            fontWeight: 500
                        }}
                    >
                        {weeklyPlan.weekRange}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}
                    >
                        {weeklyPlan.frequency} - {weeklyPlan.intensity}
                    </Typography>
                </Box>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ pl: { xs: 0.5, sm: 2 }, pt: 1 }}>
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

export default WeeklyPlanDisplay;