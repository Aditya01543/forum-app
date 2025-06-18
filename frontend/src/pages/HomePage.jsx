import React from 'react'
import CreatePostBox from '../components/CreatePostBox'
import { postManager } from '../managers/postManager.js'

const HomePage = () => {
  const {isCreatingPost} = postManager();

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className={`${isCreatingPost ? "" : "hidden"}`}>
        <CreatePostBox/>
      </div>
    </div>
  )
}

export default HomePage
