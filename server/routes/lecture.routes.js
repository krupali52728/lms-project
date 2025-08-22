import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleaare.js';
import {
  createLecture,
  getLecturesByChapter,
  getLecturesByCourse,
  getLectureById,
  deleteLecture,
  reorderLectures
} from '../controllers/lecture.controllers.js';

const lectureRouter = express.Router();

// Public routes
lectureRouter.get('/chapter/:chapterId', getLecturesByChapter); 
lectureRouter.get('/course/:courseId', getLecturesByCourse); 
lectureRouter.get('/:lectureId', getLectureById); 

// Protected routes (educators only)
lectureRouter.post('/:courseId/:chapterId', authenticate, authorize('educator'), createLecture); 
lectureRouter.delete('/:lectureId', authenticate, authorize('educator'), deleteLecture); 
lectureRouter.put('/reorder/:chapterId', authenticate, authorize('educator'), reorderLectures); 

export default lectureRouter;
