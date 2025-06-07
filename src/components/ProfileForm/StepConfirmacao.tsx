import React from 'react';
import { Typography } from '@mui/material';
import { useFormikContext } from 'formik';

const StepConfirmacao = () => {
    const { values } = useFormikContext<any>();

    return (
        <>
            <Typography variant="h6">Revise seus dados</Typography>
            <pre>{JSON.stringify(values, null, 2)}</pre>
        </>
    );
};

export default StepConfirmacao;
