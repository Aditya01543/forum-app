import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const commentManager = create((set, get) => ({
    commenting:false,

    addComment: async(postId, comment) => {
        set({commenting:true});
        try {
            await axiosInstance.post(`/comment/${postId}`, comment);
            toast.success("Comment added!");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({commenting:false});
        }
    }
}));