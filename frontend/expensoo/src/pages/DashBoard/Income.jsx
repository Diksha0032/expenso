import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../../components/layouts/Navbar'
import IncomeTransactions from '../../components/Cards/IncomeTransactions'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useUserAuth } from '../../hooks/useUserAuth';
import { UserContext } from '../../context/userContext';
import Modal from '../../components/Modal';
import { LuPlus } from 'react-icons/lu';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import DeleteAlert from '../../components/DeleteAlert';
import { toast } from "react-hot-toast"

const Income = ({ }) => {
  useUserAuth();

  const { user } = useContext(UserContext);

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      })

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchDashboardData();
    } catch (error) {
      console.error(
        "Error adding income",
        error.response?.data?.message || error.message
      )
    }
  }

  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

      setOpenDeleteAlert({show:false,data:null})
      toast.success("Income details deleted successfully")
      fetchDashboardData();
    }catch(error){
      console.error(
        "Error deleting income",
        error.response?.data?.message || error.message
      )
    }
  }

  const handleDownloadIncomeDetails = async () => {
      try{
      const response=await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME,{
        responseType:"blob",
      })
    
    const url=window.URL.createObjectURL(new Blob([response.data]));
    const link=document.createElement("a");
    link.href=url;
    link.setAttribute("download",`income_details_${Date.now()}.xlsx`);
    document.body.appendChild(link)
    link.click()
    link.parentNode.removeChild(link)
    window.URL.revokeObjectURL(url)
    }catch(error){
      console.error("Error downloading income details:",error)
      toast.error("Failed to download income details.Please try again")
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

  const onAddIncome = () => setOpenAddIncomeModal(true)

  return (
    <div>
      <Navbar />

      {user && (
        <>
          <div className='pl-5 pr-5 bg-teal-100'>
            <header className='bg-teal-100 flex-row border-teal-100 rounded-xl h-45 text-teal-800 bg-teal-200'>
              <div className=' flex relative'>
                <h1 className='text-3xl text-teal-900 absolute top-7 left-6'>Total Income :</h1>
                <h2 className='text-teal-900 absolute top-25 text-2xl left-6'>Amount : {addThousandsSeparator(dashboardData?.totalIncome || 0.00)}</h2>

                <div className='absolute right-5 top-7 '><button className='add-btn' onClick={onAddIncome}><LuPlus className="text-lg" />Add Income</button></div>
              </div>
            </header>
          </div>

          <div className='p-3 bg-teal-100 border-4 rounded-2xl border-teal-100'>
            <section className='border-1 border-teal-100 rounded-xl bg-[#8cf0da]'>
              <IncomeTransactions transactions={dashboardData?.last30DaysIncome?.transactions || []}
                onAddIncome={() => setOpenAddIncomeModal(true)}
                onDelete={(id) => {
                  setOpenDeleteAlert({ show: true, data: id });
                }}
                onDownload={handleDownloadIncomeDetails}
              />
            </section>
          </div>
        </>
      )}

      <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income">
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Income">
        <DeleteAlert content='Are you sure you want to delete this income'
          onDelete={() => deleteIncome(openDeleteAlert.data)} />
      </Modal>
    </div >
  )
}
export default Income