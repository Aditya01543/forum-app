import { ArrowBigDown, ArrowBigUp, MessageCircle } from 'lucide-react'
import React from 'react'

const Post = ({title, id}) => {
  return (
    <div className='w-full flex items-center justify-between p-1'>
        <div className='border-2 border-base-200 hover:border-accent w-full hover:rounded-xl'>
            <div className='p-3 flex flex-col space-y-4'>
                <h1 className='text-xl font-medium'>{title}</h1>
                <div className='flex w-full space-x-3'>
                    <ArrowBigUp className='text-neutral size-7 hover:cursor-pointer hover:text-error'/>
                    <ArrowBigDown className='text-neutral size-7 hover:cursor-pointer hover:text-info'/>
                    <MessageCircle className='text-neutral size-7 hover:cursor-pointer hover:text-success'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post
