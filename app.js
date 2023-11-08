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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

