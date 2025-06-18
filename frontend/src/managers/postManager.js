import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const postManager = create((set, get) => ({
    isCreatingPost:false,
    uploadingPost:false,

    closeCP: () => {
        set({isCreatingPost:false});
    },
    
    openCP: () => {
        set({isCreatingPost:true});
    },

    createPost: async(data) => {
        set({uploadingPost:true});
        try {
            await axiosInstance.post("/post", data);
            toast.success("Post created");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({uploadingPost:true});
        }
    }
}));