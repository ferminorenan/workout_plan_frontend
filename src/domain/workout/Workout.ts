
// Define o tipo para um exercício individual
export type Exercise = {
    id: string; // Identificador único para rastrear a conclusão
    nome: string; // Nome do exercício (ex: Agachamento livre)
    repeticoes: string; // Descrição das repetições/duração (ex: "15 repetições", "20 segundos")
    isCompleted: boolean; // Status de conclusão do exercício
};

// Define o tipo para um treino diário específico
export type DailyWorkout = {
    id: string; // Identificador único para o treino do dia
    dayOfWeek: 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex' | 'Sáb' | 'Dom' | string; // Dia da semana ou descrição (ex: "Seg, Qua, Sex")
    type: string; // Tipo de treino (ex: "Calistenia (Full Body)", "Caminhada/corrida leve")
    details?: string; // Detalhes adicionais (ex: "2 circuitos", "30-40min")
    exercises: Exercise[]; // Lista de exercícios para este treino diário
};

// Define o tipo para o plano de uma semana específica dentro de uma fase
export type WeeklyPlan = {
    id: string;
    weekRange: string; // Intervalo de semanas (ex: "Semanas 1 a 4")
    frequency: string; // Frequência semanal (ex: "7x por semana")
    intensity: string; // Intensidade (ex: "leve/moderado")
    dailyWorkouts: DailyWorkout[]; // Treinos planejados para os dias desta(s) semana(s)
};

// Define o tipo para uma fase do plano de treino geral
export type Phase = {
    id: string; // Identificador único para a fase
    title: string; // Título da fase (ex: "Fase 1: Adaptação")
    objective: string; // Objetivo da fase
    weeks: WeeklyPlan[]; // Planos semanais dentro desta fase
};

// Define o tipo para o plano de treino completo
export type WorkoutPlan = {
    title: string; // Título geral do plano
    phases: Phase[]; // Todas as fases do plano
};

// Define o estado para rastrear o progresso do usuário
export type WorkoutProgress = {
    // Armazena o status de conclusão por ID de exercício
    exerciseCompletion: Record<string, boolean>; // Ex: { 'agachamento_livre_f1w1': true }
    // Armazena o status de conclusão por ID de treino diário ou data
    // Usaremos ID do DailyWorkout por enquanto para simplificar
    dailyCompletion: Record<string, boolean>; // Ex: { 'calistenia_f1w1_seg': true }
    // Poderia adicionar currentPhaseId, currentWeek, etc. se necessário
    completedDates: Date[];
};

