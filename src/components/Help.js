import React, { useState } from 'react'
import { IoIosClose } from "react-icons/io";
import ExampleWord from './ExampleWord';

const Help = ({ setShowHelp }) => {
    const [style, setStyle] = useState('flex flex-col justify-center items-center z-10 bg-white shadow-xl py-5 px-10 rounded-xl animate-slideUp dark:bg-neutral-900 dark:text-white')
    const closingStyle = 'flex flex-col justify-center items-center z-10 bg-white shadow-xl py-5 px-10 rounded-xl animate-slideDown dark:bg-neutral-900 dark:text-white'
  return (
    <div 
        onClick={
            () => {
                setStyle(closingStyle);
                setTimeout(() => {
                    setShowHelp(false)
                }, 450)
            }
        }
        className='w-full h-screen bg-gray-50/40 dark:bg-gray-800/30 top-0 left-0 fixed z-5 flex justify-center items-center'>
            <div className={style}
            >
                <div className='border-b-2'>
                    <div className='flex justify-end items-center mb-5'>
                        <h1 className='text-center font-bold text-md uppercase mr-[32%]'>How To Play</h1>
                        <button onClick={() => {
                                setStyle(closingStyle);
                                setTimeout(() => {
                                    setShowHelp(false)
                                }, 450)
                            }
                        }><IoIosClose size={32}/></button>
                    </div>
                    <p className='mb-2'>Guess the <b>WORDLE</b> in six tries.</p>
                    <p className='mb-2'>Each guess must be a valid <b className='uppercase'>pokemon</b> from <b>Gen 1</b>. <br /> 
                        Hit the enter button to submit.
                    </p>
                    <p className='mb-2'>After each guess, the color of the tiles will change <br />
                        to show how close your guess was to the word!
                    </p>
                </div>
                <div className='flex flex-col justify-center items-center border-b-2 mb-5'>
                    <h1 className='font-bold uppercase my-3'>Examples</h1>
                    <div className="flex justify-center items-center gap-1 mt-4 mb-2">
                        <ExampleWord 
                            word={'Vulpix'}
                            indexToColor={0}
                            color={'#65a30d'}
                        />
                    </div>
                    <p><b>V</b> is in the correct spot</p>
                    <div className="flex justify-center items-center gap-1 mt-4 mb-2">
                        <ExampleWord 
                            word={'Zubat'}
                            indexToColor={1}
                            color={'#fbbf24'}
                        />
                    </div>
                    <p><b>U</b> is in the word but the wrong spot</p>
                    <div className="flex justify-center items-center gap-1 mt-4 mb-2">
                        <ExampleWord 
                            word={'Diglett'}
                            indexToColor={2}
                            color={'#cbd5e1'}
                        />
                    </div>
                    <p className='mb-2'><b>G</b> is not in the word at all</p>
                </div>
                <h1 className='font-bold mb-5'>There is a new wordle-mon everyday!</h1>
            </div>
    </div>
  )
}

export default Help