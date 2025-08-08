import React, { useState } from 'react'

function DropDown({value}) {
    const [color,setColor]=useState()
  return (
    <div className='border rounded-lg shadow-xs border-gray-200 '>
        <div onClick={()=>setColor('bg-red-400')} className={`p-2 hover:bg-gray-100 ${color} rounded-lg hover:cursor-pointer text-center`}>{value}</div>

    </div>
  )
}

export default DropDown