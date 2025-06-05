import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Chip,
    LinearProgress,
} from '@mui/material';

interface Exercicio {
    id: number;
    nome: string;
    series: number;
    dica: string;
    gif: string;
}

const WorkoutOfTheDay: React.FC = () => {
    const [exercicios, setExercicios] = useState<Exercicio[]>([]);
    const [treinoIniciado, setTreinoIniciado] = useState(false);
    const [exercicioAtual, setExercicioAtual] = useState(0);
    const [serieAtual, setSerieAtual] = useState(1);
    const [treinoFinalizado, setTreinoFinalizado] = useState(false);
    const [xpGanho, setXpGanho] = useState(0);

    useEffect(() => {
        const planoUsuario: Exercicio[] = [
            {
                id: 1,
                nome: 'Agachamento Livre',
                series: 3,
                dica: 'Mantenha a coluna reta e os joelhos alinhados com os pés.',
                gif: '/gifs/agachamento-livre.gif',
            },
            {
                id: 2,
                nome: 'Supino Reto',
                series: 3,
                dica: 'Desça a barra até o peito e mantenha os cotovelos a 45°.',
                gif: '/gifs/supino-reto.gif',
            },
            {
                id: 3,
                nome: 'Remada Curvada',
                series: 4,
                dica: 'Contraia as escápulas no final do movimento.',
                gif: '/gifs/remada-curvada.gif',
            },
            {
                id: 4,
                nome: 'Desenvolvimento Militar',
                series: 3,
                dica: 'Empurre o peso acima da cabeça mantendo o abdômen contraído.',
                gif: '/gifs/desenvolvimento-militar.gif',
            },
        ];
        setExercicios(planoUsuario);
    }, []);

    const iniciarTreino = () => {
        setTreinoIniciado(true);
        setExercicioAtual(0);
        setSerieAtual(1);
        setTreinoFinalizado(false);
        setXpGanho(0);
    };

    const proximaRepeticao = () => {
        const exercicio = exercicios[exercicioAtual];

        if (serieAtual < exercicio.series) {
            setSerieAtual((s) => s + 1);
        } else if (exercicioAtual < exercicios.length - 1) {
            setExercicioAtual((e) => e + 1);
            setSerieAtual(1);
        } else {
            setTreinoFinalizado(true);
            setTreinoIniciado(false);
            // anima XP gradual
            let xp = 0;
            const interval = setInterval(() => {
                xp += 10;
                setXpGanho(xp);
                if (xp >= 150) clearInterval(interval);
            }, 50);
        }
    };

    const progresso = () => {
        const totalSeries = exercicios.reduce((acc, ex) => acc + ex.series, 0);
        const feitas = exercicios.slice(0, exercicioAtual).reduce((acc, ex) => acc + ex.series, 0) + (serieAtual - 1);
        return Math.floor((feitas / totalSeries) * 100);
    };

    const renderGamificacao = () => (
        <Box textAlign="center" mt={4}>
            <Typography variant="h4" color="success.main" gutterBottom>
                🏅 Parabéns, campeão!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Você completou todos os exercícios do dia. Continue treinando!
            </Typography>
            <Typography variant="h5" color="warning.main" mt={2}>
                🚀 XP ganho: {xpGanho}
            </Typography>
            <img src="/gifs/congratulations.gif" alt="Parabéns" width="200" style={{ marginTop: 20 }} />
            <Button onClick={iniciarTreino} variant="outlined" sx={{ mt: 3 }}>
                Reiniciar Treino
            </Button>
        </Box>
    );

    return (
        <Box maxWidth="700px" margin="auto" padding={3}>
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                Treino do Dia
            </Typography>

            <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
                {!treinoIniciado && !treinoFinalizado && (
                    <Box textAlign="center">
                        <Typography variant="h6" gutterBottom>
                            Pronto para começar?
                        </Typography>
                        <Button variant="contained" color="primary" onClick={iniciarTreino}>
                            Iniciar Treino
                        </Button>
                    </Box>
                )}

                {treinoFinalizado && renderGamificacao()}

                {(treinoIniciado || treinoFinalizado) && (
                    <>
                        <LinearProgress variant="determinate" value={progresso()} sx={{ mb: 2 }} />

                        <Typography variant="h6" gutterBottom>
                            Lista de Exercícios
                        </Typography>
                        <List>
                            {exercicios.map((ex, index) => (
                                <React.Fragment key={ex.id}>
                                    <ListItem
                                        sx={{
                                            backgroundColor: index === exercicioAtual ? '#f1f8e9' : 'transparent',
                                            borderRadius: 1,
                                            mb: 1,
                                        }}
                                    >
                                        <ListItemText
                                            primary={ex.nome}
                                            secondary={`Séries: ${ex.series}`}
                                        />
                                        {index === exercicioAtual && treinoIniciado && (
                                            <Chip label="Ativo" color="primary" size="small" />
                                        )}
                                    </ListItem>
                                    {index < exercicios.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>

                        {treinoIniciado && !treinoFinalizado && (
                            <Box mt={3} textAlign="center">
                                <Typography variant="h6" gutterBottom>
                                    {exercicios[exercicioAtual].nome}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Série {serieAtual} de {exercicios[exercicioAtual].series}
                                </Typography>
                                <img
                                    src={exercicios[exercicioAtual].gif}
                                    alt={exercicios[exercicioAtual].nome}
                                    width="250"
                                    style={{ borderRadius: 8, marginBottom: 10 }}
                                />
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    💡 {exercicios[exercicioAtual].dica}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={proximaRepeticao}
                                    sx={{ mt: 2 }}
                                >
                                    Concluir Série
                                </Button>
                            </Box>
                        )}
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default WorkoutOfTheDay;
