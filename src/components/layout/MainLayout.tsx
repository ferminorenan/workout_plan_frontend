import React, { ReactNode } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { ResponsiveAppBar } from './ResponsiveAppBar';

interface MainLayoutProps {
    children: ReactNode;
    title?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            <ResponsiveAppBar title={title} />
            <Container
                component="main"
                maxWidth="lg"
                sx={{
                    flexGrow: 1,
                    py: { xs: 2, sm: 3 },
                    px: { xs: 1, sm: 2 }
                }}
            >
                {children}
            </Container>
        </Box>
    );
};

