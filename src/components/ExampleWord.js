import React from 'react'

const ExampleWord = ({ word, indexToColor, color }) => {
    const array = word.slice('')

  return (
    <>
    {Object.keys(array).map((key, index) => (
        <div 
            key={index} 
            style={{backgroundColor: index === indexToColor ? color : '', borderColor: index === indexToColor ? color : ''}}
            className='border-2 border-gray-500 w-10 h-10 flex justify-center items-center capitalize text-3xl font-bold'
        >
            <h1 className='font-bold uppercase'>{array[key]}</h1>
        </div>
    ))}
        
    </>
  )
}

export default ExampleWord