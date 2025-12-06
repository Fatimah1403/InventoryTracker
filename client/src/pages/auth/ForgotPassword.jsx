import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    InputAdornment,
    CircularProgress
} from '@mui/material';
import {
    Email,
    ArrowBack,
    LockReset
} from '@mui/icons-material';

const ForgotPassword = () => {
    const { forgotPassword } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset messages
        setMessage('');
        setError('');
        
        // Validate email
        if (!email) {
            setError('Please enter your email address');
            return;
        }
        
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        
        setLoading(true);
        
        const result = await forgotPassword(email);
        
        if (result.success) {
            setEmailSent(true);
            setMessage('Password reset link has been sent to your email. Please check your inbox.');
        } else {
            setError(result.error || 'Failed to send reset email. Please try again.');
        }
        
        setLoading(false);

        if (result.error?.includes("Too many requests")) {
            setError("Too many attempts. Please wait before trying again.");
            return;
        }

        if (result.error?.includes("User not found")) {
            setMessage("If this email is registered, we will send a reset link.");
            setEmailSent(true);
            return;
        }
        if (result.error?.includes("expired")) {
            navigate('/forgot-password', { 
                state: { message: 'Your reset link expired. Request a new one.' } 
            });
        }
        
        
        
        
    };

    return (
        <Container component="main" maxWidth="xs">
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
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 2
                        }}
                    >
                        <LockReset sx={{ fontSize: 40, color: 'white' }} />
                    </Box>

                    <Typography component="h1" variant="h5" gutterBottom>
                        Reset Password
                    </Typography>
                    
                    <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ mb: 3, textAlign: 'center' }}
                    >
                        Enter your email address and we'll send you a link to reset your password
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {message && (
                        <Alert 
                            severity="success" 
                            sx={{ width: '100%', mb: 2 }}
                        >
                            {message}
                        </Alert>
                    )}

                    {!emailSent ? (
                        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError('');
                                }}
                                disabled={loading}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ 
                                    mt: 3, 
                                    mb: 2,
                                    py: 1.5,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #5a67d8 0%, #6b4299 100%)',
                                    }
                                }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Send Reset Link'
                                )}
                            </Button>

                            <Box sx={{ textAlign: 'center' }}>
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <Button 
                                        startIcon={<ArrowBack />}
                                        color="primary"
                                        disabled={loading}
                                    >
                                        Back to Sign In
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    ) : (
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                📧 Check your email
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                We've sent a password reset link to:
                            </Typography>
                            <Typography variant="body1" fontWeight="medium" sx={{ mb: 3 }}>
                                {email}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: 'block' }}>
                                The link will expire in 15 minutes
                            </Typography>
                            
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => {
                                    setEmailSent(false);
                                    setMessage('');
                                    setEmail('');
                                }}
                                sx={{ mt: 2, mb: 2 }}
                            >
                                Send Another Email
                            </Button>

                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Button 
                                    startIcon={<ArrowBack />}
                                    color="primary"
                                >
                                    Back to Sign In
                                </Button>
                            </Link>
                        </Box>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default ForgotPassword;