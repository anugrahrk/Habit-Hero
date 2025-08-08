import React, { useState } from 'react'
import DropDown from './DropDown'
import { useAtom } from 'jotai'
import { AddnewAtom } from '../atom/atom'

function Addnew() {
  const frequencyList=["daily", "weekly"]
  const [open,setOpen]=useState(false)
  const [addNew,setaddNew]=useAtom(AddnewAtom)
  
  return (
    <div className='flex justify-center'>
        <div className=' absolute  w-2/4 h-2/4 border border-gray-200 bg-white rounded-lg shadow-sm p-15 '>
        <form action="">
          <div className='flex gap-4 pb-5 pt-10'>
            <label htmlFor="">Title:</label>
            <input type="text" className='border w-2/3 p-0.5 border-gray-400 rounded-lg shadow-xs' name="" id="" />
          </div>
          
            <div className='flex gap-5'><div>StartDate:</div><input className='border border-gray-400 rounded-lg p-1' type="date" /></div>
            <div className=' flex gap-5 pt-5 pb-3'><p>Frequency:</p>
            <div className=' justify-around'>
              <div className='flex gap-5'>
                {frequencyList.map((freq)=><DropDown value={freq}/>)
              
            }
              </div>
              </div>
            </div>

              <div className='flex gap-2 pt-4 pb-3'>
                <p className=''>Category:</p>
            <div onClick={()=>setOpen(!open)} className='relative w-2/6 h-7 border border-gray-400 rounded-lg shadow-xs flex items-end justify-end'>{}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>

            </div>
            {open &&
            <div className='absolute mt-7 ml-19 border border-gray-200 rounded-lg shadow-xs bg-white items-center text-center w-1/4 h-1/4'>
              <div className='p-1 mt-2 cursor-pointer hover:bg-gray-100'>health</div>
              <div className='p-1 hover:bg-gray-100 cursor-pointer'>work</div>
              <div className='p-1 hover:bg-gray-100 cursor-pointer'>learning</div>

            </div>

            }
              </div>
            <div className=' flex justify-end gap-10 pt-15 pb-5'>
            <button className='bg-red-400 w-1/3 h-10 text-white rounded-lg shadow-sm flex justify-center items-center'>Submit</button><button onClick={()=>setaddNew(false)} className='flex justify-center w-1/3 h-10 items-center border rounded-lg border-gray-300 '>Back</button>

            </div>
            </form>
        </div>
            
    </div>
  )
}

export default Addnew