import { Checkbox, ListItem, ListItemText } from "@mui/material";
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
                />
            }
            disablePadding
            className={isCompleted ? 'exercise-completed' : ''}
        >
            <ListItemText primary={`${exercise.nome} - ${exercise.repeticoes}`} />
        </ListItem>
    );
};

export default ExerciseItem