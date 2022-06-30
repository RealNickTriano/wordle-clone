import React from 'react'
import { IoIosClose } from "react-icons/io";
import { useState } from 'react'
import Toggle from './Toggle';

const Settings = ({ setShowSettings, handleDarkMode, handleColorBlind }) => {
    const [style, setStyle] = useState('flex flex-col justify-center items-center max-w-[40%] z-10 bg-white shadow-xl p-5 rounded-xl animate-slideUp mb-96 dark:bg-neutral-900 dark:text-white')
    const closingStyle = 'flex flex-col justify-center items-center max-w-[40%] z-10 bg-white shadow-xl p-5 rounded-xl animate-slideDown mb-96 dark:bg-neutral-900 dark:text-white'

    const handleDarkModeToggle = () => {
        const newSettings = JSON.parse(localStorage.getItem('settings'));
        newSettings.darkMode = !newSettings.darkMode;
        localStorage.setItem(('settings'), JSON.stringify(newSettings));
        handleDarkMode()
    }

    const handleColorBlindModeToggle = () => {
        const newSettings = JSON.parse(localStorage.getItem('settings'));
        newSettings.colorBlind = !newSettings.colorBlind;
        localStorage.setItem(('settings'), JSON.stringify(newSettings));
        handleColorBlind()
    }
  return (
    <div
        /* onClick={
            () => {
                setStyle(closingStyle);
                setTimeout(() => {
                    setShowSettings(false)
                }, 450)
            }
        } */
        className='w-full h-screen bg-gray-50/40 dark:bg-gray-800/30 top-0 left-0 fixed z-5 flex justify-center items-center'>
        <div className={style}>
            <div className='border-b-2'>
                <div className='flex justify-end items-center mb-5'>
                    <h1 className='text-center font-bold text-md uppercase mr-[35%]'>Settings</h1>
                    <button onClick={() => {
                                setStyle(closingStyle);
                                setTimeout(() => {
                                    setShowSettings(false)
                                }, 450)
                            }
                        }><IoIosClose size={32}/></button>
                </div>
                <div className='flex justify-center items-center min-w-full mb-5'>
                    <p className='mb-2 w-full'>Dark Mode</p>
                    <Toggle 
                        onClick={handleDarkModeToggle}
                        mode='darkMode'
                    />
                </div>

                <div className='flex justify-start items-center min-w-full gap-64'>
                    <p className='mb-2 w-full'>Colorblind Mode</p>
                    <Toggle 
                        onClick={handleColorBlindModeToggle}
                        mode='colorBlind'
                    />
                </div>  
            </div>
        </div>
    </div>
  )
}

export default Settings