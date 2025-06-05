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
    const [open, setOpen] = React.useState(true); // Iniciar com a primeira fase aberta

    return (
        <Card
            sx={{
                mb: 3,
                borderRadius: { xs: '8px', sm: '12px' },
                boxShadow: { xs: '0 2px 4px rgba(0,0,0,0.1)', sm: '0 4px 8px rgba(0,0,0,0.1)' }
            }}
        >
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <ListItemButton
                    onClick={() => setOpen(!open)}
                    sx={{
                        p: { xs: 0.5, sm: 1 },
                        mb: 1,
                        borderRadius: '4px',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                                fontWeight: 500
                            }}
                        >
                            {phase.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                mt: 0.5
                            }}
                        >
                            {phase.objective}
                        </Typography>
                    </Box>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ pl: { xs: 0, sm: 1 } }}>
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
                    </Box>
                </Collapse>
            </CardContent>
        </Card>
    );
};

export default PhaseDisplay;