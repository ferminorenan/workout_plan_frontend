export type Exercise = {
    nome: string;
    repeticoes: string;
};

export type Serie = {
    nome: string;
    exercicios: Exercise[];
};

export type Fase = {
    titulo: string;
    series: Serie[];
};

export class Workout {
    constructor(
        private readonly nome: string,
        private readonly fases: Fase[]
    ) {
        if (!nome || fases.length === 0) throw new Error("Treino inválido.");
    }

    getNome() {
        return this.nome;
    }

    getFases() {
        return this.fases;
    }
}
