
import { WorkoutPlan, Phase, WeeklyPlan, Exercise } from '../domain/workout/Workout';
import { v4 as uuidv4 } from 'uuid'; // Assuming uuid is installed or will be installed

// Helper function to create exercises with unique IDs
const createExercise = (nome: string, repeticoes: string, phaseId: string, weekId: string, dayId: string): Exercise => ({
    id: `${phaseId}_${weekId}_${dayId}_${nome.toLowerCase().replace(/\s+/g, '_')}_${uuidv4().substring(0, 4)}`,
    nome,
    repeticoes,
    isCompleted: false,
});

// --- FASE 1: Adaptação ---
const phase1Id = 'fase1';
const week1_4Id = 'w1-4';

const day1_seg_qua_sex_Id = 'd1_calistenia';
const exercises_f1_calistenia: Exercise[] = [
    createExercise('Agachamento livre', '15 repetições', phase1Id, week1_4Id, day1_seg_qua_sex_Id),
    createExercise('Flexão (ajoelhado, se necessário)', '10 repetições', phase1Id, week1_4Id, day1_seg_qua_sex_Id),
    createExercise('Elevação de quadril (ponte)', '15 repetições', phase1Id, week1_4Id, day1_seg_qua_sex_Id),
    createExercise('Remada invertida (porta/mesa)', '8–10 repetições', phase1Id, week1_4Id, day1_seg_qua_sex_Id),
    createExercise('Prancha', '20 segundos', phase1Id, week1_4Id, day1_seg_qua_sex_Id),
    createExercise('Polichinelo', '30 segundos', phase1Id, week1_4Id, day1_seg_qua_sex_Id),
];

const day1_ter_qui_sab_Id = 'd1_cardio';
const exercises_f1_cardio: Exercise[] = [
    createExercise('Caminhada/corrida leve', '30–40min', phase1Id, week1_4Id, day1_ter_qui_sab_Id),
];

const day1_dom_Id = 'd1_alongamento';
const exercises_f1_alongamento: Exercise[] = [
    createExercise('Alongamento ou yoga leve', '20min', phase1Id, week1_4Id, day1_dom_Id),
];

const phase1_week1_4: WeeklyPlan = {
    id: week1_4Id,
    weekRange: 'Semanas 1 a 4',
    frequency: '7x por semana',
    intensity: 'leve/moderado',
    dailyWorkouts: [
        {
            id: day1_seg_qua_sex_Id,
            dayOfWeek: 'Seg, Qua, Sex',
            type: 'Calistenia (Full Body)',
            details: '2 circuitos',
            exercises: exercises_f1_calistenia,
        },
        {
            id: day1_ter_qui_sab_Id,
            dayOfWeek: 'Ter, Qui, Sáb',
            type: 'Caminhada/corrida leve',
            exercises: exercises_f1_cardio,
        },
        {
            id: day1_dom_Id,
            dayOfWeek: 'Domingo',
            type: 'Alongamento ou yoga leve',
            exercises: exercises_f1_alongamento,
        },
    ],
};

const phase1: Phase = {
    id: phase1Id,
    title: 'Fase 1: Adaptação',
    objective: 'Criar rotina, ativar o corpo e começar o déficit calórico.',
    weeks: [phase1_week1_4],
};

// --- FASE 2: Fundamento ---
const phase2Id = 'fase2';
const week5_8Id = 'w5-8';

const day2_seg_qua_sex_Id = 'd2_calistenia_a';
const exercises_f2_calistenia_a: Exercise[] = [
    createExercise('Flexão padrão', '10–15 repetições', phase2Id, week5_8Id, day2_seg_qua_sex_Id),
    createExercise('Remada invertida', '10 repetições', phase2Id, week5_8Id, day2_seg_qua_sex_Id),
    createExercise('Prancha', '30 segundos', phase2Id, week5_8Id, day2_seg_qua_sex_Id),
    createExercise('Superman', '15 repetições', phase2Id, week5_8Id, day2_seg_qua_sex_Id),
];

const day2_ter_qui_Id = 'd2_calistenia_b';
const exercises_f2_calistenia_b: Exercise[] = [
    createExercise('Agachamento', '20 repetições', phase2Id, week5_8Id, day2_ter_qui_Id),
    createExercise('Avanço', '10 por perna', phase2Id, week5_8Id, day2_ter_qui_Id),
    createExercise('Elevação de quadril', '15 repetições', phase2Id, week5_8Id, day2_ter_qui_Id),
    createExercise('Abdominal bicicleta', '15 repetições', phase2Id, week5_8Id, day2_ter_qui_Id),
    createExercise('Prancha lateral', '20 segundos cada lado', phase2Id, week5_8Id, day2_ter_qui_Id),
];

