import { GetWorkoutPlanUseCase } from "../../application/workout/GetWorkoutPlanUseCase";
import { WorkoutRepository } from "../../domain/workout/WorkoutRepository";

test("deve retornar os treinos disponíveis", async () => {
    const repo: WorkoutRepository = {
        getAll: jest.fn().mockResolvedValue([]),
        save: jest.fn()
    };

    const useCase = new GetWorkoutPlanUseCase(repo);
    const result = await useCase.execute();

    expect(result).toEqual([]);
});