import React from 'react'
import Key from './Key'

const Keyboard = ({ handleType }) => {
    const keysRow1 = ['q','w','e','r','t','y','u','i','o','p']
    const keysRow2 = ['a','s','d','f','g','h','j','k','l']
    const keysRow3 = ['Enter','z','x','c','v','b','n','m','Backspace']
  return (
    <div className='flex flex-col justify-center items-center gap-2 mt-12'>
        <div className='flex justify-center items-center gap-2'>
            {keysRow1.map((item, index) => {
                return (
                    <Key 
                        key={index}
                        keyName={item}
                        click={handleType}
                    />
                )
            })}
        </div>
        <div className='flex justify-center items-center gap-2'>
            {keysRow2.map((item, index) => {
                return (
                    <Key 
                        key={index}
                        keyName={item}
                        click={handleType}
                    />
                )
            })}
        </div>
        <div className='flex justify-center items-center gap-2'>
            {keysRow3.map((item, index) => {
                return (
                    <Key 
                        key={index}
                        keyName={item}
                        click={handleType}
                    />
                )
            })}
        </div>
    </div>
  )
}

export default Keyboard