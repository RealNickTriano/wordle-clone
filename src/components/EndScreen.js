import React from 'react'
import Stats from './Stats'
import ShareButton from './ShareButton'
import Timer from './Timer'
import { IoIosClose } from "react-icons/io";
import SideBarGraph from './SideBarGraph';
import { useState, useEffect } from 'react'

const EndScreen = ({ setShowEndScreen }) => {
    const API_URL = 'https://wordlemon-api.herokuapp.com/api/time'
    const [style, setStyle] = useState('flex flex-col justify-center items-center max-w-[40%] z-10 bg-white shadow-xl p-5 rounded-xl animate-slideUp mb-96 dark:bg-neutral-900 dark:text-white')
    const closingStyle = 'flex flex-col justify-center items-center max-w-[40%] z-10 bg-white shadow-xl p-5 rounded-xl animate-slideDown mb-96 dark:bg-neutral-900 dark:text-white'

    // Statistics states
    const [gamesPlayed, setGamesPlayed] = useState(0)
    const [winPercentage, setWinPercentage] = useState(0)
    const [currentStreak, setCurrentStreak] = useState(0)
    const [maxStreak, setMaxStreak] = useState(0)
    const [guessDistribution, setGuessDistribution] = useState([])
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState()

    useEffect(() => {
      const stats = JSON.parse(localStorage.getItem('stats'))
      console.log(stats)
      setGamesPlayed(stats.gamesPlayed)
      setWinPercentage(stats.winPercentage)
      setCurrentStreak(stats.currentStreak)
      setMaxStreak(stats.maxStreak)
      setGuessDistribution(stats.guesses)

      // Fetch the time untill next pokemon
        const fetchTime = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw Error('Did not recieve expected data');
                const time = await response.json();
                setHours(time.hours)
                setMinutes(time.minutes)
                setSeconds(time.seconds)
            } catch (error) {
                console.error(error);
            } finally {
            
            }
        }
        fetchTime()

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
                    setShowEndScreen(false)
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
                                    setShowEndScreen(false)
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

            <div className='flex justify-center items-center gap-32 mt-12 mb-6'>
                <div className='flex-col justify-center items-center text-center'>
                    <h1 className='font-bold uppercase text-xl'>Next Pokemon</h1>
                    <Timer 
                        hours={hours < 10 ? `0${hours}` : hours}
                        minutes={minutes < 10 ? `0${minutes}` : minutes}
                        seconds={seconds < 10 ? `0${seconds}` : seconds}
                    />
                </div>
                <ShareButton />
            </div>
        </div>
    </div>
  )
}

export default EndScreen