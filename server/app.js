import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudnary.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());

connectDB();
connectCloudinary();

app.get('/', (req, res) => {
    res.send("Hare Krishna");
});

// all API Endpoints
app.use('/api/auth',authRouter);

app.use('/api/user', userRouter);

app.listen(PORT,()=>{
    console.log("Server Started on port", PORT);
});