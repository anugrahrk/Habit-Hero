import { useEffect } from 'react'
import './App.css'
import Category from './components/Category'
import HabbitContainer from './components/HabbitContainer'
import Header from './components/Header'
import Rightside from './components/Rightside'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  useEffect(()=>{
      const notify = () => toast("Wow so easy!");
      notify()
  },[])
  
  return (
    <>
      <div className='w-screen h-auto overflow-x-hidden'>
        
        <div className='grid grid-cols-3 '>
          
          <div className=' col-span-2 h-full'>
            <Header/>
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

export default App
