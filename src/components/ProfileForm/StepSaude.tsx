import React from 'react';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { useFormikContext } from 'formik';

interface Props {
    condicoes: { id: number; nome: string }[];
}

const StepSaude = ({ condicoes }: Props) => {
    const { values, setFieldValue, handleChange } = useFormikContext<any>();

    return (
        <>
            <FormControl fullWidth margin="normal">
                <InputLabel id="condicoes-label">Condições de saúde</InputLabel>
                <Select
                    labelId="condicoes-label"
                    multiple
                    value={values.condicoes_saude}
                    onChange={e => setFieldValue('condicoes_saude', e.target.value)}
                    input={<OutlinedInput label="Condições de saúde" />}
                    renderValue={(selected) =>
                        condicoes.filter(c => selected.includes(c.id)).map(c => c.nome).join(', ')
                    }
                >
                    {condicoes.map(cond => (
                        <MenuItem key={cond.id} value={cond.id}>
                            <Checkbox checked={values.condicoes_saude.includes(cond.id)} />
                            <ListItemText primary={cond.nome} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField fullWidth margin="normal" multiline rows={3}
                name="restricoes" label="Restrições"
                value={values.restricoes} onChange={handleChange}
            />
            <TextField fullWidth margin="normal" multiline rows={2}
                name="dieta_especifica" label="Dieta específica"
                value={values.dieta_especifica} onChange={handleChange}
            />
            <FormControl margin="normal" fullWidth>
                <label>
                    <input type="checkbox" name="usa_suplementos"
                        checked={values.usa_suplementos}
                        onChange={handleChange}
                    /> Usa suplementos?
                </label>
            </FormControl>
        </>
    );
};

export default StepSaude;
