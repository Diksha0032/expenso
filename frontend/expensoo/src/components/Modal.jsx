import React from 'react'

const Modal=({children,isOpen,onClose,title})=>{

  if(!isOpen) return null;
 return (
  <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100-1rem)] max-h-full overflow-x-hidden bg-black/20 bg-opacity-50'>
    <div className='relative p-4 pt-10 w-full max-w-2xl max-h-[90vh]'>
      <div className='relative bg-teal-100 rounded-lg shadow-sm dark:bg-gray-700'>
        <div className='flex items-center justify-between p-4 md:p-5 border-b border-teal-100 dark:border-gray-600 flex-shrink-0'>
        <h3 className='text-lg font-medium text-teal-800 dark:text-white'>{title}</h3>

        <button type="button"
        className='text-teal-800 bg-transparent hover:bg-teal-200 hover:text-teal-700 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white-300 cursor-pointer'
        onClick={onClose}>X</button>
      </div>
      <div className='p-4 md:p-5 space-y-4 overflow-y-auto'>
        {children}
      </div>
      </div>
    </div>
  </div>
 )
}
export default Modal