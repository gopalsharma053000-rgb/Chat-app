import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async(req,res,next) =>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized - No token provided"});
        }
        const decoded = jwt.verify(token,ENV.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"Unauthorized - Invalid token"});
        }
        const user = await userModel.findById(decoded.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:",error);
        return res.status(500).json({message:"Internal server error"})
    }
};