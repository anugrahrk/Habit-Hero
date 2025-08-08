import React, { useEffect, useState, useRef } from 'react'
import { useAtom } from 'jotai';
import { CompletedAtom, dateAtom, HabbitAtom, percentageAtom, XPAtom } from '../atom/atom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Bestday from './Bestday';
import Streak from './Streak';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function Rightside() {
  const [date, setDate] = useAtom(dateAtom)
  const [percentage,setPercentage] = useAtom(percentageAtom)
  const [bestday,setBestDay] = useState("")
  const prevPercentageRef = useRef(0)
  const [Habbit,setHabbit] = useAtom(HabbitAtom)
  const [streak,setStreak] = useState(0)
  const [XP,setXP] = useAtom(XPAtom)

  const today = date.toLocaleDateString("en-CA")

  const onChange = (newDate) => {
    setDate(newDate)
  }

  useEffect(() => {
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA');
    const lastday = localStorage.getItem("lastCheckedDate")
    const Streakcount = localStorage.getItem("StreakCount") || '0'

    const completedYesterday = Habbit.filter(habit => habit.completed === true && habit.startdate <= yesterday)

    if (lastday === yesterday && completedYesterday.length > 0) {
      const newStreak = parseInt(Streakcount) + 1
      localStorage.setItem("StreakCount", newStreak)
      setStreak(newStreak)
    } else {
      localStorage.setItem("StreakCount", 1)
      setStreak(1)
    }

    localStorage.setItem("lastCheckedDate", today)
  }, [Habbit, today])

  useEffect(() => {
    const completed = Habbit.filter(habit => habit.completed === true && habit.startdate <= today)
    const total = Habbit.filter(habit => habit.startdate <= today)
    const newPercentage = total.length > 0 ? ((completed.length / total.length) * 100).toFixed(0) : 0

    setPercentage(newPercentage)

    if (newPercentage > prevPercentageRef.current) {
      prevPercentageRef.current = newPercentage
      setBestDay(today)
    }

  }, [date, Habbit])

  return (
    <div>
      <div className='shadow-lg rounded-lg shadow-gray-600 col-span-1 m-5  h-full bg-gradient-to-r from-violet-600 to-indigo-600 '>
        <div className='flex justify-center pt-2'>
          <div className=' h-40 w-40 flex justify-center p-2 m-5 bg-white rounded-full '>
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
          </div>
        </div>

        <Bestday content={"Best Day:"} value={bestday} />
        <Streak imglink={'https://img.icons8.com/emoji/48/fire.png'} iconname={'fire'} value={`${streak}`} />
        <Streak imglink={'https://img.icons8.com/emoji/48/trophy-emoji.png'} iconname={'trophy'} value={`${XP}XP`} />

        <div className='flex justify-center m-5 '>
          <Calendar onChange={onChange} value={date} />
        </div>
      </div>
    </div>
  )
}

export default Rightside
