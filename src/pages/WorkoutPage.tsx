import { useEffect, useState } from "react";
import { GetWorkoutPlanUseCase } from "../application/workout/GetWorkoutPlanUseCase";
import { WorkoutRepositoryImpl } from "../infrastructure/repositories/WorkoutRepositoryImpl";
import { WorkoutCard } from "../components/WorkoutCard/WorkoutCard";
import { Fase } from "../domain/workout/Workout";

export default function WorkoutPage() {
    const [fases, setFases] = useState<Fase[]>([]);

    useEffect(() => {
        const useCase = new GetWorkoutPlanUseCase(new WorkoutRepositoryImpl());
        useCase.execute().then((workouts) => {
            const allFases = workouts.flatMap((w) => w.getFases());
            setFases(allFases);
        });
    }, []);

    return (
        <div>
            {fases.map((fase, i) => (
                <WorkoutCard key={i} fase={fase} />
            ))}
        </div>
    );
}