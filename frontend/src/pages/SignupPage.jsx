import React, { useState } from 'react'
import { authManager } from '../managers/authManager';

const SignupPage = () => {

  const {isLoggingIn, login} = authManager();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <p>Signup page</p>
    </div>
  )
}

export default SignupPage
