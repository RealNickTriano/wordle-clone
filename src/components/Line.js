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
          myPair = [myPair[0][0], myPair[0][1] - 1]
          filteredArray = newWordlePairs.filter(item => item[0] !== char)
          filteredArray.push(myPair)
          newWordlePairs = filteredArray
        }
      }
      if(filteredArray.length !== 0) myWordlePairs = filteredArray
    }

    const subtractPresent = () => {
      let newWordlePairs = myWordlePairs
      let filteredArray = []
      for (let j = 0; j < wordleLength; j++) 
      {
        const char = guess[j]
        if(wordle.includes(char))
        {
          let myPair = newWordlePairs.filter(item => item[0] === char)
          
          if(myPair[0][1] > 0)
          {
            console.log(myPair[0][1])
            myPair = [myPair[0][0], myPair[0][1] - 1]
            filteredArray = newWordlePairs.filter(item => item[0] !== char)
            filteredArray.push(myPair)
            console.log(filteredArray)
            newWordlePairs = filteredArray
          }
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
          background = {background: '#65a30d', borderColor: '#65a30d'}
        } else if (wordle.includes(char))
        {
          if(myWordlePairs.filter(item => arrayEquals(item, [char, 0])).length === 0)
          {
            subtractPresent()
            background = {background: '#fbbf24', borderColor: '#fbbf24'}
          } else {
            background = {background: '#cbd5e1', borderColor: '#cbd5e1'}
          }
        } else {
          background = {background: '#cbd5e1', borderColor: '#cbd5e1'}
        }
      }
    

      tiles.push(
        !char ?
        <div 
          key={i}
          style={background}
          className='border-2 border-gray-300 w-16 h-16 flex justify-center items-center capitalize text-3xl font-bold'
        >{char}</div>
        : 
        <div 
          key={i}
          style={background}
          className='border-2 border-gray-500 w-16 h-16 flex justify-center items-center capitalize text-3xl font-bold'
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