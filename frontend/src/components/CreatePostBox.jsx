import React, { useState } from 'react'
import { Loader, X } from 'lucide-react';
import { postManager } from '../managers/postManager.js';
import toast from 'react-hot-toast';

const CreatePostBox = () => {
    const {closeCP, createPost, uploadingPost} = postManager();
    const [postData, setPostData] = useState({
        req_title:"",
        req_content:""
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setPostData((prev) => ({ ...prev, [name]: value }));
    };

    const submit = async() => {
        if(!postData.req_title) return toast.error("Title is required");
        await createPost(postData);
        discard();
    };

    const discard = () => {
        setPostData({req_title:"", req_content:""});
        closeCP();
    }

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="relative bg-base-100 rounded-xl w-[400px] p-6 shadow-xl">

            <button onClick={discard} className="absolute top-2 right-2 hover:text-accent rounded-xl hover:cursor-pointer">
              <X className="size-6" />
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center">Create a Post</h2>

            <input
              type="text"
              name="req_title"
              value={postData.req_title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border p-2 rounded mb-4 bg-base-200"
            />

            {/* Content Textarea */}
            <textarea
              name="req_content"
              value={postData.req_content}
              onChange={handleChange}
              placeholder="Content"
              rows={5}
              className="w-full border p-2 rounded bg-base-200 mb-4"
            />

            {/* Submit Button */}
            <button
              onClick={submit}
              className="hover:cursor-pointer text-base-300 w-full bg-primary py-2 rounded-l-full rounded-r-full hover:bg-primary/60"
            >
              {uploadingPost ? <Loader className='size-5 animate-spin'/> : "Post"}
            </button>

          </div>
        </div>

    )
}

export default CreatePostBox
