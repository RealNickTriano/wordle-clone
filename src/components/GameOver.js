import React from 'react'

const GameOver = ({ wordle, winner }) => {
  return (
    <div className='font-bold text-xl text-center bg-neutral-800 rounded-md px-6 py-2 animate-slideUp'>
        <h1 className='text-white pokemon-font'>{wordle}</h1>
    </div>
  )
}

export default GameOver