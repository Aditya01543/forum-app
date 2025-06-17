import React from 'react'

import { ListTree, LogOut, Moon, Sun, User } from "lucide-react";
import { Link } from 'react-router-dom';
import { authManager } from '../managers/authManager';

const Navbar = () => {
  const {currentUser} = authManager();

  return (
    <div>

      <header className='bg-base-100/80 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg'>

        <div className='container mx-auto h-16 px-4'>
            <div className='flex justify-between h-full items-center'>

                <div className='flex gap-8 items-center'>
                    <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
                        <ListTree className='size-9 text-primary'/>
                        <h1 className='text-lg font-bold'>Forum app</h1>
                    </Link>
                </div>

                <div className='flex gap-2.5 items-center'>
                    <button className='btn btn-ghost'>
                        <Sun className='size-9'/>
                    </button>
                    {/* <button className='btn btn-ghost'>
                        <Moon className='size-9'/>
                    </button> */}

                    {currentUser && (
                      <>
                        <Link to={"/profile"} className='btn bt-sm gap-2'>
                          <User className='size-5'/>
                          <span className='hidden sm:inline'>Profile</span>
                        </Link>

                        <button className='flex gap-2 items-center'>
                          <LogOut className='size-5'/>
                          <span className='hidden sm:inline'>Logout</span>
                        </button>
                      </>
                    )}
                </div>
                
            </div>
        </div>
        
      </header>

    </div>
  )
}

export default Navbar
