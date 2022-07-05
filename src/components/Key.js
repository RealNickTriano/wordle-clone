import React from 'react'
import { FaBackspace } from "react-icons/fa";

const Key = ({ keyName, click, bgColor }) => {
    const myEvent = new KeyboardEvent('keydown', {key: keyName})
    const myClass = `flex justify-center items-center uppercase pokemon-font ${bgColor} rounded-md lg:p-4 lg:text-xl text-md p-2`

  return (
    <button
        onClick={() => click(myEvent)} 
        className={myClass}
    >
        {keyName === 'Backspace' ? <FaBackspace size={25}/> : keyName}
    </button>
  )
}

export default Key