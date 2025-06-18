import React from 'react'

import { ListTree, LogOut, Moon, Plus, Sun, User } from "lucide-react";
import { Link } from 'react-router-dom';
import { authManager } from '../managers/authManager.js';
import { themeManager } from '../managers/themeManager.js';
import { postManager } from '../managers/postManager.js';

const Navbar = () => {
  const {currentUser, logout} = authManager();
  const {theme, setTheme} = themeManager();
  const {openCP} = postManager();

  const darkTheme = () => {
    setTheme("abyss");
  }

  const lightTheme = () => {
    setTheme("silk");
  }

  return (
    <div>

      <header className='bg-base-100/80 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg'>

        <div className='container mx-auto h-16 px-4'>
            <div className='flex justify-between h-full items-center'>

                <div className='flex gap-8 items-center hover:text-accent-content'>
                    <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
                        <ListTree className='size-9 text-primary'/>
                        <h1 className='text-lg font-bold'>Forum app</h1>
                    </Link>
                </div>

                <div className='flex gap-2.5 items-center'>
                  <button onClick={lightTheme} className={`hover:text-accent-content hover:cursor-pointer ${theme === "silk" ? "hidden" : ""}`}>
                    <Sun className='size-9 mx-1'/>
                  </button>
                  <button onClick={darkTheme} className={`hover:text-accent-content hover:cursor-pointer ${theme === "abyss" ? "hidden" : ""}`}>
                    <Moon className='size-9 mx-1'/>
                  </button>
                  {currentUser && (
                    <>
                      <button onClick={openCP} className='hover:text-accent-content hover:cursor-pointer flex gap-2 items-center'>
                        <Plus className='size-9 mx-1'/>
                      </button>

                      <Link to={"/profile"} className='hover:text-accent-content hover:cursor-pointer gap-2'>
                        <User className='size-9 mx-1'/>
                      </Link>

                      <button className='hover:text-accent-content hover:cursor-pointer flex gap-2 items-center' onClick={logout}>
                        <LogOut className='size-9 mx-1'/>
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
