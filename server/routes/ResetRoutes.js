import express from 'express';
import { resetPassword, requestPasswordReset, verifyResetToken } from '../controllers/ResetController.js';
import { rateLimit } from '../middleware/rateLimit.js';

const router = express.Router();

router.get("/verify/:userId/:token", verifyResetToken);


router.post(
    "/request",
    rateLimit("reset", 3, 900),
    requestPasswordReset
);
router.post("/confirm", resetPassword);

export default router;
