import React from 'react'

const DeleteAlert=({content,onDelete})=>{
  return(
    <div>
      <p className='text-sm text-teal-800'>{content}</p>

      <div className='flex justify-end mt-6'>
        <button 
          type="button"
          className='add-btn'
          onClick={onDelete}>
            Delete
          </button>
      </div>
    </div>
  )
}

export default DeleteAlert