const day2_sab_Id = 'd2_cardio_ativo';
const exercises_f2_cardio: Exercise[] = [
    createExercise('Cardio ativo', '40min', phase2Id, week5_8Id, day2_sab_Id),
];

const phase2_week5_8: WeeklyPlan = {
    id: week5_8Id,
    weekRange: 'Semanas 5 a 8',
    frequency: '6x por semana',
    intensity: 'moderado',
    dailyWorkouts: [
        {
            id: day2_seg_qua_sex_Id,
            dayOfWeek: 'Seg, Qua, Sex',
            type: 'Calistenia A (superior)',
            exercises: exercises_f2_calistenia_a,
        },
        {
            id: day2_ter_qui_Id,
            dayOfWeek: 'Ter, Qui',
            type: 'Calistenia B (inferior + core)',
            exercises: exercises_f2_calistenia_b,
        },
        {
            id: day2_sab_Id,
            dayOfWeek: 'Sábado',
            type: 'Cardio ativo',
            exercises: exercises_f2_cardio,
        },
        {
            id: 'd2_dom_descanso',
            dayOfWeek: 'Domingo',
            type: 'Descanso',
            exercises: [],
        },
    ],
};

const phase2: Phase = {
    id: phase2Id,
    title: 'Fase 2: Fundamento',
    objective: 'Aumentar força básica e resistência.',
    weeks: [phase2_week5_8],
};

// --- FASE 3: Desenvolvimento ---
const phase3Id = 'fase3';
const week9_16Id = 'w9-16';

const day3_seg_Id = 'd3_peito_triceps';
const exercises_f3_peito_triceps: Exercise[] = [
    createExercise('Flexão', '3x15', phase3Id, week9_16Id, day3_seg_Id),
    createExercise('Flexão diamante', '3x10', phase3Id, week9_16Id, day3_seg_Id),
    createExercise('Tríceps banco', '3x12', phase3Id, week9_16Id, day3_seg_Id),
];

const day3_qua_Id = 'd3_costas_biceps';
const exercises_f3_costas_biceps: Exercise[] = [
    createExercise('Remada invertida', '3x12', phase3Id, week9_16Id, day3_qua_Id),
    createExercise('Chin-up assistido', '3x6–8', phase3Id, week9_16Id, day3_qua_Id),
    createExercise('Rosca com toalha', '3x12', phase3Id, week9_16Id, day3_qua_Id),
];

const day3_sex_Id = 'd3_pernas_core';
const exercises_f3_pernas_core: Exercise[] = [
    createExercise('Agachamento búlgaro', '3x10', phase3Id, week9_16Id, day3_sex_Id),
    createExercise('Ponte unilateral', '3x10', phase3Id, week9_16Id, day3_sex_Id),
    createExercise('Abdominais', '3x15', phase3Id, week9_16Id, day3_sex_Id),
    createExercise('Prancha com toque no ombro', '3x20s', phase3Id, week9_16Id, day3_sex_Id),
];

const day3_ter_Id = 'd3_hiit_leve';
const exercises_f3_hiit: Exercise[] = [
    createExercise('HIIT leve', 'Não especificado', phase3Id, week9_16Id, day3_ter_Id), // Placeholder
];

const day3_sab_Id = 'd3_core_mobilidade';
const exercises_f3_core_mob: Exercise[] = [
    createExercise('Core + mobilidade', 'Não especificado', phase3Id, week9_16Id, day3_sab_Id), // Placeholder
];

