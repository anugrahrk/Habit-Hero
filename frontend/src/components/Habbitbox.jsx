
import React, { useState } from 'react'
import { Habbit } from '../assets/mockdata'
import { useAtom } from 'jotai';
import { CategoryAtom, dateAtom } from '../atom/atom';
import Category from './Category';

function Habbitbox({OnCompleted,width,checked,color}) {
    const [date, setDate] = useAtom(dateAtom)
    const today = date.toLocaleDateString("en-CA");
    const [activeNoteIndex, setActiveNoteIndex] = useState(null)
    const [completed,setCompleted]=useState(false)
    const [SaveNotes,setSaveNotes]=useState("")
    const [Category1,setCategory]=useAtom(CategoryAtom)
    
    

  return (
    <div>
        <div className={`bg-red-400 rounded-lg ${width}  h-93 overflow-auto`}>
            {(() => {
  const filteredHabits = Habbit.filter((habit) => {
    const Category=habit.category==Category1||Category1===""
    return habit.startdate <= today && habit.completed === OnCompleted && Category ;
  });
  
  

  if (filteredHabits.length === 0) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <p className='text-xl font-bold text-white'>Empty</p>
      </div>
    );
  }

  return filteredHabits.map((habitO, index) => {


    return (
      <div key={index} className={` h-auto ${color} text-black p-4 m-4 rounded`}>
        <div className='flex justify-between items-center'>
          <div className='flex  items-center'>
            <input type="checkbox" defaultChecked={checked} className='mr-2 h-5 w-5 '  onChange={()=>setCompleted(!completed)}/>
            <span>{habitO.name}</span>
            <div className='text-sm gap-2 text-gray-600 pl-5 pt-1'><span>Notes:</span> <span>{habitO.notes}</span></div>
          </div>
          <div
            className='hover:cursor-pointer'
            onClick={() => setActiveNoteIndex(index === activeNoteIndex ? null : index)}
 
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
              <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
            </svg>
          </div>
        </div>

        {activeNoteIndex === index && (
          <div className='mt-4'>
            <input
              type="text"
              className='w-full h-20 text-left p-2 border rounded'
              onChange={(e) => setSaveNotes({ ...SaveNotes, [index]: e.target.value })}
            value={SaveNotes[index] || habitO.notes}
            />
            <button className='mt-2 bg-green-500 text-white px-4 py-2 rounded'>Save</button>
          </div>
        )}
      </div>
    );
  });
})()}
        </div>
    </div>
  )
}

export default Habbitbox