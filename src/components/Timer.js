import React from 'react'
import { useState } from 'react'

const Timer = ({ hours, minutes, seconds }) => {

  return (
    <div className='flex justify-center items-center font-md text-3xl gap-2'>
      <h1>{hours} :</h1>
      <h1>{minutes} :</h1>
      <h1>{seconds}</h1>
    </div>
  )
}

export default Timer