import React, { useState } from 'react'
import PrintPdf from './PrintPdf'

function Header() {
    const [open,setOpen]=useState(false)
  return (
    <div className='flex justify-between w-full pl-10 pr-10 pt-5'>
        <div className='flex gap-2'>
            <h1 className='text-xl font-bold text-red-600 '>Habit</h1>
            <h1 className='text-xl text-gray-800'>Hero</h1>
        </div>
        <div className='relative'>
        <div className='border rounded-full p-2 flex items-center justify-center border-gray-300 hover:bg-gray-200 hover:cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" onClick={()=>setOpen(!open)} className="size-4">
  <path d="M8 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
</svg>

        </div>
        {open && 
        <div className='absolute right-0 gap-2 shadow-lg bg-white shadow-gray-300 border border-gray-200 rounded-lg w-40 h-12.5 text-center'>
            <PrintPdf/>
        </div>}
        </div>
    </div>
  )
}

export default Header