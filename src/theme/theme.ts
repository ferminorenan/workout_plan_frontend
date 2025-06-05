import { createTheme } from '@mui/material/styles';

// Criando um tema personalizado com foco em mobile-first
const theme = createTheme({
  // Paleta de cores
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  // Tipografia
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontSize: '1.5rem', // Tamanho menor para dispositivos móveis
      fontWeight: 500,
      '@media (min-width:600px)': {
        fontSize: '2rem', // Tamanho maior para tablets e desktops
      },
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.875rem',
      '@media (min-width:600px)': {
        fontSize: '1rem',
      },
    },
    body2: {
      fontSize: '0.75rem',
      '@media (min-width:600px)': {
        fontSize: '0.875rem',
      },
    },
  },
  // Componentes
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
        },
        sizeSmall: {
          padding: '4px 8px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
      },
    },
  },
  // Breakpoints para responsividade
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;

