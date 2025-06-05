import { Checkbox, ListItem, Typography, Box } from "@mui/material";
import { Exercise } from "../domain/workout/Workout";

interface ExerciseItemProps {
    exercise: Exercise;
    isCompleted: boolean;
    onToggle: (exerciseId: string) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, isCompleted, onToggle }) => {
    return (
        <ListItem
            key={exercise.id}
            secondaryAction={
                <Checkbox
                    edge="end"
                    onChange={() => onToggle(exercise.id)}
                    checked={isCompleted}
                    aria-label={`Marcar ${exercise.nome} como concluído`}
                    sx={{
                        '& .MuiSvgIcon-root': {
                            fontSize: { xs: '1.2rem', sm: '1.4rem' }
                        }
                    }}
                />
            }
            disablePadding
            sx={{
                py: 0.5,
                opacity: isCompleted ? 0.7 : 1,
                textDecoration: isCompleted ? 'line-through' : 'none'
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: { xs: '0.85rem', sm: '0.95rem' },
                        fontWeight: 500
                    }}
                >
                    {exercise.nome}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontSize: { xs: '0.75rem', sm: '0.85rem' }
                    }}
                >
                    {exercise.repeticoes}
                </Typography>
            </Box>
        </ListItem>
    );
};

export default ExerciseItem;