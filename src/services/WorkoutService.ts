// src/services/workoutService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // ajuste para sua URL real

export interface ExercicioAPI {
    id: number;
    nome: string;
    series: number;
    dica: string;
    gif: string;
}

export const fetchDailyWorkoutExercises = async (): Promise<ExercicioAPI[]> => {
    try {
        // Aqui assumo que você tem um endpoint para buscar o treino diário com os exercícios relacionados
        // Pode ser um endpoint tipo: /dailyworkouts/today/ ou só /dailyworkouts/
        const response = await axios.get(`${API_BASE_URL}/daily-workouts/today/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // se usar JWT ou outro token
            },
        });

        // Aqui depende da estrutura da resposta
        // Exemplo: response.data = { exercises: [...] }
        const exercises = response.data.exercises || response.data;

        // Mapeando os dados para o formato esperado pelo componente
        return exercises.map((ex: any) => ({
            id: ex.id,
            nome: ex.name || ex.nome,
            series: ex.repetitions || ex.series, // ajusta para o campo correto do backend
            dica: ex.tip || ex.dica || '',
            gif: ex.gif_url || ex.gif || '',
        }));
    } catch (error) {
        console.error('Erro ao buscar exercícios do treino diário:', error);
        return [];
    }
};
