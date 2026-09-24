import userModel from '../models/user.model.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from '../lib/env.js';
import { sendWelcomeEmail } from '../emails/emailHandlers.js';
import cloudinary from '../lib/cloudinary.js';

export const signup = async(req,res)=>{
    const { fullName,email,password } = req.body;

    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }
        //check emails valid:regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"});
        }

        // check email exists
        const isUserAlreadyExists = await userModel.findOne({email});
        if(isUserAlreadyExists) return res.status(400).json({message:"Email already exists"});

        // create password with bcrypt
        const hashpassword = await bcrypt.hash(password,10)

        // create newUser with userModel
        const newUser = await userModel.create({
            fullName,
            email,
            password:hashpassword,
            profilePic:""
        });

        // create token 
        const token = jwt.sign({
            id:newUser._id},
        ENV.JWT_SECRET,{
            expiresIn:"7d",
        })

        // save token with user cookies
        res.cookie("token",token,{
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly:true, //prevent xss attacks:cross-site scripting
            });

        res.status(201).json({
            message:"User SignUp Successfully",
            newUser
        })
        const saveUser = await newUser.save();
        //send email with resend
        try {
            await sendWelcomeEmail(saveUser.email , saveUser.fullName);
        } catch (error) {
            console.error("Failed to send Welcome Email",error);
        }

    } catch (error) {
        console.error("Error in signup controller:",error);
        res.status(500).json({message:"Internal server error"})
    }
};

export const login = async(req,res)=>{
    const { email, password } = req.body;

    try {
        if(!email || !password){
            return res.status(400).json({message:"Email and Password are required"});
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const token = jwt.sign({
            id:user._id},
            ENV.JWT_SECRET,{
                expiresIn:"7d"
            }
        )
        res.cookie("token",token,{
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly:true, //prevent xss attacks:cross-site scripting
            });

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        })
    } catch (error) {
        console.error("Error in login controller:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const logout = async(req,res)=>{
    res.clearCookie("token");
    return res.status(200).json({
        message:"Logout User Successfully"
    });
}

export const updateProfile = async(req,res)=>{
    try {
        const { profilePic } = req.body;
        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"});
        }
        const userId = req.user._id;
        const uploadResponse = await cloudinary.uploader.upload({profilePic})
        const updateUser = await userModel.findByIdAndUpdate(
            userId,{profilePic:uploadResponse.secure_url}
            ,{new:true});

        res.status(200).json({message:"Profile is Update successfully"} , updateUser);
        
    } catch (error) {
        console.error("Error in update profile",error);
        return res.status(500).json({message:"Internal server error"});
    }
};