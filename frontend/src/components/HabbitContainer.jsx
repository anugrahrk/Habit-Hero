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
        <div className='flex justify-around flex-wrap w-screen md:w-auto md:gap-80 mt-10 relative'>
            <p className='text-lg font-bold text-gray-800'>Today</p>
            <button onClick={()=>{setaddNew(true)}} className='text-sm w-20 h-10 text-white rounded hover:cursor-pointer hover:shadow-lg shadow-gray-100 bg-gradient-to-r from-violet-600 to-indigo-600 flex justify-center items-center'>Add</button>
            

        </div>
        {addNew &&
            (
                <Addnew/>
                
            )
            }
        <div className='flex justify-center w-screen md:w-auto pt-3 '>
            <Habbitbox OnCompleted={false}  color="bg-white" width="w-screen md:w-[700px]"/>

        </div>
        <div className='md:flex pt-15 justify-around'>
        <div className='md:ml-2  text-center md:text-left mt-1'>
            <div className='text-lg md:ml-0 -ml-40 font-bold text-gray-800'>Completed</div>
            <div className='flex md:justify-center pt-3 '>
            <Habbitbox OnCompleted={true}  color="bg-gray-300" width="w-screen md:w-96"/>
            </div>
        </div>
        <div className='mt-10 md:mt-0 md:ml-2'>
            <div className='text-lg ml-5 md:ml-0 font-bold text-gray-800 flex gap-2'><span><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/bard.png" alt="bard"/></span>AI Generated</div>
            <div className='flex justify-center  mr-20 md:m-0 pt-3 w-screen md:w-auto '>
            <AIcontainer width="w-screen md:w-96"/>
            </div>
        </div>
        </div>
    </div>
  )
}

export default HabbitContainer