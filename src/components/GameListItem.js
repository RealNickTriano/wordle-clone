import React from 'react'

const GameListItem = ({ title, img, link }) => {
  return (
    <a href={link} className='flex justify-start pl-8 py-2 items-center gap-2 hover:bg-gray-100 w-full'>
        <img src={img} alt={title} className='w-6 p-[1px] border-2 border-black rounded-md' />
        <h1 className='text-sm font-medium pokemon-font'>{title}</h1>
    </a>

  )
}

export default GameListItem