import React from 'react'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white shadow-md rounded-lg p-2 border border-teal-100'>
        <p className='text-xs front-semibold text-teal-800 mb-1'>{payload[0].value}</p>
        <p className='text-sm text-teal-900'>
          Amount:{" "} <span className=''>{payload[0].value}</span>
        </p>
      </div>
    )
  }
  return null;
}

export default CustomTooltip
