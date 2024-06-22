import express from 'express';
import db from './db.js'
import errorHandler from "./middleware/errorMiddleware.js";
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import cookieParser from 'cookie-parser';

const corsOptions = { origin: ['http://localhost:5173','https://blogify-dvmo.onrender.com'], credentials: true }
const app=express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRouter);
app.use('/api/blog',blogRouter);


app.use(errorHandler);
app.listen(5000,()=>{
    console.log('listening on port 5000');
})