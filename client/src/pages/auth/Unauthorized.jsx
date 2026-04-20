import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/useAuth";
import { useTheme } from "@mui/material/styles";

import {
    Container,
    Paper,
    Typography,
    Box,
    Button
} from '@mui/material';
import {
    Block,
    Home,
    ArrowBack
} from '@mui/icons-material';

const Unauthorized = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const theme = useTheme();


    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper 
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        borderRadius: 2
                    }}
                >
                    {/* Icon */}
                    <Box
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 3
                        }}
                    >
                        <Block sx={{ fontSize: 50, color: 'white' }} />
                    </Box>

                    <Typography component="h1" variant="h4" gutterBottom color="error">
                        Access Denied
                    </Typography>
                    
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '120px',
                            fontWeight: 'bold',
                            my: 2,
                            color: theme.palette.mode === 'light' ? '#e5e7eb' : '#333'
                        }}
                    >
                        403
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                        You don't have permission to access this page.
                    </Typography>
                    
                    {user && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                            Your current role: <strong>{user.role}</strong>
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            startIcon={<ArrowBack />}
                            onClick={() => navigate(-1)}
                            sx={{ 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5a67d8 0%, #6b4299 100%)',
                                }
                            }}
                        >
                            Go Back
                        </Button>
                        
                        <Button
                            variant="outlined"
                            startIcon={<Home />}
                            onClick={() => navigate('/')}
                        >
                            Dashboard
                        </Button>
                    </Box>
                    <Button 
                        variant="text" 
                        onClick={() => navigate('/support')}
                        size="small"
                    >
                        Request Access
                    </Button>

                    <Typography variant="caption" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
                        If you believe this is an error, please contact your administrator.
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default Unauthorized;