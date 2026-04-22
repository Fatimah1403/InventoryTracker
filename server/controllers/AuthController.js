import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"
import crypto from "crypto";
import redisClient from "../config/redisClient.js"; 



const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY || '15m' }
    );
};

const generateRefreshToken = (user, jti) => {
    return jwt.sign(
        { id: user._id, jti },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
    );
};

// Store refresh token in Redis with expiry
const storeRefreshToken = async (jti, refreshToken) => {
    const key = `refresh:${jti}`;
    const expiry = 7 * 24 * 60 * 60; 
    await redisClient.setEx(key, expiry, refreshToken);
};
const setRefreshCookie = (res, token) => {
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.cookie("refreshToken", token, {
        httpOnly: true,
        secure: isProduction, 
        sameSite: isProduction ? "strict" : "lax",
        path: "/", 
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};


// POST /api/auth/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required" });
        const existing = await User.findOne({ email });
        if (existing)
            return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ name, email, password, role: 'viewer'});
        res.status(201).json({
            message: "Registration successfull",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

// POST /api/auth/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Email and password required" });

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

    const accessToken = generateAccessToken(user);
    const jti = crypto.randomUUID();
    const refreshToken = generateRefreshToken(user, jti);

    await storeRefreshToken(jti, refreshToken);

    setRefreshCookie(res, refreshToken);

    return res.json({
        message: "Login successful",
        accessToken,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
        
    }
}

export const refreshAccessToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({ message: "Missing refresh token" });
        }

        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        const exists = await redisClient.get(`refresh:${payload.jti}`);
        if (!exists) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const user = await User.findById(payload.id);
        if (!user || !user.isActive) {
            return res.status(401).json({ message: "User not found or inactive" });
        }

        const newAccessToken = generateAccessToken(user);

        return res.json({ 
            accessToken: newAccessToken,
            message: "Token refreshed successfully"
        });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.clearCookie("refreshToken", { path: "/api/auth" });
            return res.status(401).json({ message: "Refresh token expired" });
        }
        console.error("Refresh error:", error);
        return res.status(401).json({ message: "Invalid refresh token" });
    }
};
export const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (token) {
            const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            await redisClient.del(`refresh:${payload.jti}`);
        }

        res.clearCookie("refreshToken", { path: "/" });
        return res.json({ message: "Logged out" });

    } catch {
        return res.status(500).json({ message: "Logout error" });
    }
};


export const verifyToken = async (req, res) => {
    try {
        
        if (req.user) {
            res.status(200).json({
                success: true,
                user: {
                    id: req.user._id,
                    name: req.user.name,
                    email: req.user.email,
                    role: req.user.role
                }
            });
        } else {
            res.status(401).json({ 
                success: false, 
                message: 'Invalid token' 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
};
export const updateProfile = async (req, res) => {
    try {
        const { name, email, currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id).select('+password');

        if (name) user.name = name;

        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Email already in use' 
                });
            }
            user.email = email;
        }

        if (currentPassword && newPassword) {
            const isMatch = await user.matchPassword(currentPassword);
            if (!isMatch) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Current password is incorrect' 
                });
            }
            user.password = newPassword;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to update profile', 
            error: error.message 
        });
    }
};

