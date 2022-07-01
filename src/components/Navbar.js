import React from 'react'
import { IoMdClose } from  'react-icons/io'
import { FaCog, FaChartBar, FaRegQuestionCircle, FaHamburger } from  'react-icons/fa'
const Navbar = ({ setShowHelp, setShowSettings, setShowStats, setShowSideBar, showSideBar, setOpenSideBar }) => {
  return (
    <div className='flex justify-center items-center font-bold text-3xl py-2 border-b-2 lg:gap-20 gap-10'>
        <ul className='flex justify-center items-center space-x-4'>
            <li><button onClick={() => {
              setOpenSideBar(!showSideBar)
              if(showSideBar)
              {
                  setTimeout(() => {
                    setShowSideBar(!showSideBar)
                }, 250)
              } else setShowSideBar(!showSideBar)
              
            }}><FaHamburger size={22}/></button></li>
            <li><button onClick={() => setShowHelp(true)}><FaRegQuestionCircle size={22}/></button></li>
        </ul>
        <h1 className='text-center pokemon-font'>WORDLE-MON</h1>
        <ul className='flex justify-center items-center space-x-4'>
            <li><button onClick={() => setShowSettings(true)}><FaCog size={22}/></button></li>
            <li><button onClick={() => setShowStats(true)}><FaChartBar size={22}/></button></li>
        </ul>
    </div>
  )
}

export default Navbar