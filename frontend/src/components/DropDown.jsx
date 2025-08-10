import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { frequencyAtom } from '../atom/atom'

function DropDown({value}) {
    const [freq,setFreq]=useAtom(frequencyAtom)
    const Selected=freq === value
  return (
    <div className='border rounded-lg shadow-xs border-gray-200 '>
        <div   onClick={()=>{
          setFreq(value)
        }} className={`p-2 hover:bg-gray-100 ${Selected?'bg-gradient-to-r from-violet-600 to-indigo-600':''} rounded-lg hover:cursor-pointer text-center`}>{value}</div>

    </div>
  )
}

export default DropDown