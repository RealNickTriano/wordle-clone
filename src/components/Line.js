import React from 'react'
import { useEffect, useState } from 'react'

const Line = ({ guess, wordleLength, wordle, submitted, error, setColors1, setColors2, setColors3, keysRow1, keysRow2, keysRow3, colors1, colors2, colors3 }) => {
  const tiles = []
  
  const setKeyColors = (bgColor, char) => {
    keysRow1.forEach((key1, index1) => {
      if(key1 === char)
      {
        const newColors1 = colors1
        newColors1[index1] = bgColor
        setColors1(newColors1)
      }
    })
    keysRow2.forEach((key2, index2) => {
      if(key2 === char)
      {
        const newColors2 = colors2
        newColors2[index2] = bgColor
        setColors2(newColors2)
      }
    })
    keysRow3.forEach((key3, index3) => {
      if(key3 === char)
      {
        const newColors3 = colors3
        newColors3[index3] = bgColor
        setColors3(newColors3)
      }
    })
  }

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
      let classes = `border-2 border-gray-300 lg:w-16 lg:h-16 md:w-14 md:h-14 flex justify-center items-center capitalize lg:text-3xl font-bold ${wordleLength > 9 ? 'w-8 h-8 md:text-2xl text-md' : 'w-10 h-10 text-lg'}`
      let classesEntered = `border-2 border-gray-500 lg:w-16 lg:h-16 md:w-14 md:h-14 flex justify-center items-center capitalize lg:text-3xl font-bold animate-wiggle pokemon-font pl-1 pt-1 ${wordleLength > 9 ? 'w-8 h-8 md:text-2xl text-md' : 'w-10 h-10 text-lg'}`

      if(submitted)
      {
        if(char === wordle[i])
        {
          classesEntered += ' animate-flipGreen bg-lime-600 border-lime-600'
          setKeyColors('bg-lime-600', wordle[i])
          console.log(char)
        } else if (wordle.includes(char))
        {
          if(myWordlePairs.filter(item => arrayEquals(item, [char, 0])).length === 0)
          {
            subtractPresent(char)
            classesEntered += ' animate-flipYellow bg-amber-400 border-amber-400'
            setKeyColors('bg-amber-400', char)
          } else {
            classesEntered += ' animate-flipGray bg-slate-300 border-slate-300'
            setKeyColors('bg-slate-300', char)
          }
        } else {
          classesEntered += ' animate-flipGray bg-slate-300 border-slate-300'
          setKeyColors('bg-slate-300', char)
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