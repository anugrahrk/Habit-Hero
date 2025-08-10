import { useEffect } from 'react'
import Category from './Category'
import HabbitContainer from './HabbitContainer'
import Header from './Header'
import Rightside from './Rightside'
import { ToastContainer, toast } from 'react-toastify';

function Home() {
  const motivational_quotes=[
  {
    "quote": "Successful people are not gifted; they just work hard, then succeed on purpose.",
  },
  {
    "quote": "Success isn't always about greatness. It's about consistency. Consistent hard work leads to success. Greatness will come.",
  },
  {
    "quote": "The only thing standing between you and outrageous success is continuous progress.",
  },
  {
    "quote": "I never dreamt of success. I worked for it.",
  },
  {
    "quote": "Success seems to be connected with action. Successful people keep moving. They make mistakes, but they don't quit.",
  },
  {
    "quote": "Success in business requires training and discipline and hard work. But if you're not frightened by these things, the opportunities are just as great today as they ever were.",
  },
  {
    "quote": "Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened, vision cleared, ambition inspired and success achieved.",

  },
  {
    "quote": "I've come to believe that each of us has a personal calling that's as unique as a fingerprint and that the best way to succeed is to discover what you love and then find a way to offer it to others in the form of service, working hard and also allowing the energy of the universe to lead you.",
  },
  {
    "quote": "Success is the sum of small efforts, repeated day in and day out.",
  },
  {
    "quote": "The most certain way to succeed is always to try just one more time.",
  }
]
  useEffect(()=>{
      const random=Math.floor(Math.random()* motivational_quotes.length)
      const randomQuotes=motivational_quotes[random].quote
      toast(randomQuotes,{autoClose:5000})
  },[])
  
  return (
    <>
      <div className='w-screen h-auto overflow-x-hidden'>
            <Header/>
        
        <div className='grid grid-rows-1 md:grid-cols-3 '>
          
          <div className='order-2 md:order-0 md:col-span-2 h-full'>
            <Category/>
            <HabbitContainer/>
          </div>
          <Rightside/>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Home
