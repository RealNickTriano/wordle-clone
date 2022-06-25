import React from 'react'
import { IoIosClose } from "react-icons/io";

const Help = ({ setShowHelp }) => {
  return (
    <div className='flex flex-col justify-center items-center mx-auto max-w-[40%] mt-5 translate-y-[50%] animate-slideUp'
    >
        <div className='border-b-2'>
            <div className='flex justify-end items-center mb-5'>
                <h1 className='text-center font-bold text-md uppercase mr-[35%]'>How To Play</h1>
                <button onClick={() => setShowHelp(false)}><IoIosClose size={32}/></button>
            </div>
            <p className='mb-2'>Guess the <b>WORDLE</b> in six tries.</p>
            <p className='mb-2'>Each guess must be a valid five-letter word. 
                Hit the enter button to submit.
            </p>
            <p className='mb-2'>After each guess, the color of the tiles will change
                to show how close your guess was to the word
            </p>
        </div>
        
    </div>
  )
}

export default Help