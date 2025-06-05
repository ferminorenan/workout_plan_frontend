
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';


import { useWorkoutProgress } from '../../hooks/useWorkoutProgress';
import WorkoutCalendar from '../../components/WorkoutCalendar';
import { WorkoutPage } from '../../pages/WorkoutPage';

// Mock the custom hook to control its return values
jest.mock('../hooks/useWorkoutProgress', () => ({
    useWorkoutProgress: jest.fn(),
}));

// Mock the calendar component to simplify testing
jest.mock('../components/WorkoutCalendar/WorkoutCalendar', () => {
    return jest.fn(({ completedDates }) => (
        <div data-testid="mock-calendar">
            {/* Simple representation of completed dates for testing */}
            <span>Completed Dates: {completedDates.map((d: Date) => d.toISOString().split('T')[0]).join(', ')}</span>
        </div>
    ));
});

// Mock the workout plan data
jest.mock('../mocks/workoutMock', () => ({
    workoutPlanMock: {
        title: 'Mock Plan Title',
        phases: [
            {
                id: 'p1',
                title: 'Phase 1 Mock',
                objective: 'Objective 1',
                weeks: [
                    {
                        id: 'p1w1',
                        weekRange: 'Week 1',
                        frequency: 'Freq 1',
                        intensity: 'Int 1',
                        dailyWorkouts: [
                            {
                                id: 'p1w1d1',
                                dayOfWeek: 'Mon',
                                type: 'Type A',
                                details: 'Details A',
                                exercises: [
                                    { id: 'p1w1d1e1', nome: 'Exercise 1', repeticoes: '10 reps', isCompleted: false },
                                    { id: 'p1w1d1e2', nome: 'Exercise 2', repeticoes: '5 reps', isCompleted: false },
                                ],
                            },
                            {
                                id: 'p1w1d2',
                                dayOfWeek: 'Tue',
                                type: 'Type B',
                                exercises: [], // No exercises, just a day to mark
                            },
                        ],
                    },
                ],
            },
        ],
    },
}));

describe('WorkoutPage', () => {
    let mockToggleExercise: jest.Mock;
    let mockToggleDay: jest.Mock;
    let mockCompletedDates: Date[];

    beforeEach(() => {
        // Reset mocks before each test
        mockToggleExercise = jest.fn();
        mockToggleDay = jest.fn();
        mockCompletedDates = []; // Start with no completed dates

        // Provide mock return values for the hook
        (useWorkoutProgress as jest.Mock).mockReturnValue({
            exerciseCompletion: {},
            dailyCompletion: {},
            completedDates: mockCompletedDates,
            toggleExerciseCompletion: mockToggleExercise,
            toggleDailyCompletion: mockToggleDay,
            isExerciseCompleted: (id: string) => false, // Default mock implementation
            isDailyWorkoutCompleted: (id: string) => false, // Default mock implementation
        });
    });

    test('renders workout plan title and phases', () => {
        render(<WorkoutPage />);
        expect(screen.getByText('Mock Plan Title')).toBeInTheDocument();
        expect(screen.getByText('Phase 1 Mock')).toBeInTheDocument();
        expect(screen.getByText('Objective 1')).toBeInTheDocument();
        expect(screen.getByText(/Week 1/)).toBeInTheDocument();
        expect(screen.getByText(/Mon - Type A/)).toBeInTheDocument();
        expect(screen.getByText(/Exercise 1 - 10 reps/)).toBeInTheDocument();
        expect(screen.getByText(/Exercise 2 - 5 reps/)).toBeInTheDocument();
        expect(screen.getByText(/Tue - Type B/)).toBeInTheDocument();
    });

    test('calls toggleExerciseCompletion when an exercise checkbox is clicked', () => {
        render(<WorkoutPage />);
        // Find the checkbox associated with Exercise 1
        const exercise1Checkbox = screen.getByLabelText('Marcar Exercise 1 como concluído');
        fireEvent.click(exercise1Checkbox);
        expect(mockToggleExercise).toHaveBeenCalledWith('p1w1d1e1');
    });

    test('calls toggleDailyCompletion when \'Marcar Dia\' button is clicked (after enabling)', () => {
        // Mock that all exercises for the first day are completed
        (useWorkoutProgress as jest.Mock).mockReturnValueOnce({
            exerciseCompletion: { 'p1w1d1e1': true, 'p1w1d1e2': true }, // All exercises done
            dailyCompletion: {},
            completedDates: [],
            toggleExerciseCompletion: mockToggleExercise,
            toggleDailyCompletion: mockToggleDay,
            isExerciseCompleted: (id: string) => ['p1w1d1e1', 'p1w1d1e2'].includes(id),
            isDailyWorkoutCompleted: (id: string) => false,
        });

        render(<WorkoutPage />);

        // Find the 'Marcar Dia' button for the first daily workout (Mon - Type A)
        // It should be enabled now because all exercises are marked completed
        const markDayButton = screen.getByRole('button', { name: /Marcar Dia/i });
        expect(markDayButton).not.toBeDisabled();

        fireEvent.click(markDayButton);
        expect(mockToggleDay).toHaveBeenCalledWith('p1w1d1');
    });

    test('disables \'Marcar Dia\' button if not all exercises are completed', () => {
        // Mock that only one exercise is completed
        (useWorkoutProgress as jest.Mock).mockReturnValueOnce({
            exerciseCompletion: { 'p1w1d1e1': true }, // Only one exercise done
            dailyCompletion: {},
            completedDates: [],
            toggleExerciseCompletion: mockToggleExercise,
            toggleDailyCompletion: mockToggleDay,
            isExerciseCompleted: (id: string) => id === 'p1w1d1e1',
            isDailyWorkoutCompleted: (id: string) => false,
        });

        render(<WorkoutPage />);
        const markDayButton = screen.getByRole('button', { name: /Marcar Dia/i });
        // Should be disabled because Exercise 2 is not completed
        expect(markDayButton).toBeDisabled();
    });

    test('renders the calendar component with correct completed dates', () => {
        const testDate = new Date(2024, 5, 5); // Example date
        mockCompletedDates = [testDate];
        (useWorkoutProgress as jest.Mock).mockReturnValueOnce({
            exerciseCompletion: {},
            dailyCompletion: {},
            completedDates: mockCompletedDates,
            toggleExerciseCompletion: mockToggleExercise,
            toggleDailyCompletion: mockToggleDay,
            isExerciseCompleted: (id: string) => false,
            isDailyWorkoutCompleted: (id: string) => false,
        });

        render(<WorkoutPage />);
        // Check if the mock calendar is rendered and displays the date
        const calendar = screen.getByTestId('mock-calendar');
        expect(calendar).toBeInTheDocument();
        expect(calendar).toHaveTextContent('Completed Dates: 2024-06-05'); // Check format
        // Verify the mock calendar component was called with the correct props
        expect(WorkoutCalendar).toHaveBeenCalledWith({ completedDates: [testDate] }, {});
    });
});

