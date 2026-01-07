import React from "react";
import { Link } from "react-router-dom";

const Navbar=()=>{
  return (
    <nav className='bg-teal-100 flex flex-row justify-between'>
        <div className='bg-teal-100 pt-5 pb-5 pl-5'>
          <h2 className='text-2xl text-teal-800 font-bold'>Expenso</h2>
        </div>
        <div className='bg-teal-100 pt-5 pb-5 pl-5'>
          <ul className='font-semibold text-teal-800 flex gap-2 lg:gap-10 sm:gap-4 md:gap-7 pr-3'>
          <Link to='/dashboard'><li>Dashboard</li></Link>
          <Link to='/income'><li>Income</li></Link>
          <Link to='/expense'><li>Expense</li></Link>
        </ul>
        </div>
      </nav>
  )
}

export default Navbar;