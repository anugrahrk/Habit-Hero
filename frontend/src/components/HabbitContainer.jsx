import React, { useState } from 'react'
import { Habbit } from '../assets/mockdata'
import Habbitbox from './Habbitbox';
import Addnew from './Addnew';
import { useAtom } from 'jotai';
import { AddnewAtom } from '../atom/atom';
import AIcontainer from './AIcontainer';

function HabbitContainer() {
    const [addNew,setaddNew]=useAtom(AddnewAtom)
    
    
  return (
    <div className='relative'>
        <div className='flex justify-around gap-80 mt-10 relative'>
            <p className='text-lg font-bold text-gray-800'>Today</p>
            <button onClick={()=>{setaddNew(true)}} className='text-sm w-20 h-10 text-white rounded hover:cursor-pointer hover:shadow-lg shadow-gray-100 bg-gradient-to-r from-violet-600 to-indigo-600 flex justify-center items-center'>Add</button>
            

        </div>
        {addNew &&
            (
                <Addnew/>
                
            )
            }
        <div className='flex justify-center pt-3 '>
            <Habbitbox OnCompleted={false} checked={false} color="bg-white" width="w-[700px]"/>

        </div>
        <div className='flex pt-15 justify-around'>
        <div className='ml-2 mt-1'>
            <div className='text-lg font-bold text-gray-800'>Completed</div>
            <div className='flex justify-center pt-3 '>
            <Habbitbox OnCompleted={true} checked={true} color="bg-gray-300" width="w-96"/>
            </div>
        </div>
        <div className='ml-2'>
            <div className='text-lg font-bold text-gray-800 flex gap-2'><span><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/bard.png" alt="bard"/></span>AI Generated</div>
            <div className='flex justify-center pt-3 '>
            <AIcontainer width="w-96"/>
            </div>
        </div>
        </div>
    </div>
  )
}

export default HabbitContainer