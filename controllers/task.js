import ErrorHandler from "../middlewares/error.js";
import { Tasks } from "../models/Tasks.js"

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        await Tasks.create({
            title, description, user: req.user,
        })
        res.status(201).json({
            success: true,
            message: "Task Added",
        })

    } catch (error) {
        next(error);
    }
}


export const getMyTasks = async (req, res, next) => {
    try {
        const userid = req.user._id;
        const tasks = await Tasks.find({ user: userid });

        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        next(error);
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const tasks = await Tasks.findById(req.params.id);

        if (!tasks) return next(new ErrorHandler("task not found", 404));

        tasks.isCompleted = !tasks.isCompleted;
        await tasks.save();

        res.status(200).json({
            success: true,
            message: "Task Updated",
        })
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const tasks = await Tasks.findById(req.params.id);
        if (!tasks) return next(new ErrorHandler("task not found", 404));

        await tasks.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task Deleted..",
        })
    } catch (error) {
        next(error);
    }
}