import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleaare.js';
import {
  createCourse,
  getAllCourses,
  deleteCourse,
  getCourseEducator,
  togglePublishCourse,
  enrollInCourse
} from '../controllers/course.controllers.js';

const courseRouter = express.Router();

// Public routes (no authentication required)
courseRouter.get('/all', getAllCourses); 

// Protected routes (authentication required)
courseRouter.post('/create', authenticate, authorize('educator'), createCourse); 
courseRouter.delete('/:courseId', authenticate, authorize('educator'), deleteCourse); 
courseRouter.get('/my-courses', authenticate, authorize('educator'), getCourseEducator); 
courseRouter.post('/enroll/:courseId', authenticate,  enrollInCourse);
courseRouter.patch('/:courseId/toggle-publish', authenticate, authorize('educator'), togglePublishCourse); 

export default courseRouter;