import React, { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import AuthLayout from '../../components/layouts/AuthLayout'
import {useNavigate} from 'react-router-dom'
import Input from '../../components/layouts/Inputs/Input'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import SignUp from './SignUp'
import { API_PATHS } from '../../utils/apiPaths'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'

const Login=()=>{
  const[email,setEmail] =useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState(null);
  
  const{updateUser}=useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async(e)=>{
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return;
    }
    if(!password){
      setError("Please enter the password")
      return;
    }
    setError("");

    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,password,
      })
      const {token,user}=response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(user)
        navigate("/dashboard")
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something  went wrong.Please try again")
      }
    }
  }
  return(
    <AuthLayout>
      <div className='h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-teal-950 text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-teal-950 text-0.5xl mt-5 mb-6'>
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          
          <Input 
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="jamesbond@example.com"
          type="text" />
                  
          <Input 
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password" />
          

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type="submit" className='btn-primary bg-teal-600'>LOGIN</button>

          <p className='text-[13px] text-slate-800 mt-3'>Don't have an account?{""}
            <Link className="text-teal-950 font-medium text-primary underline" to="/signup"> Sign Up</Link>
          </p>
        </form>
      </div>
      </AuthLayout>
  )
} 

export default Login