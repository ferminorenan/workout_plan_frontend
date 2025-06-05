import { WorkoutRepository } from "../../domain/workout/WorkoutRepository";

export class GetWorkoutPlanUseCase {
    constructor(private readonly repository: WorkoutRepository) { }

    async execute() {
        return this.repository.getAll();
    }
}