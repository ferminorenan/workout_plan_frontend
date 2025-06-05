import { Fase } from "../domain/workout/Workout";

export const workoutMock: Fase[] = [
    {
        titulo: 'Fase 1 – Treino Full Body (2x por semana)',
        series: [
            {
                nome: 'Série 1',
                exercicios: [
                    { nome: 'Agachamento livre', repeticoes: '15 repetições' },
                    { nome: 'Flexão (ajoelhado, se necessário)', repeticoes: '10 repetições' },
                    { nome: 'Elevação de quadril', repeticoes: '15 repetições' },
                    { nome: 'Remada invertida', repeticoes: '8–10 repetições' },
                    { nome: 'Prancha', repeticoes: '20 segundos' },
                    { nome: 'Polichinelo', repeticoes: '30 segundos' }
                ]
            },
            {
                nome: 'Série 2',
                exercicios: [
                    { nome: 'Agachamento livre', repeticoes: '15 repetições' },
                    { nome: 'Flexão (ajoelhado, se necessário)', repeticoes: '10 repetições' },
                    { nome: 'Elevação de quadril', repeticoes: '15 repetições' },
                    { nome: 'Remada invertida', repeticoes: '8–10 repetições' },
                    { nome: 'Prancha', repeticoes: '20 segundos' },
                    { nome: 'Polichinelo', repeticoes: '30 segundos' }
                ]
            }
        ]
    }
];
