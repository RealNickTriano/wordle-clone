import React from 'react'
import { useEffect, useState } from 'react'

const Line = ({ guess, wordleLength, wordle, submitted }) => {
  const tiles = []
  
  /** Idea to check count letters?
   * init array that has count of each letter in pairs i.e. [(a,1),(p,2)
   * ,(l,1),(e,1)]
   * every char that we see decrement count of respective letter by 1
   * if the count of letter is 0 then background - gray
   */
  const arrayEquals = (a, b) => {
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  
  const makeMyWordlePairs = () => {
    let myWordlePairs = []

    wordle.split('').forEach(char => {
      const pair = [char, wordle.split(char).length - 1]
      if(myWordlePairs.filter(item => arrayEquals(item, pair)).length === 0)
      {
        myWordlePairs.push(pair)
      }
    })

    return myWordlePairs
  }
  

  const checkCorrectness = () => {
    let myWordlePairs = makeMyWordlePairs()

    const countCorrect = () => 
    {
      let newWordlePairs = myWordlePairs
      let filteredArray = []
      for (let j = 0; j < wordleLength; j++) 
      {
        const char = guess[j]
        if(char === wordle[j])
        {
          let myPair = newWordlePairs.filter(item => item[0] === char)
          console.log(myPair)
          myPair = [myPair[0][0], myPair[0][1] - 1]
          console.log(myPair)
          filteredArray = newWordlePairs.filter(item => item[0] !== char)
          filteredArray.push(myPair)
          newWordlePairs = filteredArray
        }
      }
      myWordlePairs = filteredArray
    }

    if(submitted) countCorrect()

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
          if(myWordlePairs.filter(item => arrayEquals(item, [char, 0])).length === 0)
          {
            background = {background: '#fbbf24'}
          } else {
            background = {background: '#cbd5e1'}
          }
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
    
  }
  checkCorrectness();

  return (
    <div className='flex gap-1'>
      {tiles}
    </div>
  )
}


export default Line