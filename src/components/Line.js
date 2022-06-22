import React from 'react'

const Line = ({ guess, wordleLength }) => {
  const tiles = []

  for(let i = 0; i < wordleLength; i++)
  {
    const char = guess[i];
    tiles.push(
      <div 
        key={i}
        className='border-2 border-gray-500 w-14 h-14 flex justify-center items-center capitalize text-3xl font-bold'
      >{char}</div>
    )
  }

  return (
    <div className='flex gap-1'>
      {tiles}
    </div>
  )
}

export default Line