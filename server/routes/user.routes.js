import { 
  getUserData, 
  userEnrollCourse, 
  userPurchaseCourse, 
  updateUserCourseProgress, 
  getUserCourseProgress, 
  userRating,
  checkCoursePurchase
} from "../controllers/user.controllers.js";
import express from 'express';
import { authenticate, authorize } from "../middleware/authMiddleaare.js";

const userRouter = express.Router();

// User profile routes
userRouter.get('/profile', authenticate, getUserData); 

// Course enrollment routes (students only)
// userRouter.post('/enroll/:courseId', authenticate, authorize('student'), userEnrollCourse);
userRouter.post('/purchase/:courseId', authenticate, authorize('student','educator'), userPurchaseCourse);

// Check purchase status
userRouter.get('/purchase-status/:courseId', authenticate, checkCoursePurchase);

// Course progress routes (students only)
userRouter.put('/progress/:courseId', authenticate, authorize('student','educator'), updateUserCourseProgress);
userRouter.get('/progress/:courseId', authenticate, authorize('student','educator'), getUserCourseProgress);

// Course rating routes (students only)
userRouter.post('/rating/:courseId', authenticate, authorize('student','educator'), userRating);



export default userRouter;




