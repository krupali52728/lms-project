import { login, logout, register } from "../controllers/auth.controllers.js";
import express from 'express';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);


export default authRouter;