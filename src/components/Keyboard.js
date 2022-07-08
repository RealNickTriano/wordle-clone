import React from 'react'
import Key from './Key'

const Keyboard = ({ handleType, colors1, colors2, colors3, keysRow1, keysRow2, keysRow3 }) => {
    
  return (
    <div className='flex flex-col justify-center items-center lg:gap-2 gap-1 mt-12'>
        <div className='flex justify-center items-center lg:gap-2 gap-1'>
            {keysRow1.map((item, index) => {
                return (
                    <Key 
                        key={index}
                        keyName={item}
                        click={handleType}
                        bgColor={colors1[index]}
                    />
                )
            })}
        </div>
        <div className='flex justify-center items-center lg:gap-2 gap-1'>
            {keysRow2.map((item, index) => {
                return (
                    <Key 
                        key={index}
                        keyName={item}
                        click={handleType}
                        bgColor={colors2[index]}
                    />
                )
            })}
        </div>
        <div className='flex justify-center items-center lg:gap-2 gap-1'>
            {keysRow3.map((item, index) => {
                return (
                    <Key 
                        key={index}
                        keyName={item}
                        click={handleType}
                        bgColor={colors3[index]}
                    />
                )
            })}
        </div>
    </div>
  )
}

export default Keyboard