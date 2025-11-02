import React from 'react'
import { authManager } from '../managers/authManager'

const ProfilePage = () => {
  const { currentUser, checkAuth } = authManager();

  return (
    <div className='flex flex-col items-center w-full min-h-screen pt-20 bg-base-100'>

      <div className='w-full max-w-5xl bg-base-200 rounded-xl p-4 space-y-5'>
        
        <h1 className='text-3xl text-center'>Your Profile</h1>

        <div className='flex flex-col items-center space-y-2'>
          <h2 className='text-xl text-center'>Useraname: {currentUser.res_username}</h2>
          <h2 className='text-xl text-center'>Email: {currentUser.res_email}</h2>
          <h2 className='text-xl text-center'>Created at: {currentUser.createdAt?.split("T")[0]}</h2>
        </div>

        <div className='flex w-full justify-center items-center'>
          <button className="btn btn-primary mt-5 mb-2">
            Change Password
          </button>
        </div>

      </div>

    </div>
  )
}

export default ProfilePage
