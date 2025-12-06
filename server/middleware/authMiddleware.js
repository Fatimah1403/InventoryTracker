import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export const protect = async (req, res, next) => {
    try {
        let token;
        
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'Not authorized to access this route' 
            });
        }
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                return res.status(401).json({ 
                    success: false,
                    message: 'User not found' 
                });
            }
            
            if (!req.user.isActive) {
                return res.status(401).json({ 
                    success: false,
                    message: 'Account has been deactivated' 
                });
            }
            
            next();
        } catch {
            return res.status(401).json({ 
                success: false,
                message: 'Token is invalid or expired' 
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error' 
        });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                success: false,
                message: 'Authentication required' 
            });
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false,
                message: `User role '${req.user.role}' is not authorized to access this route` 
            });
        }
        
        next();
    };
};

export const checkOwnership = (model) => {
    return async (req, res, next) => {
        try {
            const resource = await model.findById(req.params.id);
            
            if (!resource) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Resource not found' 
                });
            }
            
            if (req.user.role !== 'admin' && 
                resource.createdBy && 
                resource.createdBy.toString() !== req.user._id.toString()) {
                return res.status(403).json({ 
                    success: false,
                    message: 'Not authorized to access this resource' 
                });
            }
            
            req.resource = resource;
            next();
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Server error',
                error: error.message 
            });
        }
    };
};