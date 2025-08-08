import React, { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Bestday from './Bestday';
import Streak from './Streak';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useAtom } from 'jotai';
import { dateAtom, percentageAtom } from '../atom/atom'
import { Habbit } from '../assets/mockdata';


function Rightside() {
    const [date, setDate] = useAtom(dateAtom)
    const [percentage,setPercentage]=useAtom(percentageAtom)
    const today = date.toLocaleDateString("en-CA");
    // const[Sucess,setSucess]=useState("")
    const [streak,setStreak]=useState(0)
    const [bestday,setBestDay]=useState("")
    const[prevPercentage,setPrev]=useState(0)



    const onChange = (newDate) => {
    setDate(newDate)

  }
  useEffect(()=>{
    const today = new Date().toLocaleDateString("en-CA");
    const yesterday= new Date(Date.now() - 86400000).toLocaleDateString('en-CA');
    const lastday=localStorage.getItem("lastCheckedDate")
    const Streakcount=localStorage.getItem("StreakCount") || '0'
    const completedYesterday=Habbit.filter((habbit)=>{
        return habbit.completed=="true" && habbit.startdate<=yesterday
    })
    if (lastday==yesterday && completedYesterday.length>0){
        const newStreak=parseInt(Streakcount)+1
        localStorage.setItem("StreakCount",newStreak)
    }
    else{
        localStorage.setItem("StreakCount",1)
    }
    setStreak(localStorage.getItem("StreakCount"))
    localStorage.setItem("lastCheckedDate",today)
  })

  useEffect(()=>{
    const completed=Habbit.filter((habit)=>{
        return habit.completed==="true" && habit.startdate<=today
    })
    const total=Habbit.filter((habit)=>{
        return habit.startdate<=today
    })
    const percentage=total.length>0?((completed.length/total.length)*100).toFixed(0):0
    setPercentage(percentage)
    if(percentage>prevPercentage){
        setPrev(percentage)
        setBestDay(today)
    }

  },[date])
//   useEffect(()=>{
//     const completed=Habbit.filter((habit)=>{
//         return habit.completed==="true" && habit.startdate==today
//     })
//     const total=Habbit.filter((habit)=>{
//         return habit.startdate==today
//     })
//     const percentage=total.length>0?((completed.length/total.length)*100).toFixed(0):0
//     setSucess(percentage)

//   },[date])
  return (
    <div>
        <div className='shadow-lg rounded-lg shadow-gray-600 col-span-1 m-5  h-full bg-red-400 '>
            <div className='flex justify-center pt-2'>
                <div className=' h-40 w-4z0 flex justify-center p-2 m-5 bg-white rounded-full '>
            <CircularProgressbar value={percentage} text={`${percentage}%`}/>
            </div>
            </div>
            
            <Bestday content={"Best Day:"} value={bestday}/>
            <Streak imglink={'https://img.icons8.com/emoji/48/fire.png'} iconname={'fire'} value={`${streak}`}/>
            {/* <Bestday content={"Sucess Rate:"} value={Sucess}/> */}
            <Streak imglink={'https://img.icons8.com/emoji/48/trophy-emoji.png'} iconname={'trophy'} value={'100 XP'}/>
            {/* <Bestday content={"Badge:"} value={"Consistency King"}/> */}

                <div className='flex justify-center m-5 '>
                    <Calendar onChange={onChange} value={date} />
                </div>
        
            



        </div>
    </div>
  )
}   

export default Rightside