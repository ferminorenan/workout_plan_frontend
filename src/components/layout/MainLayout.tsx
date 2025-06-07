import React, { ReactNode } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { ResponsiveAppBar } from './ResponsiveAppBar';
import { MainLayoutProps } from 'domain/layout/Main';


// =======================
// Componente de Layout Principal
// =======================

/**
 * Layout principal utilizado em páginas autenticadas.
 * Inclui uma AppBar responsiva, padding e estilização base.
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            {/* Normaliza o CSS entre os navegadores */}
            <CssBaseline />

            {/* Barra de navegação principal */}
            <ResponsiveAppBar title={title} />

            {/* Conteúdo principal centralizado com espaçamento responsivo */}
            <Container
                component="main"
                maxWidth="lg"
                sx={{
                    flexGrow: 1,
                    py: { xs: 2, sm: 3 },
                    px: { xs: 1, sm: 2 },
                }}
            >
                {children}
            </Container>
        </Box>
    );
};