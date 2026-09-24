import mongoose from "mongoose";
import { ENV } from "../lib/env.js";

export const connectDB = async()=>{
    try {
        await mongoose.connect(ENV.MONGO_URL);
        console.log("Connected To DB");
    } catch (error) {
        console.error("Failed To Connected DB",error);
    }
};