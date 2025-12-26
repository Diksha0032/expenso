import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/layouts/Inputs/Input'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import { useState } from 'react'

const SignUp = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!fullName){
      setError("Please enter your name")
      return;
    }

     if(!validateEmail(email)){
          setError("Please enter a valid email address")
          return;
        }
        if(!password){
          setError("Please enter the password")
          return;
        }
        setError("");
  }
  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>
          Create an account
        </h3>
        <p className='text-xm text-slate-700 mt-[5px] mb-6'>Track your expenses and analysis them</p>

        <form onSubmit={handleSignUp}>
          <div className='grid grid-cols-1 grid-cols-1 gap-3'>
            <Input value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label='Full Name'
              placeholder="James Bond"
              type="text" />
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

            <button type="submit" className='btn-primary'>SIGN UP</button>

            <p className='text-[13px] text-slate-500 mt-3'>Alreay have an account?{""}
              <Link className="text-slate-500 font-medium text-primary underline" to="/login">Login</Link>

            </p>

          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp