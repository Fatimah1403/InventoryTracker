import express from 'express';
import { resetPassword, requestPasswordReset } from '../controllers/ResetController.js';
import { rateLimit } from '../middleware/rateLimit.js';

const router = express.Router();

router.post(
    "/request",
    rateLimit("reset", 3, 900),
    requestPasswordReset
);
router.post("/confirm", resetPassword);

export default router;
