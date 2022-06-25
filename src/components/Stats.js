import React from 'react'
import { IoIosClose } from "react-icons/io";
import SideBarGraph from './SideBarGraph';

const Stats = ({ setShowStats }) => {
  return (
    <div className='w-full h-screen bg-gray-50/40 top-0 left-0 fixed z-5 flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center max-w-[40%] z-10 bg-white shadow-xl p-5 rounded-xl animate-slideUp mb-96'
        >
            <div className=''>
                <div className='flex justify-end items-center'>
                    <button onClick={() => setShowStats(false)}><IoIosClose size={32}/></button>
                </div>
                <div className='flex justify-end items-center mb-5'>
                    <h1 className='text-center font-bold text-lg uppercase mr-[35%] border-b-2'>Statistics</h1>
                </div>
                <div className="flex justify-center items-start space-x-5 leading-tight">
                    <div className="flex-col justify-center items-center text-center">
                        <h1 className='text-3xl'>23</h1>
                        <h1 className='text-sm'>Played</h1>
                    </div>
                    <div className="flex-col justify-center items-center text-center">
                        <h1 className='text-3xl'>83</h1>
                        <h1 className='text-sm'>Win %</h1>
                    </div>
                    <div className="flex-col justify-center items-center text-center ">
                        <h1 className='text-3xl'>0</h1>
                        <h1 className='text-sm leading-3'>Current <br />Streak</h1>
                    </div>
                    <div className="flex-col justify-center items-center text-center">
                        <h1 className='text-3xl'>4</h1>
                        <h1 className='text-sm leading-3'>Max <br />Streak</h1>
                    </div>
                </div>
                <h1 className='text-center text-lg uppercase font-bold mt-5'>Guess Distribution</h1>
                <SideBarGraph />
            </div>
        </div>
    </div>
  )
}

export default Stats