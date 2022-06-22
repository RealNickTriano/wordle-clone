import React from 'react'

const GameOver = ({ wordle }) => {
  return (
    <div>
        <h1 className='font-bold text-3xl text-center'>The word was: <br /> {wordle}</h1>
    </div>
  )
}

export default GameOver