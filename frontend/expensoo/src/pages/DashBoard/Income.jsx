import React from 'react'

const Income=()=>{
  return(
    <div className=''>
       <div className=''>
      <nav className='bg-teal-100 flex lg:gap-260 sm:gap-90
      md:gap-150'>
        <div className='bg-teal-100 pt-5 pb-5 pl-5'>
          <h2 className='text-2xl text-teal-950 font-bold'>Expenso</h2>
        </div>
        <div className='bg-teal-100 pt-5 pb-5 pl-5'>
          <ul className='font-semibold text-teal-950 flex lg:gap-8 sm:gap-3'>
          <li>Dashboard</li>
          <li>Income</li>
          <li>Expense</li>
        </ul>
        </div>
      </nav>

      <header className='flex-col border-5 border-teal-100 rounded-xl h-45 bg-teal-200'>
        <div className='relative'>
          <h1 className='text-3xl text-teal-950 absolute top-7 left-6'>Total Income :</h1>
        </div>
        <div className='relative'>
          <h2 className='text-teal-950 absolute top-23 text-2xl left-6'>Amount</h2>
        </div>
      </header>

      <section className='border-5 border-teal-100 rounded-xl h-200 bg-[#8cf0da]'>
      <div className='relative'>
        <h3 className='text-xl absolute top-4 left-6'>Recent Income History :</h3>
      </div>
      <div className='pt-15 pl-6 pb-10 pr-3'>
        <div className='border-2 border-teal-100 rounded-xl h-180 bg-white/70'>

        <div>
          <ul className='flex-col'>
         
          </ul>
        </div>
        </div>
      </div>
      </section>
    </div>
      </div>
  )
} 

export default Income