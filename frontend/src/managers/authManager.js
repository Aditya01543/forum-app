import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const authManager = create((set, get) => ({
    currentUser : null,
    isLoggingIn : false,
    isSigningUp : false,
    isCheckingAuth : false,

    login: async(data) => {
        set({isLoggingIn:true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({currentUser:res.data});
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn:false});
        }
    },

    signup: async(data) => {
        set({isSigningUp:true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({currentUser:res.data});
            toast.success("Account created successfully!!");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp:false});
        }
    },

    checkauth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({currentUser:res.data});
        } catch (error) {
            console.log("Error in checkAuth: ", error.message);
        }finally{
            set({isCheckingAuth:false});
        }
    },

    logout: async() => {
        try {
            await axiosInstance.post("auth/logout");
            set({currentUser:null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.respose.data.message);
        }
    }
}));