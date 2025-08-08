import React from 'react'

function Bestday({content,value}) {
  return (
    <div className='flex justify-center p-2 m-5 items-center gap-2'>
        <p className='text-white'>{content}</p>
        <div className='bg-white p-3 rounded-lg'>{value}</div>

    </div>
  )
}

export default Bestday