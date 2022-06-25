import { useState, useEffect } from 'react'
import Line from './components/Line';
import GameOver from './components/GameOver';
import Navbar from './components/Navbar';
import Help from './components/Help';
import Settings from './components/Settings'
import Stats from './components/Stats';

function App() {
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const wordle = 'apple'
  const WORD_LENGTH = 5

  useEffect(() => {
    const handleType = (event) => {
      if(gameOver) return
      else if(event.key === 'Backspace') setCurrentGuess(currentGuess.slice(0, -1))
      else if(event.key === 'Enter')
      {
        if(currentGuess.length !== WORD_LENGTH) return

        const isCorrect = wordle === currentGuess
        if(isCorrect) 
        {
          const indexToSet = guesses.findIndex(value => value === null)
          const newGuesses = guesses
          newGuesses[indexToSet] = currentGuess
          setGuesses(newGuesses)
          setCurrentGuess('')
          setGameOver(true)
          setWinner(true)
        }
        else if(guesses.findIndex(value => value === null) === guesses.length - 1)
        {
          const indexToSet = guesses.findIndex(value => value === null)
          const newGuesses = guesses
          newGuesses[indexToSet] = currentGuess
          setGuesses(newGuesses)
          setCurrentGuess('')
          setGameOver(true)
          setWinner(false)
        }
        else
        {
          const indexToSet = guesses.findIndex(value => value === null)
          const newGuesses = guesses
          newGuesses[indexToSet] = currentGuess
          setGuesses(newGuesses)
          setCurrentGuess('')
        }
        
      }
      else if(currentGuess.length === WORD_LENGTH) return
      else if(event.key.match(/^[a-z]{1}$/) != null)
      {
        setCurrentGuess(currentGuess + event.key)
      }
      
    }

    window.addEventListener('keydown', handleType)

    return () => window.removeEventListener('keydown', handleType)

  }, [currentGuess])

  return (
    <div className='mx-8 min-h-screen animate-fadeIn'>
      {showHelp && 
        <Help 
          setShowHelp={setShowHelp}
        /> 
      }

      {showSettings && 
        <Settings 
          setShowSettings={setShowSettings}
        /> 
      }

      {showStats &&
        <Stats 
          setShowStats={setShowStats}
        />
      }

      <div className='z-3'>
      <Navbar 
        setShowHelp={setShowHelp}
        setShowSettings={setShowSettings}
        setShowStats={setShowStats}
      />
        <div className="flex justify-center items-center">
          <div className='flex flex-col gap-1'>
            <div className='min-h-[10rem] flex justify-center items-center'>
              {
                gameOver && 
                <GameOver 
                  wordle={wordle}
                  winner={winner}
                />
              }
            </div>
            {
              guesses.map((guess, index) => {
                const onCurrent = index === guesses.findIndex(value => value === null)
                return (
                    <Line 
                      key={index}
                      guess={onCurrent ? currentGuess : guess ?? ""}
                      wordleLength={WORD_LENGTH}  
                      wordle={wordle}
                      submitted={!onCurrent && guess !== null}
                    />
                  
                )
              })
            }
          </div>
        </div>
        </div>
    </div>
  );
}

export default App;
