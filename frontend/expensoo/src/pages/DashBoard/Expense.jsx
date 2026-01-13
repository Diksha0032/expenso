import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../../components/layouts/Navbar'
import ExpenseTransactions from '../../components/Cards/ExpenseTransactions'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useUserAuth } from '../../hooks/useUserAuth';
import { UserContext } from '../../context/userContext';
import { LuMinus } from 'react-icons/lu';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import toast from 'react-hot-toast';
import Modal from '../../components/Modal';

import DeleteAlert from '../../components/DeleteAlert';

const Expense = ({ }) => {
  useUserAuth();

  const { user } = useContext(UserContext);

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Source is required")
      return
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0")
      return
    }

    if (!date) {
      toast.error("Date is required")
      return
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      })

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchDashboardData();
    } catch (error) {
      console.error(
        "Error adding expense",
        error.response?.data?.message || error.message
      )
    }
  }

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Expense details deleted successfully")
      fetchDashboardData();
    } catch (error) {
      console.error(
        "Error deleting expense",
        error.response?.data?.message || error.message
      )
    }
  }

  const handleDownloadExpenseDetails = async () => {
    try{
      const response=await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,{
        responseType:"blob",
      })
    
    const url=window.URL.createObjectURL(new Blob([response.data]));
    const link=document.createElement("a");
    link.href=url;
    link.setAttribute("download",`expense_details_${Date.now()}.xlsx`);
    document.body.appendChild(link)
    link.click()
    link.parentNode.removeChild(link)
    window.URL.revokeObjectURL(url)
    }catch(error){
      console.error("Error downloading expense details:",error)
      toast.error("Failed to download expense details.Please try again")
    }
  }

  const addThousandsSeparator = (num) => {
    return Number(num).toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`)

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong.Please try again", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, [])

    const onAddExpense = () => setOpenAddExpenseModal(true)

  return (
    <div className=''>
      <div className=''>
        <Navbar />

        {user && (
          <>
            <div className='pl-5 pr-5 bg-teal-100'>
              <header className='bg-teal-100 flex-col border-teal-100 rounded-xl h-45 bg-teal-200'>
                <div className='relative'>
                  <h1 className='text-3xl text-teal-900 absolute top-7 left-6'>Total Expense :</h1>
                </div>
                <div className='relative'>
                  <h2 className='text-teal-900 absolute top-23 text-2xl left-6'>Amount : {addThousandsSeparator(dashboardData?.totalExpense || 0.00)}</h2>
                  <div className='absolute right-5 top-7 '><button className='add-btn' onClick={onAddExpense}><LuMinus className="text-lg" />Add Expense</button></div>
                </div>
              </header>
            </div>
          </>)}
        <div className='p-3 bg-teal-100 border-4 rounded-2xl border-teal-100'>
          <section className='border-1 border-teal-100 rounded-xl bg-[#8cf0da]'>
            <ExpenseTransactions transactions={dashboardData?.last30DaysExpenses?.transactions || []}
              onAddExpense={() => setOpenAddExpenseModal(true)}
              onDelete={(id) => {
                setOpenDeleteAlert({ show: true, data: id });
              }}
              onDownload={handleDownloadExpenseDetails}
            />
          </section>
        </div>
      </div>
      <Modal
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add Expense">
        <AddExpenseForm onAddExpense={handleAddExpense} />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Expense">
        <DeleteAlert content='Are you sure you want to delete this expense'
          onDelete={() => deleteExpense(openDeleteAlert.data)} />
      </Modal>
    </div>
  )
}

export default Expense