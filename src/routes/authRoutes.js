import express from 'express';
import { login, logout, register } from '../controllers/authController.js';
import { authMMiddleware } from '../middleware/authMiddleware.js';

const authRoutes = express.Router();

authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.post('/logout', authMMiddleware, logout)

export default authRoutes;