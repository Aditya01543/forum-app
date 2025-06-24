import React from 'react'
import CreatePostBox from '../components/CreatePostBox'
import { postManager } from '../managers/postManager.js'
import Post from '../components/Post.jsx';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { authManager } from '../managers/authManager.js';

const HomePage = () => {
  const { isCreatingPost, posts, getPosts, hasMore, loadingPosts } = postManager();
  const { getName } = authManager();

  const observer = useRef();

  useEffect(() => {
    getPosts();
  }, []);

  const lastPostRef = useCallback(
    (node) => {
      if (loadingPosts) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          getPosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingPosts, hasMore]
  );

  return (
    <div className='flex flex-col items-center w-full min-h-screen pt-20 bg-base-300'>
      {isCreatingPost && <CreatePostBox />}

      <div className='w-full max-w-5xl bg-base-200 rounded-xl p-4'>
        <h1 className='text-3xl mb-4 text-center'>Recent Posts</h1>

        {/* Scrollable area */}
        <div className='h-[80vh] overflow-y-auto pr-2'>
          {posts.map((post, index) => {
            const isLast = index === posts.length - 1;
            return (
              <div
                ref={isLast ? lastPostRef : null}
                key={post._id}
              >
                <Post title={post.title} creatorId={post.oCreator} id={post._id}/>
              </div>
            );
          })}

          {loadingPosts && (
            <div className="text-center text-gray-500 py-4">Loading more posts...</div>
          )}

          {!hasMore && (
            <div className="text-center text-gray-500 py-4">No more posts</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
