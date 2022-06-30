import React, { useState, useEffect } from 'react'

const Toggle = ({ onClick, mode }) => {
    const [toggled, setToggled] = useState('false');
    useEffect(() => {
        if(mode === 'darkMode') setToggled(JSON.parse(localStorage.getItem('settings')).darkMode)
        else if(mode === 'colorBlind') setToggled(JSON.parse(localStorage.getItem('settings')).colorBlind)
        
    }, [])
    

    const toggledClass = 'cursor-pointer bg-white rounded-full mx-1 h-6 w-6 absolute translate-x-12'
    const unToggledClass = 'cursor-pointer bg-white rounded-full mx-1 h-6 w-6 absolute'
    const handleToggle = () => {
        onClick()
        setToggled(!toggled)
    }
  return (
    <label htmlFor="toggle-switch" >
        <div className='flex justify-start items-center transition-all duration-300'>
            <div 
                onClick={handleToggle}
                className='cursor-pointer h-9 w-20 rounded-full appearance-none bg-black relative'
            ></div>
            <div onClick={handleToggle} className={toggled ? toggledClass : unToggledClass}></div>
        </div>
    </label>
  )
}

export default Toggle