import React, { useState } from 'react'

const SideBarGraph = ({ guessDistribution }) => {
    let bars = []
    for(let i = 0; i < 6; i++)
    {
        bars.push(
            <div key={i} className="flex justify-start items-center gap-2 w-[24rem]">
                <p>{i + 1}</p>
                <p 
                    className='bg-gray-500 text-white px-2 text-end'
                    style={{
                        width: `${Math.max(guessDistribution[i] / guessDistribution.reduce((a, b) => a + b, 0), .06) * 100}%` 
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