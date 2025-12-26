import React from 'react'
import Chart1 from '../../assets/images/Chart1.png'
import { LuTrendingUpDown } from "react-icons/lu";
import SignUp from '../../pages/Auth/SignUp';
const AuthLayout=({children})=>{
  return    <div className='flex lg:px-100'>
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-teal-600 justify-center items-center text-center non-italic text-3xl font-lg  text-black'>Expenso</h2>
        {children}
        </div>
      </div>
} 

export default AuthLayout
