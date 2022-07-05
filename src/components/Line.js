import React from 'react'
import { useEffect, useState } from 'react'

const Line = ({ guess, wordleLength, wordle, submitted, error }) => {
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

    const subtractPresent = (myChar) => {
      let newWordlePairs = myWordlePairs
      let filteredArray = []
      for (let j = 0; j < wordleLength; j++) 
      {
        const char = guess[j]
        if(wordle.includes(char) && char === myChar)
        {
          let myPair = newWordlePairs.filter(item => item[0] === char)
          
          if(myPair[0][1] > 0)
          {
            myPair = [myPair[0][0], myPair[0][1] - 1]
            filteredArray = newWordlePairs.filter(item => item[0] !== char)
            filteredArray.push(myPair)
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
      let classes = 'border-2 border-gray-300 lg:w-16 lg:h-16 w-10 h-10 flex justify-center items-center capitalize lg:text-3xl text-xl font-bold'
      let classesEntered = 'border-2 border-gray-500 lg:w-16 lg:h-16 w-10 h-10 flex justify-center items-center capitalize lg:text-3xl text-2xl font-bold animate-wiggle pokemon-font pl-1 pt-1'

      if(submitted)
      {
        console.log(myWordlePairs)
        if(char === wordle[i])
        {
          classesEntered += ' animate-flipGreen bg-lime-600 border-lime-600'
        } else if (wordle.includes(char))
        {
          if(myWordlePairs.filter(item => arrayEquals(item, [char, 0])).length === 0)
          {
            subtractPresent(char)
            classesEntered += ' animate-flipYellow bg-amber-400 border-amber-400'
          } else {
            classesEntered += ' animate-flipGray bg-slate-300 border-slate-300'
          }
        } else {
          classesEntered += ' animate-flipGray bg-slate-300 border-slate-300'
        }
      }
    

      tiles.push(
        !char ?
        <div 
          key={i}
          style={background}
          className={classes}
        >{char}</div>
        : 
        <div 
          key={i}
          style={{background}}
          className={classesEntered}
        >{char}</div>
      )
    }
    
  }
  checkCorrectness();

  return (
    <div className={error ? 'flex gap-1 animate-wobble' : 'flex gap-1'}>
      {tiles}
    </div>
  )
}


export default Line