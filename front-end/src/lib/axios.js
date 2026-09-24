import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"",
    timeout:15000,
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true,
});

