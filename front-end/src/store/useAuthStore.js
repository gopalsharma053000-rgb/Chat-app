import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    authUser:null,
    isCheckingAuth:true,

    checkAuth:async()=>{
        try {
            const res = await axiosInstance
        } catch (error) {
            
        }
    }
}));