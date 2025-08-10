import axios from 'axios'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { HabbitAtom } from '../atom/atom'

function AIcontainer({width}) {
    const apiUrl= import.meta.env.VITE_API_URL
    const [AI,setAi]=useState([])
    const [Habbit,setHabbit]=useAtom(HabbitAtom)
    const [loading,setLoading]=useState(false)
    

    useEffect(()=>{
        const FetchAIRecommendation=async()=>{
            setLoading(true)
            const response=await axios.get(`${apiUrl}habits/recommend`)
            setLoading(false)
            setAi(response.data)
        }
        FetchAIRecommendation()
    },[])
  return (
    <div className=''>
        <div className={`bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg ${width}  h-93 overflow-auto`}>
            {loading && (
                <div className='w-full h-full flex justify-center items-center'>
        <p className='text-xl font-bold text-white'>Loading ....</p>
      </div>
            )

            }
            {AI.map((ai,index)=>{   
                return(
                <div key={index} className={` h-auto bg-white text-black p-4 m-4 rounded`}>
                    <div className='flex justify-between items-center'>
                        <span>{ai.name}</span>
                        <button onClick={async()=>{
                            const response=await axios.post(`${apiUrl}add`,{
                                name:ai.name,
                                notes:ai.notes,
                                startdate:ai.startdate,
                                frequency:ai.frequency,
                                category:ai.category
                            })
                            setAi(prevAi=>prevAi.filter(item =>  item.name!==ai.name))
                            setHabbit(prevHabbit => [...prevHabbit, response.data]);
                        }} className='w-15 h-10 cursor-pointer hover:bg-blue-700 rounded-lg text-white bg-blue-500'>Add</button>
                    </div>

                        <div className='text-sm gap-2 text-gray-600  pt-1'><span>Notes:</span> <span>{ai.notes}</span></div>
                        
                </div>)
            })    
            }

        </div>
    </div>

  )
}

export default AIcontainer