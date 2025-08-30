import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudnary.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import courseRouter from './routes/course.routes.js';
import chapterRouter from './routes/chapter.routes.js';
import lectureRouter from './routes/lecture.routes.js';
import videoRouter from './routes/video.routes.js';
import paymentRouter from './routes/payment.routes.js';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(morgan('dev'));

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173', // Local development
    'https://advanced-lms.vercel.app' 
  ],
  credentials: true
}));

// Cookie parser middleware
app.use(cookieParser());

// Conditional middleware - skip body parsing for file upload routes
app.use((req, res, next) => {
  // Skip body parsing for lecture upload routes
  if (req.path.includes('/api/lecture/') && req.method === 'POST' && 
      req.get('Content-Type')?.includes('multipart/form-data')) {
    return next();
  }
  
  // Apply body parsing for other routes
  express.json({ limit: '50mb' })(req, res, next);
});

app.use((req, res, next) => {
  // Skip URL encoding for file upload routes
  if (req.path.includes('/api/lecture/') && req.method === 'POST' && 
      req.get('Content-Type')?.includes('multipart/form-data')) {
    return next();
  }
  
  // Apply URL encoding for other routes
  express.urlencoded({ limit: '50mb', extended: true })(req, res, next);
});

connectDB();
connectCloudinary();

app.get('/', (req, res) => {
    res.send("Hare Krishna");
});

// all API Endpoints
app.use('/api/video',videoRouter);

app.use('/api/auth',authRouter);

app.use('/api/user', userRouter);

app.use('/api/course',courseRouter);

app.use('/api/chapter', chapterRouter);

app.use('/api/lecture', lectureRouter);

app.use('/api/payment',paymentRouter);

app.listen(PORT,()=>{
    console.log("Server Started on port", PORT);
});