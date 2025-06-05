import { Card, CardContent, Typography } from "@mui/material";
import { Fase } from "../../domain/workout/Workout";


interface Props {
    fase: Fase;
}

export const WorkoutCard = ({ fase }: Props) => (
    <Card sx={{ marginBottom: 2 }}>
        <CardContent>
            <Typography variant="h6">{fase.titulo}</Typography>
            {fase.series.map((serie) => (
                <div key={serie.nome}>
                    <Typography variant="subtitle1">{serie.nome}</Typography>
                    <ul>
                        {serie.exercicios.map((ex) => (
                            <li key={ex.nome}>
                                {ex.nome} - {ex.repeticoes}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </CardContent>
    </Card>
);