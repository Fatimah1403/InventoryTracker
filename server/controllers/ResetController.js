import crypto from "crypto";
import redisClient from "../config/redisClient";
import User from "../models/User.js";




export const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.fi
    } catch (error) {
        
    }
}