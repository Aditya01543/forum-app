import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postManager } from '../managers/postManager';
import { authManager } from '../managers/authManager';
import { commentManager } from '../managers/commentManager';
import toast from 'react-hot-toast';
import Comment from '../components/Comment';
import CreatePostBox from '../components/CreatePostBox';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [creatorName, setCreatorName] = useState('');
  const [creatorId, setCreatorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');

  const { viewPost, isEditingPost, openCP } = postManager();
  const { addComment, commenting } = commentManager();
  const { getName, currentUser } = authManager();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await viewPost(id);
        setPost(data);
        setCreatorId(data.res_oc);
        const name = await getName(data.res_oc);
        setCreatorName(name);
      } catch (error) {
        toast.error('Failed to fetch post');
        console.error('Failed to fetch post', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return toast.error("Type something b****");
    await addComment(id, {req_content:commentText});
  };

  if (loading)
    return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (!post)
    return <div className="flex justify-center items-center h-screen">Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 pt-24">
      {isEditingPost && !loading && <CreatePostBox title={"Edit Post"} id={post.res_id} button={"Edit"} postTitle={post.res_title} postContent={post.res_content}/>}
      {/* Post Header */}
      <div className="card bg-base-200 p-6 shadow-md rounded-xl mb-6">
        <h1 className="text-3xl font-bold mb-1">{post.res_title}</h1>
        <p className="text-sm text-gray-500 mb-4">by {creatorName}</p>
        <p className="text-lg">{post.res_content}</p>

        {creatorId === currentUser.res_id && <div className="flex justify-end gap-3">
          <button
            onClick={() => openCP()}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-400"
          >
            Edit
          </button>
          <button
            onClick={() => toast("Delete clicked")} // placeholder
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-400"
          >
            Delete
          </button>
        </div>}
      </div>

      {/* Comments */}
      <div className="card bg-base-100 p-6 shadow rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        {/* Comment Input */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="input input-bordered w-full"
          />
          <button
            className="btn btn-primary"
            onClick={handleAddComment}
            disabled={commenting}
          >
            {commenting ? "Posting..." : "Post"}
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {post.res_comments.length > 0 ? (
            post.res_comments.map((comment) => (
              <Comment
                key={comment._id}
                content={comment.content}
                creatorId={comment.oCommentor}
              />
            ))
          ) : (
            <p className="text-gray-500 mt-4">No comments yet.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default PostPage;
