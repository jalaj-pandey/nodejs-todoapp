import express from 'express'
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
const cors = require ('cors')

export const app = express();
config({
    path: "./data/config.env"
})


//Using Middleware
app.use(express.json());
app.use(cors({
origin : "http://localhost:5173"
}));
app.use(cookieParser());


// Using Routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);


app.get("/", (req,res)=>{
    res.send("Nice Work")
})

//error Middleware
app.use(errorMiddleware)

