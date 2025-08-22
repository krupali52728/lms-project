import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleaare.js';
import {
  createCourse,
  getAllCourses,
  deleteCourse,
  getCourseEducator,
  getCourseById,
  togglePublishCourse,
  enrollInCourse
} from '../controllers/course.controllers.js';

const courseRouter = express.Router();

// Public routes (no authentication required)
courseRouter.get('/all', getAllCourses); 

// Protected routes (authentication required)
courseRouter.post('/create', authenticate, authorize('educator'), createCourse); 
courseRouter.get('/my-courses', authenticate, authorize('educator'), getCourseEducator); 
courseRouter.delete('/:courseId', authenticate, authorize('educator'), deleteCourse); 
courseRouter.post('/enroll/:courseId', authenticate,  enrollInCourse);
courseRouter.patch('/:courseId/toggle-publish', authenticate, authorize('educator'), togglePublishCourse); 

// This route should come last because it uses a parameter
courseRouter.get('/:courseId', getCourseById); 

export default courseRouter;