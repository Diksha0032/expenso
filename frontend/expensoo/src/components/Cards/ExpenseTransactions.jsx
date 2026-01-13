import React from 'react'
import moment from 'moment'
import { LuArrowRight } from 'react-icons/lu'
import { LuDownload } from 'react-icons/lu'
import
TransactionInfoCard from './TransactionInfoCard'

const ExpenseTransactions = ({ transactions, onDelete, onDownload }) => {
  console.log("Expense Data:", transactions)
  return (
    <div className="card">
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Expenses</h5>
        <button
          onClick={onDownload}
          className='p-2 text-teal-800 hover:bg-teal-200 rounded-full transition-full'>
          <LuDownload size={20} />
        </button>
      </div>

      <div className="mt-6  bg-teal-100 border rounded-xl border-teal-300">
        {transactions?.slice(0, 5)?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("DD MM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)} />
        ))}
      </div>
    </div>
  )
}

export default ExpenseTransactions