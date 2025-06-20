import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const postManager = create((set, get) => ({
    isCreatingPost:false,
    uploadingPost:false,
    posts:[],
    hasMore:true,
    page:1,
    loadingPosts:false,

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
            set({uploadingPost:false});
        }
    },

    getPosts: async() => {
        const {posts, page, loadingPosts, hasMore} = get();

        if(!hasMore || loadingPosts) return;

        set({loadingPosts:true});

        try {
            const res = await axiosInstance.get(`/post?page=${page}&limit=5`);
            const newPosts = res.data.posts;

            set({
                posts:newPosts,
                page: page+1,
                hasMore:newPosts.length > 0
            });
        } catch (error) {
            toast.error("Failed to load posts");
        }finally{
            set({loadingPosts:false});
        }
    }
}));