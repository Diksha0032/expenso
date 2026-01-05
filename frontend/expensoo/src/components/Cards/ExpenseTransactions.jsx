import React from 'react'
import moment from 'moment'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from './TransactionInfoCard'

const ExpenseTransactions=({transactions})=>{
  console.log("Expense Data:", transactions)
  return (
    <div className="card">
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Expenses</h5>
      </div>

      <div className="mt-6  bg-teal-100 border rounded-xl border-teal-300">
        {transactions?.slice(0,5)?.map((expense)=>(
          <TransactionInfoCard
          key={expense._id}
          title={expense.category}
          icon={expense.icon}
          date={moment(expense.date).format("DD MM YYYY")}
          amount={expense.amount}
          type={expense.type}
          hideDeleteBtn />
        ))}
      </div>
    </div>
  )
}

export default ExpenseTransactions