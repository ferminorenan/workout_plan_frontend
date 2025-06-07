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
    Alert,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFormik } from 'formik';
import * as yup from 'yup';

// Esquema de validação
const validationSchema = yup.object({
    email: yup.string().email('Digite um email válido').required('Email é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    password_confirm: yup
        .string()
        .oneOf([yup.ref('password')], 'As senhas não coincidem')
        .required('Confirmação de senha é obrigatória'),
});

const RegisterPage: React.FC = () => {
    const { register, login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const handleTogglePassword = () => setShowPassword(!showPassword);
    const handleTogglePasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password_confirm: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const response = await register(
                values.email,
                values.password,
                values.password_confirm
            );

            if (response === true) {
                const success = await login(values.email, values.password);
                if (success) {
                    navigate('/profile/edit');
                }
            } else {
                const mensagemErro = response.includes('custom user com este E-mail já existe.')
                    ? 'Usuário já cadastrado'
                    : response;

                setError(mensagemErro);
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
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="new-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password_confirm"
                        label="Confirmar senha"
                        type={showPasswordConfirm ? 'text' : 'password'}
                        id="password_confirm"
                        autoComplete="new-password"
                        value={formik.values.password_confirm}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password_confirm && Boolean(formik.errors.password_confirm)}
                        helperText={formik.touched.password_confirm && formik.errors.password_confirm}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePasswordConfirm} edge="end">
                                        {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
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

export default RegisterPage;
