import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()
  const apiUrl= import.meta.env.VITE_API_URL
  const SetOnclick=async()=>{
    const response=await axios.post(`${apiUrl}signin`,{
      username,
      password
    })
    if (response.data.msg=='Login sucess'){
        navigate('/')
    }
    else{
      alert("invalid user")
    }
    

  }

  return (
    <div className='overflow-hidden'>
        <div className='flex gap-2'>
            <h1 className='text-xl font-bold text-red-600 '>Habit</h1>
            <h1 className='text-xl text-gray-800'>Hero</h1>
            
        </div>
        <div className='w-screen h-screen flex justify-center items-center'>
          <div className='w-100 h-78  bg-white rounded-lg border-t border-t-gray-100 shadow-lg shadow-gray-200 '>
              <h1 className=' text-center pt-5 pb-10 text-xl font-bold '>LOGIN</h1>
              <div className='grid grid-rows-3 gap-8 justify-center items-center '>
              <input className='row-span-1 w-60 border rounded-lg border-gray-400 text-center h-7' onChange={((e)=>setUsername(e.target.value))} value={username} placeholder='username' type="text" name="" id="" />
              <input className='row-span-1 w-60 border rounded-lg border-gray-400 text-center h-7'onChange={((e)=>setPassword(e.target.value))} value={password} placeholder='password' type="text" />
              <div className='w-full items-center flex justify-center '>
              <input onClick={SetOnclick} className='row-span-1 w-20 h-9 border text-white bg-green-400 rounded-lg border-gray-400 hover:bg-green-500 cursor-pointer' type="submit" />

              </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Login