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
    loadingPost:false,

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
            const res = await axiosInstance.get(`/post?page=${page}&limit=10`);
            const newPosts = res.data.posts;

            set({
                posts: [...posts, ...newPosts],
                page: page+1,
                hasMore:newPosts.length > 0
            });
        } catch (error) {
            toast.error("Failed to load posts");
        }finally{
            set({loadingPosts:false});
        }
    },

    viewPost: async (id) => {
        set({ loadingPost: true });     
        try {
          const res = await axiosInstance.get(`/post/${id}`);
          return res.data; // contains the post object
        } catch (error) {
          toast.error("Failed to load post");
          console.error("viewPost error:", error);
          return null;
        } finally {
          set({ loadingPost: false });
        }
    }
}));