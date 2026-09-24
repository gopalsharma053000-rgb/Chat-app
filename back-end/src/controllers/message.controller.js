import cloudinary from "../lib/cloudinary.js";
import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js";

export const getAllContacts = async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await userModel.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getAllContacts:",error);
        return res.statsu(500).json({message:"Server error"});
    }
}

export const getChatPartners = async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        
        const messages = await messageModel.find({
            $or:[{senderId:loggedInUserId},{receiverId:loggedInUserId}],
        });

        const chatPartnerIds =[
            ...new Set(
            messages.map((msg)=>
            msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString() 
            : msg.senderId.toString()
        )
      ),
    ]
    
    const chatPartners = await userModel.find({_id:{$in:chatPartnerIds}}).select("-password");
    return res.status(200).json(chatPartners);
    } catch (error) {
        console.error("Error in getChatPartners",error);
        return res.status(500).json({message:"Internal server error",error})
    }
}

export const getMessagesByUserId = async(req,res)=>{
    try {
        const myId = req.user._id;
        const {id:userToChatId} = req.params;

        const message = await messageModel.find({
            $or:[
                {senderId:myId , receiverId:userToChatId},
                {senderId:userToChatId , receiverId:myId},
            ]
        })
        return res.status(200).json({message});
    } catch (error) {
        console.error("Error in getMessages controller:",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

export const sendMessage = async(req,res)=>{
    try {
        const { text , image } = req.body;
        const { id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new messageModel({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });

        await newMessage.save();
        return res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage controller:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}