import { login, logout, register } from "../controllers/auth.controllers.js";
import { authenticate,authorize } from "../middleware/authMiddleaare.js";
import express from 'express';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);

// the educator route 
authRouter.get('/educator/profile',authenticate,authorize('educator'));


export default authRouter;