const phase3_week9_16: WeeklyPlan = {
    id: week9_16Id,
    weekRange: 'Semanas 9 a 16',
    frequency: '5x por semana',
    intensity: 'moderado/intenso',
    dailyWorkouts: [
        {
            id: day3_seg_Id,
            dayOfWeek: 'Seg',
            type: 'Peito e tríceps',
            exercises: exercises_f3_peito_triceps,
        },
        {
            id: day3_ter_Id,
            dayOfWeek: 'Ter',
            type: 'HIIT leve',
            exercises: exercises_f3_hiit,
        },
        {
            id: day3_qua_Id,
            dayOfWeek: 'Qua',
            type: 'Costas e bíceps',
            exercises: exercises_f3_costas_biceps,
        },
        {
            id: 'd3_qui_descanso',
            dayOfWeek: 'Qui',
            type: 'Descanso',
            exercises: [],
        },
        {
            id: day3_sex_Id,
            dayOfWeek: 'Sex',
            type: 'Pernas + core',
            exercises: exercises_f3_pernas_core,
        },
        {
            id: day3_sab_Id,
            dayOfWeek: 'Sáb',
            type: 'Core + mobilidade',
            exercises: exercises_f3_core_mob,
        },
        {
            id: 'd3_dom_descanso',
            dayOfWeek: 'Domingo',
            type: 'Descanso',
            exercises: [],
        },
    ],
};

const phase3: Phase = {
    id: phase3Id,
    title: 'Fase 3: Desenvolvimento',
    objective: 'Começar a construir músculos e aumentar intensidade.',
    weeks: [phase3_week9_16],
};

// --- FASE 4: Consolidação ---
const phase4Id = 'fase4';
const week17_24Id = 'w17-24';

const day4_seg_sex_Id = 'd4_full_body';
const exercises_f4_full_body: Exercise[] = [
    createExercise('Flexão com pés elevados', '10', phase4Id, week17_24Id, day4_seg_sex_Id),
    createExercise('Remada invertida', '10', phase4Id, week17_24Id, day4_seg_sex_Id),
    createExercise('Agachamento com salto', '12', phase4Id, week17_24Id, day4_seg_sex_Id),
    createExercise('Prancha com deslocamento', '20s', phase4Id, week17_24Id, day4_seg_sex_Id),
    createExercise('Ponte com perna elevada', '10 por lado', phase4Id, week17_24Id, day4_seg_sex_Id),
];

const day4_qua_Id = 'd4_hiit_core';
const exercises_f4_hiit_core: Exercise[] = [
    createExercise('Polichinelo', '30s', phase4Id, week17_24Id, day4_qua_Id),
    createExercise('Corrida estacionária', '30s', phase4Id, week17_24Id, day4_qua_Id),
    createExercise('Burpee adaptado', '30s', phase4Id, week17_24Id, day4_qua_Id),
    createExercise('Mountain climber', '30s', phase4Id, week17_24Id, day4_qua_Id),
    createExercise('Prancha', '30s', phase4Id, week17_24Id, day4_qua_Id),
];

const phase4_week17_24: WeeklyPlan = {
    id: week17_24Id,
    weekRange: 'Semanas 17 a 24',
    frequency: '3x por semana',
    intensity: 'intenso e funcional',
    dailyWorkouts: [
        {
            id: day4_seg_sex_Id,
            dayOfWeek: 'Seg e Sex',
            type: 'Full Body Calistenia (4 voltas)',
            exercises: exercises_f4_full_body,
        },
        {
            id: 'd4_ter_descanso',
            dayOfWeek: 'Ter',
            type: 'Descanso',
            exercises: [],
        },
        {
            id: day4_qua_Id,
            dayOfWeek: 'Qua',
            type: 'HIIT + Core (3 rodadas)',
            exercises: exercises_f4_hiit_core,
        },
        {
            id: 'd4_qui_descanso',
            dayOfWeek: 'Qui',
            type: 'Descanso',
            exercises: [],
        },
        // Sex já está coberto em 'Seg e Sex'
        {
            id: 'd4_sab_descanso',
            dayOfWeek: 'Sáb',
            type: 'Descanso',
            exercises: [],
        },
        {
            id: 'd4_dom_descanso',
            dayOfWeek: 'Dom',
            type: 'Descanso',
            exercises: [],
        },
    ],
};

const phase4: Phase = {
    id: phase4Id,
    title: 'Fase 4: Consolidação',
    objective: 'Maximizar força, foco em qualidade, recuperação e mobilidade.',
    weeks: [phase4_week17_24],
};

// --- Plano de Treino Completo ---
export const workoutPlanMock: WorkoutPlan = {
    title: 'Plano de Treino Completo - 24 Semanas',
    phases: [phase1, phase2, phase3, phase4],
};

// Inicializa o progresso vazio (será gerenciado pelo estado da aplicação)
export const initialWorkoutProgress = {
    exerciseCompletion: {},
    dailyCompletion: {},
};

