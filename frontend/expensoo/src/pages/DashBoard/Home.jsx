import React from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Navbar from "../../components/layouts/Navbar"
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import RecentTransactions from '../../components/layouts/Dashboard/RecentTransactions';
import { useUserAuth } from "../../hooks/useUserAuth"
import FinanceOverview from '../../components/layouts/Dashboard/FinanceOverview';
import RecentIncomeWithChart from '../../components/layouts/Dashboard/RecentIncomeWithChart';
import ExpenseTransactions from '../../components/Cards/ExpenseTransactions';

const Home = () => {

  useUserAuth();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className=''>

      <Navbar></Navbar>

      {user && (
        <>
          <div className='pl-5 pr-5 bg-teal-100'>
            <header className='bg-teal-100 flex-col border-teal-100 rounded-xl h-45 bg-teal-200'>
              <div className='relative'>
                <h1 className='text-3xl text-teal-900 absolute top-7 left-6'>Total Balance :</h1>
              </div>
              <div className='relative'>
                <h2 className='text-teal-900 absolute top-23 text-2xl left-6'>Amount : {addThousandsSeparator(dashboardData?.totalBalance || 100)}</h2>
              </div>
            </header>
          </div>

          <div className='p-3 bg-teal-100 border-4 rounder-2xl border-teal-100'>
            <section className='border-1 border-teal-100 rounded-xl bg-[#8cf0da]'>
              <RecentTransactions transactions={dashboardData?.recentTransactions}
                onSeeMore={() => navigate("/expense")} />
            </section>
            <section className='pt-6'>
              <FinanceOverview totalBalance={dashboardData?.totalBalance || 0}
        totalIncome={dashboardData?.totalIncome || 0}
        totalExpense={dashboardData?.totalExpense || 0} />
            </section>
            <section className='pt-3'>
              <RecentIncomeWithChart data={dashboardData?.last30DaysIncome?.transactions?.slice(0,4) || []}
              totalIncome={dashboardData?.totalIncome || 0} />
            </section>  

          </div>
        </>
      )}
    </div>

  )
}


export default Home