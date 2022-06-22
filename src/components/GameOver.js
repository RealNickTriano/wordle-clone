import React from 'react'

const GameOver = ({ wordle, winner }) => {
  return (
    <div className='font-bold text-3xl text-center'>
        <h1>The word was: {wordle}</h1>
        <h1>You {winner ? 'Won': 'Lost'}</h1>
    </div>
  )
}

export default GameOver