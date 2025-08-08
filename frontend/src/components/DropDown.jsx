import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { frequencyAtom } from '../atom/atom'

function DropDown({key,value}) {
    const [color,setColor]=useState()
    const [freq,setFreq]=useAtom(frequencyAtom)
  return (
    <div className='border rounded-lg shadow-xs border-gray-200 '>
        <div id={key}  onClick={()=>{setColor('bg-gradient-to-r from-violet-600 to-indigo-600')
          setFreq(value)
        }} className={`p-2 hover:bg-gray-100 ${color} rounded-lg hover:cursor-pointer text-center`}>{value}</div>

    </div>
  )
}

export default DropDown