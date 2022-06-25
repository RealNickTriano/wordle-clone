import React, { useState } from 'react'

const SideBarGraph = () => {
    const [guessDistribution, setDistribution] = useState([0, 1, 4, 8, 4, 2])
    /**
     * width is the value / total guesses(sum of array)
     * 
     */
    console.log(`${Math.max(guessDistribution[0] / guessDistribution.reduce((a, b) => a + b, 0), .1) * 100}%`)
    
    let bars = []
    for(let i = 0; i < 6; i++)
    {
        bars.push(
            <div key={i} className="flex justify-start items-center gap-2 w-[24rem]">
                <p>{i + 1}</p>
                <p 
                    className='bg-gray-500 text-white px-2 text-end'
                    style={{
                        width: `${Math.max(guessDistribution[i] / guessDistribution.reduce((a, b) => a + b, 0), .1) * 100}%` 
                    }}
                >{guessDistribution[i]}</p>
            </div>
        )
    }

  return (
    <div className='flex flex-col gap-1 justify-center items-start min-w-[24rem]'>
        {bars}
    </div>
  )
}

export default SideBarGraph