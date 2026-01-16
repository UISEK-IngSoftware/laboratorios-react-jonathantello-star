import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';
import logoPokedex from '../assets/pokedex-logo.png'; 
import './Header.css';

export default function Header() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("access_token");

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate('/login');
    };

    return (
        
        <Container maxWidth="lg" className="header-main-wrapper">
            <Box className="header-banner">
                <Box 
                    component="img" 
                    src={logoPokedex} 
                    alt="PokeDex" 
                    className="header-logo"
                    onClick={() => navigate('/')}
                />
                
                <Box className="nav-menu">
                    <Typography component={Link} to="/" className="nav-item">
                        Pokemons
                    </Typography>

                    <Typography component={Link} to="/trainers" className="nav-item">
                        Entrenadores
                    </Typography>
                    
                    {isLoggedIn ? (
                        <Typography onClick={handleLogout} className="nav-item">
                            Cerrar sesión
                        </Typography>
                    ) : (
                        <Typography component={Link} to="/login" className="nav-item">
                            Iniciar sesión
                        </Typography>
                    )}
                </Box>
            </Box>
        </Container>
    );
}