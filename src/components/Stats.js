import React from 'react'
import { IoIosClose } from "react-icons/io";
import SideBarGraph from './SideBarGraph';
import { useState, useEffect } from 'react'

const Stats = ({ setShowStats }) => {
    const [style, setStyle] = useState('flex flex-col justify-center items-center z-10 bg-white shadow-xl py-5 px-10 rounded-xl animate-slideUp dark:bg-neutral-900 dark:text-white')
    const closingStyle = 'flex flex-col justify-center items-center z-10 bg-white shadow-xl py-5 px-10 rounded-xl animate-slideDown dark:bg-neutral-900 dark:text-white'

    // Statistics states
    const [gamesPlayed, setGamesPlayed] = useState(0)
    const [winPercentage, setWinPercentage] = useState(0)
    const [currentStreak, setCurrentStreak] = useState(0)
    const [maxStreak, setMaxStreak] = useState(0)
    const [guessDistribution, setGuessDistribution] = useState([])

    useEffect(() => {
      const stats = JSON.parse(localStorage.getItem('stats'))
      console.log(stats)
      setGamesPlayed(stats.gamesPlayed)
      setWinPercentage(stats.winPercentage)
      setCurrentStreak(stats.currentStreak)
      setMaxStreak(stats.maxStreak)
      setGuessDistribution(stats.guesses)

      /* return () => {
        second
      } */
    }, [])
    
  return (
    <div
        onClick={
            () => {
                setStyle(closingStyle);
                setTimeout(() => {
                    setShowStats(false)
                }, 450)
            }
        } 
        className='w-full h-screen bg-gray-50/40 dark:bg-gray-800/30 top-0 left-0 fixed z-5 flex justify-center items-center'>
        <div className={style}
        >
            <div>
                <div className='flex justify-end items-center mb-5'>
                    <h1 className='text-center font-bold text-md uppercase mr-[30%]'>Statistics</h1>
                    <button onClick={() => {
                                setStyle(closingStyle);
                                setTimeout(() => {
                                    setShowStats(false)
                                }, 450)
                            }
                        }><IoIosClose size={32}/></button>
                </div>
                <div className="flex justify-center items-center space-x-5 leading-tight">
                    <div className="flex-col justify-center items-center text-center">
                        <h1 className='text-3xl'>{gamesPlayed}</h1>
                        <h1 className='text-sm'>Played</h1>
                    </div>
                    <div className="flex-col justify-center items-center text-center">
                        <h1 className='text-3xl'>{winPercentage}</h1>
                        <h1 className='text-sm'>Win %</h1>
                    </div>
                    <div className="flex-col justify-center items-center text-center ">
                        <h1 className='text-3xl'>{currentStreak}</h1>
                        <h1 className='text-sm leading-3'>Current <br />Streak</h1>
                    </div>
                    <div className="flex-col justify-center items-center text-center">
                        <h1 className='text-3xl'>{maxStreak}</h1>
                        <h1 className='text-sm leading-3'>Max <br />Streak</h1>
                    </div>
                </div>
                <h1 className='text-center text-lg uppercase font-bold mt-5'>Guess Distribution</h1>
                <SideBarGraph 
                    guessDistribution={guessDistribution}
                />
            </div>
        </div>
    </div>
  )
}

export default Stats