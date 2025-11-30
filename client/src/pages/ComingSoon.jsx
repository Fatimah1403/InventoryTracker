// frontend/src/pages/ComingSoon.jsx
import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Construction, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ComingSoon({ pageName = 'This Page' }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh'
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    textAlign: 'center',
                    maxWidth: 500,
                    width: '100%'
                }}
            >
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px'
                    }}
                >
                    <Construction sx={{ fontSize: 40, color: 'white' }} />
                </Box>

                <Typography variant="h4" gutterBottom>
                    {pageName} - Coming Soon
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    We're working hard to bring you this feature. Check back soon!
                </Typography>

                {user && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Logged in as: <strong>{user.name}</strong> ({user.role})
                    </Typography>
                )}

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
            </Paper>
        </Box>
    );
}

export default ComingSoon;