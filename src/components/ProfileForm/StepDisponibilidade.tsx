import React from 'react';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { useFormikContext } from 'formik';

interface Props {
    horarios: { id: number; periodo: string }[];
}

const StepDisponibilidade = ({ horarios }: Props) => {
    const { values, handleChange, touched, errors, setFieldValue } = useFormikContext<any>();

    return (
        <>
            <TextField fullWidth margin="normal" label="Dias disponíveis"
                name="dias_disponiveis"
                value={values.dias_disponiveis}
                onChange={handleChange}
                helperText="Ex: segunda, quarta, sexta"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="horarios-preferidos-label">Horários preferidos</InputLabel>
                <Select
                    labelId="horarios-preferidos-label"
                    multiple
                    value={values.horarios_preferidos}
                    onChange={e => setFieldValue('horarios_preferidos', e.target.value)}
                    input={<OutlinedInput label="Horários preferidos" />}
                    renderValue={(selected) =>
                        horarios.filter(h => selected.includes(h.id)).map(h => h.periodo).join(', ')
                    }
                >
                    {horarios.map(horario => (
                        <MenuItem key={horario.id} value={horario.id}>
                            <Checkbox checked={values.horarios_preferidos.includes(horario.id)} />
                            <ListItemText primary={horario.periodo} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                fullWidth
                type="number"
                margin="normal"
                label="Tempo diário disponível (em horas)"
                name="tempo_diario_disponivel"
                value={values.tempo_diario_disponivel}
                onChange={handleChange}
                error={touched.tempo_diario_disponivel && Boolean(errors.tempo_diario_disponivel)}
                helperText={
                    touched.tempo_diario_disponivel && typeof errors.tempo_diario_disponivel === 'string'
                        ? errors.tempo_diario_disponivel
                        : ''
                }
            />
            <FormControl margin="normal" fullWidth>
                <label>
                    <input type="checkbox" name="acompanhamento_medico"
                        checked={values.acompanhamento_medico}
                        onChange={handleChange}
                    /> Possui acompanhamento médico?
                </label>
            </FormControl>
        </>
    );
};

export default StepDisponibilidade;
