import React from 'react'
import { useState,useEffect } from 'react';
import CustomPieChart from '../../Charts/CustomPieChart';

const COLORS=["#0D9488","#2DD4BF","#0F766E"]

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const[chartData,setChartData]=useState([]);
  const prepareChartData=()=>{
    if(Array.isArray(data)){
      const dataArr=data?.map((item)=>({
      name:item?.source || "",
      amount:Number(item?.amount) || 0,
    }))
    setChartData(dataArr)
    }
    else{
      setChartData([])
    }

  }

  useEffect(()=>{
    prepareChartData();

    return ()=>{};
  },[data])

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-teal-900 text-lg'>Last 30 Days Income
        </h5>
        </div>

         <CustomPieChart
      data={chartData}
      label="Total Income"
      totalAmount={`${totalIncome}`}
      colors={COLORS}
      showTextAnchor />
    </div>
  )
};

export default RecentIncomeWithChart