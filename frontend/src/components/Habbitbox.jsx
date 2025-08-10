
import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai';
import { CategoryAtom, CompletedAtom, dateAtom, HabbitAtom, XPAtom } from '../atom/atom';
import Category from './Category';
import axios from 'axios'

function Habbitbox({OnCompleted,width,color}) {
    const [date, setDate] = useAtom(dateAtom)
    const today = date.toLocaleDateString("en-CA");
    const [activeNoteIndex, setActiveNoteIndex] = useState(null)
    const [completed,setCompleted]=useAtom(CompletedAtom)
    const [SaveNotes,setSaveNotes]=useState("")
    const [Category1,setCategory]=useAtom(CategoryAtom)
    const [Habbit,setHabbit]=useAtom(HabbitAtom)
    const [id,setId]=useState(0)
    const [XP,setXP]=useAtom(XPAtom)    
    const[loading,setLoading]=useState(false)
    
  const apiUrl= import.meta.env.VITE_API_URL
  const calenderday=date.toLocaleDateString("en-CA");


    useEffect(()=>{
      const FetchAll=async()=>{
        setLoading(true)
        const response=await axios.get(`${apiUrl}view`)
        setLoading(false)
        setHabbit(response.data)
      }
      FetchAll()
    },[completed,Habbit.length])
    function weekylogic(startDate,targetDate){
      const start=new Date(startDate)
      const target=new Date(targetDate)
      start.setHours(0,0,0,0)
      target.setHours(0,0,0,0)

      const diffDay=Math.floor((target-start)/(1000*60*60*24))
      return diffDay>=0 && diffDay%7===0


    }
  
    
  const handleCheckboxChange = async (id, currentCompleted) => {
  try {
    const response = await axios.put(`${apiUrl}habits/${id}`, {
      completed: !currentCompleted
    });

    
  } catch (error) {
    console.error("Error updating habit:", error);
  }
}
const NotesUpdate=async(habitId,notes)=>{

    const response=await axios.put(`${apiUrl}habits/${habitId}`,{
      notes:notes
    })
    setHabbit(prev =>
prev.map(habit =>
habit.id === habitId ? { ...habit, notes: notes } : habit
)
);
            }
  const deleteHabbit=async(habitId)=>{
      const response=await axios.delete(`${apiUrl}habits/delete/${habitId}`)
      setHabbit(prev => prev.filter(habit => habit.id !== habitId));
    }



  return (
    <div>
        <div className={`bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg ${width}  h-93 overflow-auto`}>
            {(() => {
  const filteredHabits = Habbit.filter((habit) => {
    const Category=habit.category==Category1||Category1===""
    if (habit.frequency==="daily"){
      return habit.startdate <= today && habit.completed === OnCompleted && Category ;
    }
    if (habit.frequency==="weekly"){
      return weekylogic(habit.startdate,calenderday) && habit.completed === OnCompleted && Category ;
    }
    
  });
  
  

  if (filteredHabits.length === 0) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <p className='text-xl font-bold text-white'>{loading ?("Loading...") :("Empty")}</p>
      </div>
    );
  }

  return filteredHabits.map((habitO) => {


    return (
      <div key={habitO.id} className={` h-auto ${color} text-black p-4 m-4 rounded`}>
        <div className='flex justify-between items-center'>
          <div className='flex  items-center'>
            <input  type="checkbox" className='mr-2 h-5 w-5 '  defaultChecked={OnCompleted}
      onChange={() => {handleCheckboxChange(habitO.id, habitO.completed)
        setCompleted(!completed)
      }}/>
            <span>{habitO.name}</span>
            <div className='text-sm gap-2 text-gray-600 pl-5 pt-1'><span>Notes:</span> <span>{habitO.notes}</span></div>
          </div>
          <div
            className='hover:cursor-pointer'
            onClick={() => setActiveNoteIndex(habitO.id === activeNoteIndex ? null : habitO.id)}
 
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
              <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
            </svg>
          </div>
        </div>

        {activeNoteIndex === habitO.id && (
          <div className='mt-4'>
            <input
              type="text"
              className='w-full h-20 text-left p-2 border rounded'
              onChange={(e) => setSaveNotes({ ...SaveNotes, [habitO.id]: e.target.value })}
            value={SaveNotes[habitO.id] || habitO.notes}
            />
            <div className='flex gap-10'>
            <button onClick={()=>{
              NotesUpdate(habitO.id, SaveNotes[habitO.id] || habitO.notes);
              setActiveNoteIndex(null);

            }} className='mt-2 bg-green-500 text-white px-4 py-2 rounded'>Save</button>
            <button onClick={()=>{
              deleteHabbit(habitO.id)
              setActiveNoteIndex(null);

            }} className='mt-2 bg-red-500 text-white px-4 py-2 rounded'>Delete</button>

            </div>
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