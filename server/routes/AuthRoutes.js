import express from 'express';
import { loginUser, registerUser, verifyToken, updateProfile, refreshAccessToken, logoutUser} from '../controllers/AuthController.js';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';


router.post('/register', registerUser);
router.post("/login", loginUser);

// Protected routes
router.get('/verify', protect, verifyToken);
router.put('/profile', protect, updateProfile);

router.post('/refresh', refreshAccessToken);  
router.post('/logout', protect, logoutUser); 



export default router;