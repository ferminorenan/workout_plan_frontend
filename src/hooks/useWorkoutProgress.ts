
import { useState, useCallback, useEffect } from 'react';
import { WorkoutProgress } from '../domain/workout/Workout';
import { initialWorkoutProgress } from '../mocks/workoutMock'; // Or load from storage

const PROGRESS_STORAGE_KEY = 'workoutProgress';

// Helper to get today's date without time
const getTodayDate = (): Date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
};

// Custom hook to manage workout progress state with persistence
export const useWorkoutProgress = () => {
    const [progress, setProgress] = useState<WorkoutProgress>(() => {
        try {
            const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
            if (savedProgress) {
                const parsed = JSON.parse(savedProgress);
                // Ensure dates are parsed correctly if stored as strings
                if (parsed.completedDates) {
                    parsed.completedDates = parsed.completedDates.map((d: string) => new Date(d));
                }
                return parsed;
            }
        } catch (error) {
            console.error("Failed to load progress from localStorage", error);
        }
        // Initialize with default structure including completedDates
        return { ...initialWorkoutProgress, completedDates: [] }; 
    });

    // Persist progress to localStorage whenever it changes
    useEffect(() => {
        try {
            // Store dates as ISO strings for reliable serialization
            const progressToSave = {
                ...progress,
                completedDates: progress.completedDates.map(d => d.toISOString())
            };
            localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressToSave));
        } catch (error) {
            console.error("Failed to save progress to localStorage", error);
        }
    }, [progress]);

    // Function to toggle the completion status of a specific exercise
    const toggleExerciseCompletion = useCallback((exerciseId: string) => {
        setProgress(prev => ({
            ...prev,
            exerciseCompletion: {
                ...prev.exerciseCompletion,
                [exerciseId]: !prev.exerciseCompletion[exerciseId],
            }
        }));
    }, []);

    // Function to toggle the completion status of a specific daily workout
    // and update the completed dates list
    const toggleDailyCompletion = useCallback((dailyWorkoutId: string) => {
        setProgress(prev => {
            const isNowCompleted = !prev.dailyCompletion[dailyWorkoutId];
            const today = getTodayDate();
            let updatedDates = [...prev.completedDates];

            if (isNowCompleted) {
                // Add today's date if it's not already there
                if (!updatedDates.some(d => d.getTime() === today.getTime())) {
                    updatedDates.push(today);
                }
            } else {
                // Remove today's date if it exists (simplistic: assumes unchecking happens on the same day)
                // A more robust approach might need to check if *any* workout was completed today
                // before removing the date highlight.
                // For now, let's keep it simple: unchecking removes today's highlight if present.
                updatedDates = updatedDates.filter(d => d.getTime() !== today.getTime());
            }

            return {
                ...prev,
                dailyCompletion: {
                    ...prev.dailyCompletion,
                    [dailyWorkoutId]: isNowCompleted,
                },
                completedDates: updatedDates,
            };
        });
    }, []);

    // Function to check if a specific exercise is completed
    const isExerciseCompleted = useCallback((exerciseId: string): boolean => {
        return !!progress.exerciseCompletion[exerciseId];
    }, [progress.exerciseCompletion]);

    // Function to check if a specific daily workout is completed
    const isDailyWorkoutCompleted = useCallback((dailyWorkoutId: string): boolean => {
        return !!progress.dailyCompletion[dailyWorkoutId];
    }, [progress.dailyCompletion]);

    // Return the state values and the functions to update them
    return {
        exerciseCompletion: progress.exerciseCompletion,
        dailyCompletion: progress.dailyCompletion,
        completedDates: progress.completedDates, // Expose completed dates
        toggleExerciseCompletion,
        toggleDailyCompletion,
        isExerciseCompleted,
        isDailyWorkoutCompleted,
    };
};

