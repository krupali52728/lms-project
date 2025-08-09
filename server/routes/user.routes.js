import { getUserData } from "../controllers/user.controllers.js";
import express from 'express';

const userRouter = express.Router();

userRouter.get('/profile', getUserData); 

export default userRouter;




