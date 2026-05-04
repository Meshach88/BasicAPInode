import express from 'express';
import { login, logout, register } from '../controllers/authController.js';
import { authMMiddleware } from '../middleware/authMiddleware.js';
import { validateRequestMiddleware } from '../middleware/validateRequestMiddleware.js';
import { loginSchema, userSchema } from '../validators/authValidator.js';

const authRoutes = express.Router();

authRoutes.post('/register', validateRequestMiddleware(userSchema), register)
authRoutes.post('/login', validateRequestMiddleware(loginSchema), login)
authRoutes.post('/logout', authMMiddleware, logout)

export default authRoutes;