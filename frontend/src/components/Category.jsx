import { useAtom } from 'jotai'
import React from 'react'
import { CategoryAtom } from '../atom/atom'

function Category() {
    const [Category,setCategory]=useAtom(CategoryAtom)
  return (
    <div className='w-full flex justify-center pt-10'>
        <div className=' bg-gradient-to-r from-violet-600 to-indigo-600 w-3/4 text-white p-5 flex gap-4 justify-around rounded-lg'>
            <div className={`hover:underline ${Category==""?"underline":""} hover:cursor-pointer`} onClick={()=>setCategory("")}>All</div>
            <div className={`hover:underline ${Category=="health"?"underline":""} hover:cursor-pointer`} onClick={()=>setCategory("health")}>Fitness</div>
            <div className={`hover:underline ${Category=="work"?"underline":""} hover:cursor-pointer`}onClick={()=>setCategory("work")}>Mental Health</div>
            <div className={`hover:underline ${Category=="learning"?"underline":""} hover:cursor-pointer`}onClick={()=>setCategory("learning")}>Productivity</div>
        </div>
    </div>
  )
}

export default Category