import crypto from "crypto";
import redisClient from "../config/redisClient";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";




export const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const resetToken = crypto.randomBytes(32).toString("hex");

        await redisClient.setEx(
            `reset:${user._id}`,
            900, //15minutes
            resetToken
        );

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${user._id}/${resetToken}`;
        await sendEmail({
            to: user.email,
            subject: "Password Reset Request",
            html:`<p>Click the link to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>`
        });

        res.status(200).json({ message: "Password reset link sent to email" });

    } catch (error) {
        res.status(500).json({ message: "Error requesting password reset", error: error.message });
        
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { userId, token, newPassword } = req.body;

        const storedToken = await redisClient.get(`reset:${userId}`);

        if (!storedToken)
            return res.status(400).json({ message: "Invalid or expired token" });

        if (storedToken !== token)
            return res.status(400).json({ message: "Invalid token" });

        const user = await User.findById(userId).select("+password");
        user.password = newPassword;
        await user.save();

        // Delete reset token after use
        await redisClient.del(`reset:${userId}`);

        res.status(200).json({ message: "Password reset successful" });

    } catch (err) {
        res.status(500).json({ message: "Could not reset password", error: err.message });
    }
};
