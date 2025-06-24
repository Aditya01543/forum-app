import { ArrowBigDown, ArrowBigUp, MessageCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { authManager } from '../managers/authManager';
import { Link } from 'react-router-dom';

const Post = ({ title, id, creatorId }) => {
  const [creatorName, setCreatorName] = useState("Loading...");
  const { getName } = authManager();

  useEffect(() => {
    const fetchCreatorName = async () => {
      try {
        const name = await getName(creatorId);
        setCreatorName(name || "Unknown");
      } catch (err) {
        setCreatorName("Unknown");
        console.error("Failed to fetch creator name:", err);
      }
    };

    if (creatorId) fetchCreatorName();
  }, [creatorId]);

  return (
    <div className='w-full flex items-center justify-between p-1'>
      <div className='border-2 border-base-200 hover:border-accent w-full hover:rounded-xl'>
        <div className='p-3 flex flex-col space-y-2'>
          <h1 className='text-neutral hover:text-accent-content hover:cursor-pointer'>
            {creatorName}
          </h1>
          <h1 className='text-xl font-medium pb-2'>{title}</h1>
          <div className='flex w-full space-x-3'>
            <ArrowBigUp className='text-neutral size-7 hover:cursor-pointer hover:text-error' />
            <ArrowBigDown className='text-neutral size-7 hover:cursor-pointer hover:text-info' />
            <Link to={`/post/${id}`}>
              <MessageCircle className='text-neutral size-7 hover:cursor-pointer hover:text-success' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
