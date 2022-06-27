import React from 'react'
import { FaShareAlt } from "react-icons/fa";
import { useState } from 'react'

const ShareButton = () => {

  return (
    <button className='flex justify-center items-center gap-2 uppercase font-bold text-white bg-sky-500 py-2 px-5 rounded-lg'>Share<FaShareAlt /></button>

  )
}

export default ShareButton