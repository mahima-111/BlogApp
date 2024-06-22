import express from 'express';
import { registerUser,loginUser,logoutUser,refetchUser } from '../controllers/authController.js';
const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get('/refetch',refetchUser);

export default router;