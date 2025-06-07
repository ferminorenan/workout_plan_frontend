import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) return null;

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Perfil do Usuário
                    </Typography>
                    <Typography variant="body1"><strong>Usuário:</strong> {user.username}</Typography>
                    <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>

                    <Box mt={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/profile/edit')}
                        >
                            Editar Perfil
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProfilePage;
