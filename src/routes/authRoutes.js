import express from 'express';
import { getUser, login, logout, register } from '../controllers/authController.js';

const authRoutes = express.Router();

authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.post('/logout', logout)
authRoutes.post('/getuser', getUser)

export default authRoutes;