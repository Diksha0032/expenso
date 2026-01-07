import React from 'react'
import moment from 'moment'
import { LuArrowLeft } from 'react-icons/lu'
import TransactionInfoCard from './TransactionInfoCard'

const IncomeTransactions=({transactions})=>{

  return (
    <div className="card">
      <div className='flex items-center justify-between'>
        <h5 className='text-teal-900 text-b text-lg'>Income History</h5>
      </div>

      <div className="mt-6  bg-teal-100 border rounded-xl border-teal-300">
        {transactions?.slice(0,5)?.map((income)=>(
          <TransactionInfoCard
          key={income._id}
          title={income.source}
          icon={income.icon}
          date={moment(income.date).format("DD MM YYYY")}
          amount={income.amount}
          type="income"
          hideDeleteBtn />
        ))}
      </div>
    </div>
  )
}

export default IncomeTransactions