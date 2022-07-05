import React from 'react'
import { FaBackspace } from "react-icons/fa";

const Key = ({ keyName, click }) => {
    const myEvent = new KeyboardEvent('keydown', {key: keyName})

  return (
    <button
        onClick={() => click(myEvent)} 
        className='flex justify-center items-center uppercase pokemon-font bg-gray-400 rounded-md lg:p-4 lg:text-xl text-md p-2'
    >
        {keyName === 'Backspace' ? <FaBackspace size={25}/> : keyName}
    </button>
  )
}

export default Key