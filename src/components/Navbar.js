import React from 'react'
import { IoMdClose } from  'react-icons/io'
import { FaCog, FaChartBar, FaRegQuestionCircle, FaHamburger } from  'react-icons/fa'
const Navbar = ({ setShowHelp, setShowSettings }) => {
  return (
    <div className='flex justify-center items-center font-bold text-3xl space-x-96 py-2 border-b-2'>
        <ul className='flex justify-center items-center space-x-4'>
            <li><button><FaHamburger size={22}/></button></li>
            <li><button onClick={() => setShowHelp(true)}><FaRegQuestionCircle size={22}/></button></li>
        </ul>
        <h1 className='text-center'>WORDLE-MON</h1>
        <ul className='flex justify-center items-center space-x-4'>
            <li><button onClick={() => setShowSettings(true)}><FaCog size={22}/></button></li>
            <li><button><FaChartBar size={22}/></button></li>
        </ul>
    </div>
  )
}

export default Navbar