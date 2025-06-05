import { Workout } from "./Workout";

export interface WorkoutRepository {
    getAll(): Promise<Workout[]>;
    save(workout: Workout): Promise<void>;
}