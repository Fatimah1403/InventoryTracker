import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
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
    CircularProgress,
    LinearProgress
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Lock,
    CheckCircle,
    Cancel
} from '@mui/icons-material';

const ResetPassword = () => {
    const { userId, token } = useParams();
    const navigate = useNavigate();
    const { resetPassword } = useAuth();
    
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    
    // Password strength indicator
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasMinLength: false
    });

    useEffect(() => {
        // Validate token presence
        if (!userId || !token) {
            navigate('/login', { 
                state: { message: 'Invalid reset link. Please request a new one.' } 
            });
        }
    }, [userId, token, navigate]);

    useEffect(() => {
        // Calculate password strength
        const password = formData.newPassword;
        const strength = {
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            hasMinLength: password.length >= 8
        };
        
        const score = Object.values(strength).filter(Boolean).length;
        setPasswordStrength({ ...strength, score });
    }, [formData.newPassword]);

    const validateForm = () => {
        const newErrors = {};
        
        // Password validation
        if (!formData.newPassword) {
            newErrors.newPassword = 'Password is required';
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
        } else if (passwordStrength.score < 3) {
            newErrors.newPassword = 'Password is too weak';
        }
        
        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);
        setErrors({});
        
        const result = await resetPassword(userId, token, formData.newPassword);
        
        if (result.success) {
            setSuccess(true);
            setTimeout(() => {
                navigate('/login', { 
                    state: { message: 'Password reset successful! Please sign in with your new password.' } 
                });
            }, 2000);
        } else {
            setErrors({ general: result.error || 'Failed to reset password. Link may be expired.' });
        }
        
        setLoading(false);
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength.score <= 2) return 'error';
        if (passwordStrength.score <= 3) return 'warning';
        return 'success';
    };

    const getPasswordStrengthValue = () => {
        return (passwordStrength.score / 5) * 100;
    };

    if (success) {
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
                        <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            Password Reset Successful!
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Redirecting to login page...
                        </Typography>
                        <CircularProgress />
                    </Paper>
                </Box>
            </Container>
        );
    }

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
                        <Lock sx={{ fontSize: 40, color: 'white' }} />
                    </Box>

                    <Typography component="h1" variant="h5" gutterBottom>
                        Create New Password
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                        Your new password must be different from previous passwords
                    </Typography>

                    {errors.general && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {errors.general}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.newPassword}
                            onChange={handleChange}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword}
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
                        
                        {/* Password Strength Indicator */}
                        {formData.newPassword && (
                            <Box sx={{ mt: 1, mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="caption" sx={{ mr: 1 }}>
                                        Password Strength:
                                    </Typography>
                                    <LinearProgress 
                                        variant="determinate" 
                                        value={getPasswordStrengthValue()} 
                                        color={getPasswordStrengthColor()}
                                        sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
                                    />
                                </Box>
                                
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {[
                                        { label: 'Min 8 chars', check: passwordStrength.hasMinLength },
                                        { label: 'Uppercase', check: passwordStrength.hasUpperCase },
                                        { label: 'Lowercase', check: passwordStrength.hasLowerCase },
                                        { label: 'Number', check: passwordStrength.hasNumber },
                                        { label: 'Special char', check: passwordStrength.hasSpecialChar }
                                    ].map((req) => (
                                        <Typography
                                            key={req.label}
                                            variant="caption"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: req.check ? 'success.main' : 'text.secondary'
                                            }}
                                        >
                                            {req.check ? <CheckCircle sx={{ fontSize: 14, mr: 0.5 }} /> : <Cancel sx={{ fontSize: 14, mr: 0.5 }} />}
                                            {req.label}
                                        </Typography>
                                    ))}
                                </Box>
                            </Box>
                        )}
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm New Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
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
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                            disabled={loading}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
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
                            disabled={loading || passwordStrength.score < 3}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
                        </Button>

                        <Box sx={{ textAlign: 'center' }}>
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Typography variant="body2" color="primary">
                                    Back to Sign In
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default ResetPassword;