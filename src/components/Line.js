import React from 'react'

const Line = ({ guess, wordleLength, wordle, submitted }) => {
  const tiles = []

  for(let i = 0; i < wordleLength; i++)
  {
    const char = guess[i];
    let background = {}
    if(submitted)
    {
      if(char === wordle[i])
      {
        background = {background: '#65a30d'}
      } else if (wordle.includes(char))
      {
        background = {background: '#fbbf24'}
      } else {
        background = {background: '#cbd5e1'}
      }
    }

    tiles.push(
      <div 
        key={i}
        style={background}
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