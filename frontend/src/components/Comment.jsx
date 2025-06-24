import React, { useEffect, useState } from 'react';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { authManager } from '../managers/authManager';

const Comment = ({ content, creatorId }) => {
  const [creatorName, setCreatorName] = useState('Loading...');
  const { getName } = authManager();

  useEffect(() => {
    const fetchCreatorName = async () => {
      try {
        const name = await getName(creatorId);
        setCreatorName(name || 'Unknown');
      } catch (err) {
        setCreatorName('Unknown');
        console.error('Failed to fetch creator name:', err);
      }
    };

    if (creatorId) fetchCreatorName();
  }, [creatorId]);

  return (
    <div className="w-full flex items-center justify-between p-1">
      <div className="border-2 border-base-200 hover:border-primary w-full hover:rounded-xl">
        <div className="p-3 flex flex-col space-y-2">
          <h1 className="text-neutral hover:text-primary hover:cursor-pointer text-sm">
            {creatorName}
          </h1>
          <p className="text-base">{content}</p>
          <div className="flex space-x-3 pt-2">
            <ArrowBigUp className="text-neutral size-6 hover:cursor-pointer hover:text-error" />
            <ArrowBigDown className="text-neutral size-6 hover:cursor-pointer hover:text-info" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
