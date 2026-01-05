import React, { useEffect, useState ,useContext} from 'react'
import Navbar from '../../components/layouts/Navbar'
import ExpenseTransactions from '../../components/Cards/ExpenseTransactions'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useUserAuth } from '../../hooks/useUserAuth';
import { UserContext } from '../../context/userContext';

const Expense=({})=>{
   useUserAuth();

  const { user } = useContext(UserContext);

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

  return(
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
              </div>
            </header>
          </div>
</>)}
      <div className='p-3 bg-teal-100 border-4 rounded-2xl border-teal-100'>
            <section className='border-1 border-teal-100 rounded-xl bg-[#8cf0da]'>
        <ExpenseTransactions transactions={dashboardData?.last30DaysExpenses?.transactions || []}
        />
      </section>
      </div>
    </div>
    </div>
  )
} 

export default Expense