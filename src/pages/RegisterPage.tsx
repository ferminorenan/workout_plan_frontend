import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
    Link,
    CircularProgress,
    Alert
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useFormik } from 'formik';
import * as yup from 'yup';

// Esquema de validação para o formulário de registro
const validationSchema = yup.object({
    name: yup
        .string()
        .required('Nome é obrigatório'),
    email: yup
        .string()
        .email('Digite um email válido')
        .required('Email é obrigatório'),
    password: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .required('Senha é obrigatória'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'As senhas não coincidem')
        .required('Confirmação de senha é obrigatória'),
});

export const RegisterPage: React.FC = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const success = await register(values.name, values.email, values.password);
                if (success) {
                    navigate('/workout');
                } else {
                    setError('Falha no registro. Tente novamente.');
                }
            } catch (err) {
                setError('Ocorreu um erro durante o registro. Tente novamente.');
                console.error('Erro de registro:', err);
            }
        },
    });

    return (
        <Container maxWidth="xs" sx={{ mt: { xs: 2, sm: 8 } }}>
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 2, sm: 3 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    Registro
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Nome completo"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="confirmPassword"
                        label="Confirmar senha"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? <CircularProgress size={24} /> : 'Registrar'}
                    </Button>
                    <Box sx={{ textAlign: 'center' }}>
                        <Link component={RouterLink} to="/login" variant="body2">
                            Já tem uma conta? Faça login
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

