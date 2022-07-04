import React from 'react'
import { FaShareAlt } from "react-icons/fa";
import { useState } from 'react'

const ShareButton = ({ tries }) => {
  const text = `I%20just%20completed%20today%27s%20%23WORDLEMON%0AI%20did%20it%20in%20${tries}%2F6%20tries%21%20%0ACan%20you%20do%20it%20in%20less%3F%20%0ACheck%20it%20out%20here%3A%20https%3A%2F%2Fwordle%2Dmon%2Eherokuapp%2Ecom`
  return (
    <a 
      target="_blank"
      href={`https://twitter.com/intent/tweet?text=${text}`}>
        <button className='flex justify-center items-center gap-2 uppercase font-bold text-white bg-sky-500 py-2 px-5 rounded-lg'>Share<FaShareAlt /></button>
    </a>

  )
}

export default ShareButton