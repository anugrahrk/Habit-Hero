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
  const [streak,setStreak] = useState()
  const [XP,setXP] = useAtom(XPAtom)

  const today = new Date().toLocaleDateString("en-CA")
  const calenderday=date.toLocaleDateString("en-CA");



  const onChange = (newDate) => {
    setDate(newDate)
  }

 useEffect(() => {
  const today = new Date().toLocaleDateString('en-CA');
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA');

  const lastday = localStorage.getItem("lastCheckedDate");
  const storedStreak = parseInt(localStorage.getItem("StreakCount") || '0');

  const completedToday = Habbit.filter(habit => habit.completed && habit.startdate <= today);

  let newStreak = storedStreak;

  if (lastday === yesterday && completedToday.length > 0) {
    newStreak = storedStreak + 1;
  }
  else if (lastday === today) {
    newStreak = storedStreak;
  }
  else {
    newStreak = 0;
  }

  if (completedToday.length > 0) {
    localStorage.setItem("lastCheckedDate", today);
    localStorage.setItem("StreakCount", newStreak);
  }

  setStreak(newStreak);
}, [Habbit]);

  useEffect(() => {
  const completed = Habbit.filter(
    habit => habit.completed === true && habit.startdate <= calenderday
  );
  const total = Habbit.filter(habit => habit.startdate <= calenderday);

  const newPercentage = total.length > 0 
    ? Math.round((completed.length / total.length) * 100) 
    : 0;

  setPercentage(newPercentage);

  const storedBestPercentage = parseInt(localStorage.getItem("BestPercentage") || '0');

  if (newPercentage > storedBestPercentage && calenderday <= today) {
    localStorage.setItem("BestPercentage", newPercentage);
    localStorage.setItem("BestDay", calenderday);
    setBestDay(calenderday);
  } else {
    setBestDay(localStorage.getItem("BestDay") || today);
  }

}, [Habbit, date]);

  useEffect(()=>{
    const CompletedLength=Habbit.filter((habit)=> habit.completed).length
    setXP(parseInt(CompletedLength)*100)
  },[Habbit])

  return (
    <div>
      <div className='shadow-lg w-screen md:w-auto flex md:block justify-center items-center rounded-lg shadow-gray-600 flex-wrap md:col-span-1 md:m-5  h-auto md:h-full bg-gradient-to-r from-violet-600 to-indigo-600 '>
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
