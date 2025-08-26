import { login, logout, register, refreshToken } from "../controllers/auth.controllers.js";
import { authenticate,authorize } from "../middleware/authMiddleaare.js";
import express from 'express';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/refresh-token', refreshToken);

// the educator route 
authRouter.get('/educator/profile',authenticate,authorize('educator'));


export default authRouter;