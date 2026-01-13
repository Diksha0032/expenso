import React from 'react'
import {
  LuTrendingUp, LuTrendingDown, LuUtensils, LuTrash2
} from "react-icons/lu"

const TransactionInfoCard = ({
  title, icon, date, amount, type, hideDeleteBtn, onDelete
}) => {

  const isIncome = type?.toLowerCase() === 'income';
  const amountStyles = isIncome ? "bg-green-200 text-green-500" : "bg-red-50 text-red-500"

  return (
  <div className='group relative flex items-center gap-1 pl-2 pr-4 pb-[-3px] justify-between rounded-lg transition-all duration-300 ease-in-out cursor-default hover:shadow-around hover:-translate-y-1 hover:z-10 my-2' >
    <div className='flex items-center pt-3 pr-5 pl-4 pb-2' >
      <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
        {
          icon ? (icon.length>4?
            <img src={icon} alt={title} className='w-6 h-6' />
           : <span>{icon}</span>) :(<LuUtensils />)
        }
      </div>

      <div className='pl-5'>
        <p className='text-sm text-teal-900 font-semibold'>{title}</p>
        <p className='text-xs text-teal-800 mt-1'>{date}</p>
      </div>
      </div>

      <div className='flex items-center gap-2 mb-2'>
        {!hideDeleteBtn && (<button className='text-teal-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer '
          onClick={onDelete}>
          <LuTrash2 size={18} />
        </button>
        )}

        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${amountStyles}`}>
          <h6 className='text-xs font-medium'>{isIncome ? "+" : "-"} ${amount} </h6>
          {isIncome ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>

      </div>
    </div>
  )
}

export default TransactionInfoCard