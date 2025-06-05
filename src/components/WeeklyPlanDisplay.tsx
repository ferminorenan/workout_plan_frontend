import React from "react";
import { WeeklyPlan } from "../domain/workout/Workout";
import { Box, Collapse, ListItemButton, ListItemText } from "@mui/material";
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

export default WeeklyPlanDisplay