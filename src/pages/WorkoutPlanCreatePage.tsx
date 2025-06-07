import React from 'react';
import { Container, Paper, Typography, Box, TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    title: yup.string().required('O título é obrigatório'),
    duracao_semanas: yup
        .number()
        .typeError('A duração deve ser um número')
        .positive('A duração deve ser um número positivo')
        .integer('A duração deve ser um número inteiro')
        .required('A duração em semanas é obrigatória'),
});

export default function WorkoutPlanCreatePage() {
    const navigate = useNavigate();

    const initialValues = {
        title: '',
        duracao_semanas: '',
    };

    const handleSubmit = async (values: typeof initialValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            const res = await ApiService.post('/api/gerar-plano-treino/', {
                titulo: values.title,
                duracao_semanas: Number(values.duracao_semanas),
            });
            alert('Plano criado com sucesso!');
            navigate(`/workout-plans/${res.data.id}`);
        } catch {
            alert('Erro ao criar plano');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Criar Novo Plano de Treino
                </Typography>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, handleChange, values, errors, touched }) => (
                        <Form noValidate>
                            <Box mb={2}>
                                <TextField
                                    fullWidth
                                    id="title"
                                    name="title"
                                    label="Título do Plano"
                                    value={values.title}
                                    onChange={handleChange}
                                    error={touched.title && Boolean(errors.title)}
                                    helperText={touched.title && errors.title}
                                    required
                                />
                            </Box>

                            <Box mb={2}>
                                <TextField
                                    fullWidth
                                    id="duracao_semanas"
                                    name="duracao_semanas"
                                    label="Duração (semanas)"
                                    type="number"
                                    inputProps={{ min: 1 }}
                                    value={values.duracao_semanas}
                                    onChange={handleChange}
                                    error={touched.duracao_semanas && Boolean(errors.duracao_semanas)}
                                    helperText={touched.duracao_semanas && errors.duracao_semanas}
                                    required
                                />
                            </Box>

                            <Box display="flex" justifyContent="flex-end" mt={2}>
                                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                    {isSubmitting ? <CircularProgress size={24} /> : 'Criar'}
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
}
