import { Workout } from "../../domain/workout/Workout";
import { WorkoutRepository } from "../../domain/workout/WorkoutRepository";
import { workoutMock } from "../../mocks/workoutMock";


export class WorkoutRepositoryImpl implements WorkoutRepository {
    async getAll(): Promise<Workout[]> {
        // Aqui seria um fetch real de API
        return workoutMock.map((fase) => new Workout(
            fase.titulo,
            [{
                titulo: fase.titulo,
                series: fase.series
            }]
        ));
    }

    async save(workout: Workout): Promise<void> {
        console.log("Salvando workout:", workout);
    }
}