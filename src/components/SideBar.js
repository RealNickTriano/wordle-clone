import React from 'react'
import GameListItem from './GameListItem'

const SideBar = ({ open }) => {
    const enter = 'dark:bg-neutral-900 dark:text-white absolute z-20 left-0 min-h-[1233px] w-[30%] drop-shadow-md bg-white flex-col flex justify-start items-center py-16 animate-slideInRight'

    const leave = 'dark:bg-neutral-900 dark:text-white absolute z-20 left-0 min-h-[1233px] w-[30%] drop-shadow-md bg-white flex-col flex justify-start items-center py-16 animate-slideOutLeft'

  return (
    <div className={open ? enter : leave}>
        <h1 className='text-3xl uppercase pokemon-font px-8'>More Games</h1>
        <div className='flex justify-start items-center gap-4 my-12 w-full'>
            <GameListItem 
                title='Wordle-Mon'
                img= 'wordle-mon-icon.png'
                link='#'
            />
        </div>
        <div className='flex flex-col justify-end bottom-0 absolute items-center mb-12'>
            <p>More to come soon!</p>
            <p>&copy; {new Date().getFullYear()} Nicholas Triano</p>
        </div>
    </div>
  )
}

export default SideBar