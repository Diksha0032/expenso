import React from 'react'
import Chart1 from '../../assets/images/Chart1.png'
const AuthLayout=({children})=>{
  return(
    <div>
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'><Expenso></Expenso></h2>
        {children}
        </div>


      </div>
  )
} 

export default AuthLayout