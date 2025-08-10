import React, { useState } from 'react'
import DropDown from './DropDown'
import { useAtom } from 'jotai'
import { AddnewAtom, frequencyAtom, HabbitAtom } from '../atom/atom'
import axios from 'axios'

function Addnew() {
  const frequencyList = ["daily", "weekly"];
  const [open, setOpen] = useState(false);
  const [addNew, setaddNew] = useAtom(AddnewAtom);
  const [title, setTitle] = useState("");
  const [startdate, setStartdate] = useState("");
  const [category, setCategory] = useState("");
  const [freq, setFreq] = useAtom(frequencyAtom);
  const [Habbit,setHabbit]=useAtom(HabbitAtom)
  const apiUrl = import.meta.env.VITE_API_URL;

  const onButtonclick = async () => {
    try {
      const response = await axios.post(`${apiUrl}add`, {
        name: title,
        startdate: startdate,
        category: category,
        frequency: freq,
      });
      setHabbit(prev=>[...prev,response])
    } catch (error) {
      console.error("Failed to add habit:", error);
    }

  };

  return (
    <div className="flex justify-center w-screen md:w-auto">
      <div className="absolute w-2/4 h-2/4 border border-gray-200 bg-white rounded-lg shadow-sm p-15 ">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await onButtonclick();
            setaddNew(false);
          }}
        >
          <div className="flex gap-4 pb-5 pt-10">
            <label>Title:</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              className="border w-2/3 p-0.5 border-gray-400 rounded-lg shadow-xs"
            />
          </div>

          <div className="flex gap-5">
            <div>StartDate:</div>
            <input
              onChange={(e) => setStartdate(e.target.value)}
              value={startdate}
              className="border border-gray-400 rounded-lg p-1"
              type="date"
            />
          </div>

          <div className="flex gap-5 pt-5 pb-3">
            <p>Frequency:</p>
            <div className="justify-around">
              <div className="flex gap-5">
                {frequencyList.map((freqItem, idx) => (
                  <DropDown key={idx} value={freqItem} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4 pb-3">
            <p>Category:</p>
            <div
              onClick={() => setOpen(!open)}
              className="relative w-2/6 h-7 border border-gray-400 rounded-lg shadow-xs flex items-end justify-end"
            >
              {category}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            {open && (
              <div className="absolute mt-7 ml-19 border border-gray-200 rounded-lg shadow-xs bg-white items-center text-center w-1/4 h-1/4">
                <div
                  onClick={() => {
                    setCategory("health");
                    setOpen(false);
                  }}
                  className="p-1 mt-2 cursor-pointer hover:bg-gray-100"
                >
                  health
                </div>
                <div
                  onClick={() => {
                    setCategory("work");
                    setOpen(false);
                  }}
                  className="p-1 hover:bg-gray-100 cursor-pointer"
                >
                  work
                </div>
                <div
                  onClick={() => {
                    setCategory("learning");
                    setOpen(false);
                  }}
                  className="p-1 hover:bg-gray-100 cursor-pointer"
                >
                  learning
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-10 pt-15 pb-5">
            <button
              type="submit"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 cursor-pointer w-1/3 h-10 text-white rounded-lg shadow-sm flex justify-center items-center"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setaddNew(false)}
              className="flex justify-center w-1/3 h-10 items-center border rounded-lg border-gray-300 "
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addnew;
