import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,

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
    }
}));