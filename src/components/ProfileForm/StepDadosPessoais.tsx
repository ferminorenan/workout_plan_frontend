import React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useFormikContext } from 'formik';

const sexos = ['feminino', 'masculino', 'mulher trans', 'homem trans', 'outro'];
const niveis = ['iniciante', 'intermediario', 'avancado'];
const objetivos = ['emagrecimento', 'hipertrofia', 'condicionamento', 'flexibilidade', 'forca', 'reabilitacao'];

const StepDadosPessoais = () => {
    const { values, handleChange, touched, errors } = useFormikContext<any>();

    return (
        <>
            <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && typeof errors.email === 'string' ? errors.email : ''}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Nome"
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
                error={touched.first_name && Boolean(errors.first_name)}
                helperText={touched.first_name && typeof errors.first_name === 'string' ? errors.first_name : ''}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Sobrenome"
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
                error={touched.last_name && Boolean(errors.last_name)}
                helperText={touched.last_name && typeof errors.last_name === 'string' ? errors.last_name : ''}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="sexo-label">Sexo</InputLabel>
                <Select
                    labelId="sexo-label" name="sexo"
                    value={values.sexo} onChange={handleChange}
                >
                    {sexos.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
            </FormControl>
            <TextField fullWidth margin="normal" type="date"
                label="Data de nascimento" name="data_nascimento" InputLabelProps={{ shrink: true }}
                value={values.data_nascimento} onChange={handleChange}
            />
            <TextField fullWidth margin="normal" type="number" label="Altura (cm)"
                name="altura_cm" value={values.altura_cm} onChange={handleChange}
            />
            <TextField fullWidth margin="normal" type="number" label="Peso (kg)"
                name="peso_kg" value={values.peso_kg} onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="objetivo-label">Objetivo</InputLabel>
                <Select
                    labelId="objetivo-label" name="objetivo"
                    value={values.objetivo} onChange={handleChange}
                >
                    {objetivos.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel id="nivel-label">Nível de experiência</InputLabel>
                <Select
                    labelId="nivel-label" name="nivel_experiencia"
                    value={values.nivel_experiencia} onChange={handleChange}
                >
                    {niveis.map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
                </Select>
            </FormControl>
        </>
    );
};

export default StepDadosPessoais;
