import mongoose from "mongoose";


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export const User = mongoose.model("User", schema);