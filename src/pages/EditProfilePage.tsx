import React, { useState, useEffect } from 'react';
import {
    Container, Paper, Typography, Box, Button, Stepper, Step, StepLabel, CircularProgress,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom'; // import do useNavigate
import ApiService from '../services/ApiService';
import StepDisponibilidade from 'components/ProfileForm/StepDisponibilidade';
import StepConfirmacao from 'components/ProfileForm/StepConfirmacao';
import StepSaude from 'components/ProfileForm/StepSaude';
import StepDadosPessoais from 'components/ProfileForm/StepDadosPessoais';

type CondicaoSaude = { id: number; nome: string };
type HorarioPreferido = { id: number; periodo: string };

const steps = ['Dados Pessoais', 'Saúde', 'Disponibilidade', 'Confirmação'];

const validationSchema = yup.object({
    email: yup.string().email('E-mail inválido').required('Obrigatório'),
    first_name: yup.string().required('Obrigatório'),
    last_name: yup.string().required('Obrigatório'),
    tempo_diario_disponivel: yup
        .number()
        .min(0, 'Valor inválido')
        .required('Obrigatório'),
});

export default function ProfileEditPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [condicoes, setCondicoes] = useState<CondicaoSaude[]>([]);
    const [horarios, setHorarios] = useState<HorarioPreferido[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [initialValues, setInitialValues] = useState({
        email: '',
        first_name: '',
        last_name: '',
        sexo: '',
        data_nascimento: '',
        altura_cm: '',
        peso_kg: '',
        objetivo: '',
        nivel_experiencia: '',
        condicoes_saude: [] as number[],
        restricoes: '',
        dieta_especifica: '',
        usa_suplementos: false,
        dias_disponiveis: '',
        horarios_preferidos: [] as number[],
        tempo_diario_disponivel: '',
        acompanhamento_medico: false,
    });
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, condRes, horRes] = await Promise.all([
                    ApiService.get('/profile/'),
                    ApiService.get('/condicoes-saude/'),
                    ApiService.get('/horarios-preferidos/'),
                ]);

                setCondicoes(condRes.data);
                setHorarios(horRes.data);
                setInitialValues((prev) => ({
                    ...prev,
                    ...profileRes.data,
                }));
            } catch (err) {
                alert('Erro ao carregar dados');
            } finally {
                setCarregando(false);
            }
        };
        fetchData();
    }, []);

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            await ApiService.put('/profile/', values);

            // Após salvar perfil, consulta planos de treino
            alert('Perfil salvo com sucesso!');
            const workoutPlansRes = await ApiService.get('/api/workout-plans/');
            if (!workoutPlansRes.data.length) {
                setOpenDialog(true);
            } else {
                handleNext()
            }

        } catch {
            alert('Erro ao salvar perfil');
        }
    };

    const handleDialogClose = (criarPlano: boolean) => {
        setOpenDialog(false);
        if (criarPlano) {
            navigate('/workout/create');
        } else {
            // Se cancelar, avança para a próxima etapa (ou fecha o diálogo e mantém a etapa atual)
            handleNext();
        }
    };

    if (carregando) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        // ... JSX permanece igual
        <Container maxWidth="md">
            <Paper sx={{ p: 3, mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Editar Perfil
                </Typography>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {() => (
                        <Form>
                            <Stepper activeStep={activeStep} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            <Box mt={3}>
                                {activeStep === 0 && <StepDadosPessoais />}
                                {activeStep === 1 && <StepSaude condicoes={condicoes} />}
                                {activeStep === 2 && <StepDisponibilidade horarios={horarios} />}
                                {activeStep === 3 && <StepConfirmacao />}
                            </Box>

                            <Box mt={3} display="flex" justifyContent="space-between">
                                <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                                    Voltar
                                </Button>
                                {activeStep < steps.length - 1 ? (
                                    <Button onClick={handleNext} variant="contained">
                                        Próximo
                                    </Button>
                                ) : (
                                    <Button type="submit" variant="contained" color="primary">
                                        Salvar
                                    </Button>
                                )}
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Paper>

            <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
                <DialogTitle>Plano de treino não encontrado</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Você não possui nenhum plano de treino cadastrado. Deseja criar um novo plano agora?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose(false)}>Cancelar</Button>
                    <Button onClick={() => handleDialogClose(true)} variant="contained" color="primary" autoFocus>
                        Criar Plano
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}