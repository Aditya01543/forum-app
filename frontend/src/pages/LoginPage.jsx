import { Eye, EyeOff, ListTree, Loader2, Lock, Mail } from 'lucide-react'
import React, { useState } from 'react'
import { authManager } from '../managers/authManager';
import { Link } from 'react-router-dom';

const LoginPage = () => {

  const {isLoggingIn, login} = authManager();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className='h-screen items-center grid lg:grid-cols-2 overflow-auto'>

      <div className='flex flex-col justify-center items-center'>
        <div className='max-w-md w-full'>

          <div className='mb-8 flex flex-col items-center gap-2'>
            <div className='size-15 bg-primary/10 flex items-center justify-center rounded-xl hover:bg-primary/20'>
              <ListTree className='size-7 text-primary'/>
            </div>
            <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
            <p className="text-base-content/60">Sign in to your account</p>
          </div>

          <form className='space-y-6 mx-5 mb-3' onSubmit={handleSubmit}>

            <div className='space-y-2'>
              <label className='label'>
                <span className='font-bold'>Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 z-40 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 z-40 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 z-40 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 z-40 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 z-40 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
            
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>

        </div>
      </div>

      <div className='hidden lg:flex flex-col justify-center bg-base-200 h-full items-center space-y-5'>
        <span className='text-8xl text-center px-7 font-medium'>Ask Your Doubts Here :D</span>

        <span className='text-center'>No one's gonna solve them though ;D</span>
      </div>
      
    </div>
  )
}

export default LoginPage
