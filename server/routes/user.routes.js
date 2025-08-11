import { getUserData, userEnrollCourse } from "../controllers/user.controllers.js";
import express from 'express';
import { authenticate } from "../middleware/authMiddleaare.js";

const userRouter = express.Router();

userRouter.get('/profile',authenticate, getUserData); 
userRouter.post('/enroll/:courseId',authenticate, userEnrollCourse);

export default userRouter;




