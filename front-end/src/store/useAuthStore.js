import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggingIn:false,

    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data})
        } catch (error) {
            console.log("Error in authCheck:",error);
            set({authUser:null});
        } finally{
            set({ isCheckingAuth:false});
        }
    },

    signup:async(data)=>{
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});

            toast.success("Account created successfully");
        } catch (error) {
            console.error("SignUp error",error);
            const msg = error.response?.data?.message || error.message || "Network error, please try again!";
            toast.error(msg);
        }finally{
            set({isSigningUp:false})
        }
    }, 

    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser:res.data});
            toast.success("Logged in successfully");
        } catch (error) {
            console.error("LoginUp error",error);
            const msg = error.response?.data?.message || error.message || "Network error, please try again!";
            toast.error(msg);
        }finally{
            set({isLoggingIn:false})
        }
    },

    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out Successfully");
        } catch (error) {
            console.error("Logout error",error);
            toast.error("Error logging out");
        }
    },

    updateProfile:async(data)=>{
        try {
            const res = await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data})
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log("Error in update profile",error);
            const msg = error.response?.data?.message || error.message || "Error in update profile";
            toast.error(msg);
        }
    }
}));