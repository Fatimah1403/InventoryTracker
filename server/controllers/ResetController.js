import crypto from "crypto";
import redisClient from "../config/redisClient.js";
import User from "../models/UserModel.js";
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
        const htmlMessage = `
            <h2>Password Reset Request</h2>
            <p>Hi ${user.name || "there"},</p>
            <p>You requested a password reset for your Inventory Tracker account.</p>
            <p>Click the link below to reset your password (valid for 15 minutes):</p>
            <p><a href="${resetLink}" target="_blank">${resetLink}</a></p>
            <p>If you did not request this, you can ignore this email.</p>
            `;

            await sendEmail({
            email: user.email,
            subject: "Inventory Tracker - Password Reset",
            message: htmlMessage,
        });

        res.status(200).json({ message: "Reset email sent" });

    } catch (error) {
        console.error("Reset email error:", error);
        res.status(500).json({ message: "Failed to send reset email", error: error.message });
        
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

        await redisClient.del(`reset:${userId}`);

        res.status(200).json({ message: "Password updated successful" });

    } catch (err) {
        res.status(500).json({ message: "Reset failed", error: err.message });
    }
};
export const verifyResetToken = async (req, res) => {
    try {
        const { userId, token } = req.params;

        const resetToken = await ResetToken.findOne({ userId, token });

        if (!resetToken) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        return res.status(200).json({ message: "Valid token" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

