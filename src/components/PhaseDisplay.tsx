import React from "react";
import { Phase } from "../domain/workout/Workout";
import { Box, Card, CardContent, Collapse, ListItemButton, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import WeeklyPlanDisplay from "./WeeklyPlanDisplay";

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

export default PhaseDisplay