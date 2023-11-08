import express from 'express'
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors';

export const app = express();
config({
    path: "./data/config.env"
})


//Using Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Using Routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);


app.get("/", (req,res)=>{
    res.send("Nice Work")
})

//error Middleware
app.use(errorMiddleware)

