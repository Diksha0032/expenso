import React from 'react'
import moment from 'moment'
import { LuArrowLeft } from 'react-icons/lu'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from './TransactionInfoCard'

const IncomeTransactions=({transactions,onDelete,onDownload })=>{

  return (
    <div className="card p-4">
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-teal-900 text-b text-lg'>Income History</h5>
        <button
          onClick={onDownload}
          className='p-2 text-teal-800 hover:bg-teal-200 rounded-full transition-full'>
            <LuDownload size={20} />
          </button>
      </div>

      <div className="bg-teal-100 border rounded-xl border-teal-300">
        {transactions?.slice(0,5)?.map((income)=>(
          <TransactionInfoCard
          key={income._id}
          title={income.source}
          icon={income.icon}
          date={moment(income.date).format("DD MM YYYY")}
          amount={income.amount}
          type="income"
          onDelete={()=>onDelete(income._id)} />
        ))}
      </div>
    </div>
  )
}

export default IncomeTransactions