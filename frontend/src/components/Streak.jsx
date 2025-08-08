import React from 'react'

function Streak({imglink,iconname,value}) {
  return (
    <div className='flex justify-center gap-2 p-3 m-5 items-center'>
        <div className='flex p-2 items-center gap-2 bg-white rounded-lg '>
            <img width="48" height="48" src={imglink} alt={iconname}/>        <div>{value}</div>
        </div>
    </div>
  )
}

export default Streak