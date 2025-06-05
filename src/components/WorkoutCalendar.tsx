import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography } from '@mui/material';

interface WorkoutCalendarProps {
    completedDates: Date[];
}

const WorkoutCalendar: React.FC<WorkoutCalendarProps> = ({ completedDates }) => {
    const tileClassName = ({ date, view }: { date: Date; view: string }): string | null => {
        if (view === 'month' && completedDates.some(d =>
            d.getFullYear() === date.getFullYear() &&
            d.getMonth() === date.getMonth() &&
            d.getDate() === date.getDate()
        )) {
            return 'highlight-completed';
        }
        return null;
    };

    const tileContent = ({ date, view }: { date: Date; view: string }): React.ReactNode | null => {
        if (view === 'month' && completedDates.some(d =>
            d.getFullYear() === date.getFullYear() &&
            d.getMonth() === date.getMonth() &&
            d.getDate() === date.getDate()
        )) {
            return <Box sx={{ height: '6px', width: '6px', backgroundColor: 'green', borderRadius: '50%', margin: 'auto', marginTop: '2px' }} />;
        }
        return null;
    }

    return (
        <Box sx={{ mt: 4, mb: 2, padding: 2, border: '1px solid #ccc', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>Calendário de Progresso</Typography>
            <Calendar
                tileClassName={tileClassName}
                tileContent={tileContent}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Box sx={{ height: '10px', width: '10px', backgroundColor: 'green', borderRadius: '50%', mr: 1 }} />
                <Typography variant="caption">Dia com treino concluído</Typography>
            </Box>
            <style>{`
                .highlight-completed {
                    background-color: #e6ffed;
                    border-radius: 4px;
                }
                .react-calendar {
                    width: 100% !important;
                    border: none;
                }
            `}</style>
        </Box>
    );
};

export default WorkoutCalendar;
