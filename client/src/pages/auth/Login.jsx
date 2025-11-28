import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    IconButton,
    InputAdornment,
    FormControlLabel,
    Checkbox,
    CircularProgress,
    Divider
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Email,
    Lock,
    Inventory2
} from '@mui/icons-material';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, error } = useAuth();
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [localError, setLocalError] = useState('');

    const from = location.state?.from?.pathname || '/';

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rememberMe' ? checked : value
        }));
        setLocalError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLocalError('');

        // Basic validation
        if (!formData.email || !formData.password) {
            setLocalError('Please fill in all fields');
            setLoading(false);
            return;
        }

        const result = await login(
            formData.email, 
            formData.password, 
            formData.rememberMe
        );

        if (result.success) {
            // Navigate based on user role
            if (result.data.role === 'admin') {
                navigate('/');
            } else {
                navigate(from);
            }
        } else {
            setLocalError(result.error);
        }
        
        setLoading(false);
    };

    // Demo credentials helper
    const fillDemoCredentials = (role) => {
        const credentials = {
            admin: { email: 'admin@example.com', password: 'Admin123!' },
            manager: { email: 'manager@example.com', password: 'Manager123!' },
            viewer: { email: 'viewer@example.com', password: 'Viewer123!' }
        };
        
        setFormData(prev => ({
            ...prev,
            ...credentials[role],
            rememberMe: true
        }));
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
                        <Inventory2 sx={{ fontSize: 40, color: 'white' }} />
                    </Box>

                    <Typography component="h1" variant="h5" gutterBottom>
                        Inventory Tracker
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Sign in to continue
                    </Typography>

                    {(error || localError) && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {error || localError}
                        </Alert>
                    )}

                    {location.state?.message && (
                        <Alert severity="info" sx={{ width: '100%', mb: 2 }}>
                            {location.state.message}
                        </Alert>
                    )}

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
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            disabled={loading}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 2 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                        color="primary"
                                        disabled={loading}
                                    />
                                }
                                label="Remember me"
                            />
                            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                                <Typography variant="body2" color="primary">
                                    Forgot password?
                                </Typography>
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ 
                                mt: 1, 
                                mb: 2,
                                py: 1.5,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5a67d8 0%, #6b4299 100%)',
                                }
                            }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                        </Button>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Don't have an account?{' '}
                                <Link to="/register" style={{ textDecoration: 'none' }}>
                                    <Typography component="span" variant="body2" color="primary">
                                        Sign Up
                                    </Typography>
                                </Link>
                            </Typography>
                        </Box>
                        
                        {/* Demo Accounts Section - Remove in production */}
                        <Divider sx={{ my: 3 }}>
                            <Typography variant="caption" color="text.secondary">
                                DEMO ACCOUNTS
                            </Typography>
                        </Divider>
                        
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <Button 
                                size="small" 
                                onClick={() => fillDemoCredentials('admin')}
                                disabled={loading}
                            >
                                Admin
                            </Button>
                            <Button 
                                size="small" 
                                onClick={() => fillDemoCredentials('manager')}
                                disabled={loading}
                            >
                                Manager
                            </Button>
                            <Button 
                                size="small" 
                                onClick={() => fillDemoCredentials('viewer')}
                                disabled={loading}
                            >
                                Viewer
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    ); 
};

export default Login;