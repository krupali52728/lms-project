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

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));

// Cookie parser middleware
app.use(cookieParser());

// Increase payload size limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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