import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Definindo os itens do menu
const menuItems = [
    { text: 'Treinos', icon: <FitnessCenterIcon />, path: '/workout' },
    { text: 'Calendário', icon: <CalendarMonthIcon />, path: '/calendar' },
];

interface ResponsiveAppBarProps {
    title?: string;
}

export const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({ title = 'Workout App' }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        handleCloseUserMenu();
        logout();
        navigate('/login');
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleMenuItemClick = (path: string) => {
        setDrawerOpen(false);
        navigate(path);
    };

    // Conteúdo do drawer (menu lateral)
    const drawer = (
        <Box sx={{ width: 250 }} role="presentation">
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FitnessCenterIcon sx={{ mr: 1 }} />
                <Typography variant="h6" noWrap component="div">
                    {title}
                </Typography>
            </Box>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={() => handleMenuItemClick(item.path)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Menu para dispositivos móveis */}
                        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleDrawerToggle}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        {/* Logo e título */}
                        <FitnessCenterIcon sx={{ display: { xs: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex' },
                                flexGrow: 1,
                                fontWeight: 700,
                            }}
                        >
                            {title}
                        </Typography>

                        {/* Menu para desktop */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {menuItems.map((item) => (
                                <Button
                                    key={item.text}
                                    onClick={() => handleMenuItemClick(item.path)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    startIcon={item.icon}
                                >
                                    {item.text}
                                </Button>
                            ))}
                        </Box>

                        {/* Menu do usuário */}
                        {user ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Abrir configurações">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <ListItemIcon>
                                            <AccountCircleIcon fontSize="small" />
                                        </ListItemIcon>
                                        <Typography textAlign="center">Perfil</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        <Typography textAlign="center">Sair</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Drawer para menu em dispositivos móveis */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Melhor desempenho em dispositivos móveis
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
                }}
            >
                {drawer}
            </Drawer>

            {/* Espaço para compensar a altura da AppBar */}
            <Toolbar />
        </>
    );
};

