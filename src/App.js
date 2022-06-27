import { useState, useEffect } from 'react'
import Line from './components/Line';
import GameOver from './components/GameOver';
import Navbar from './components/Navbar';
import Help from './components/Help';
import Settings from './components/Settings'
import Stats from './components/Stats';
import EndScreen from './components/EndScreen'

function App() {
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const wordle = 'apple'
  const WORD_LENGTH = 5

  const handleDarkMode = () => {
    if(JSON.parse(localStorage.getItem('settings')).darkMode)
    {
      document.documentElement.classList.add('dark')
    }
    else
    {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleColorBlind = () => {
    if(JSON.parse(localStorage.getItem('settings')).colorBlind)
    {
      document.documentElement.classList.add('colorBlind')
    }
    else
    {
      document.documentElement.classList.remove('colorBlind')
    }
  }

  useEffect(() => {
    const handleType = (event) => {
      if(gameOver) return
      else if(event.key === 'Backspace') 
      {
        setCurrentGuess(currentGuess.slice(0, -1))
        const newState = JSON.parse(localStorage.getItem('board-state'))
        newState.currentGuess = currentGuess.slice(0, -1)
        localStorage.setItem('board-state', JSON.stringify(newState))
      }
      
      else if(event.key === 'Enter')
      {
        if(currentGuess.length !== WORD_LENGTH) return

        const isCorrect = wordle === currentGuess
        if(isCorrect) 
        {
          const indexToSet = guesses.findIndex(value => value === null)
          const newGuesses = guesses
          newGuesses[indexToSet] = currentGuess
          console.log(indexToSet)

          setGuesses(newGuesses)
          setCurrentGuess('')
          setGameOver(true)
          setWinner(true)
          setShowEndScreen(true)

          // set board local storage
          const newState = JSON.parse(localStorage.getItem('board-state'))
          newState.guesses = newGuesses
          newState.currentGuess = ''
          newState.gameStatus = 'WIN'
          newState.lastCompletedTs = new Date().getTime()
          localStorage.setItem('board-state', JSON.stringify(newState))

          // set stats local storage
          const statState = JSON.parse(localStorage.getItem('stats'))
          statState.gamesPlayed += 1
          statState.currentStreak += 1
          statState.guesses[indexToSet] += 1
          statState.gamesWon += 1
          statState.winPercentage = Math.floor((statState.gamesWon / statState.gamesPlayed) * 100)
          if(statState.maxStreak < statState.currentStreak) statState.maxStreak = statState.currentStreak
          localStorage.setItem('stats', JSON.stringify(statState))
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
          setShowEndScreen(true)

          // set local storage
          const newState = JSON.parse(localStorage.getItem('board-state'))
          newState.guesses = newGuesses
          newState.currentGuess = ''
          newState.gameStatus = 'LOSE'
          newState.lastCompletedTs = new Date().getTime()
          localStorage.setItem('board-state', JSON.stringify(newState))

          // set stats local storage
          const statState = JSON.parse(localStorage.getItem('stats'))
          statState.gamesPlayed += 1
          localStorage.setItem('stats', JSON.stringify(statState))

        }
        else
        {
          const indexToSet = guesses.findIndex(value => value === null)
          const newGuesses = guesses
          newGuesses[indexToSet] = currentGuess

          setGuesses(newGuesses)
          setCurrentGuess('')

          // set local storage
          const newState = JSON.parse(localStorage.getItem('board-state'))
          newState.guesses = newGuesses
          newState.currentGuess = ''
          newState.gameStatus = 'IN-PROGRESS'
          localStorage.setItem('board-state', JSON.stringify(newState))

        }
        
      }
      else if(currentGuess.length === WORD_LENGTH) return
      else if(event.key.match(/^[a-z]{1}$/) != null)
      {
        setCurrentGuess(currentGuess + event.key)
        const newState = JSON.parse(localStorage.getItem('board-state'))
        newState.currentGuess = currentGuess + event.key
        localStorage.setItem('board-state', JSON.stringify(newState))
      }
      
    }

    window.addEventListener('keydown', handleType)

    return () => window.removeEventListener('keydown', handleType)

  }, [currentGuess])

  useEffect(() => {
    // On Page load create localStorage object
    if(localStorage.getItem('stats') === null)
    {
      const stats = {
        averageGuesses: 0,
        currentStreak: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        guesses: [
          0, 0, 0, 0, 0, 0
        ],
        maxStreak: 0,
        winPercentage: 0,
      }

      localStorage.setItem('stats', JSON.stringify(stats))
    }
    
    if(localStorage.getItem('board-state') === null)
    {
      const boardState = {
        guesses: Array(6).fill(null),
        currentGuess: "",
        gameStatus: "IN-PROGRESS",
        lastCompletedTs: 0,
        lastPlayedTs: new Date().getTime()
      }

      localStorage.setItem('board-state', JSON.stringify(boardState))
    }

    if(localStorage.getItem('settings') === null)
    {
      const settings = {
        darkMode: false,
        colorBlind: false
      }

      localStorage.setItem('settings', JSON.stringify(settings))
    }
    else if(JSON.parse(localStorage.getItem('settings')).darkMode)
    {
      document.documentElement.classList.add('dark')
    }
    else
    {
      document.documentElement.classList.remove('dark')
    }

    const boardState = JSON.parse(localStorage.getItem('board-state'))
    setGuesses(boardState.guesses)
    setCurrentGuess(boardState.currentGuess)
    if(boardState.gameStatus === "IN-PROGRESS")
    {

    }
    else if(boardState.gameStatus === "WIN")
    {
      setGameOver(true)
      setWinner(true)
      setTimeout(() => {
        setShowEndScreen(true)
    }, 1000)
    }
    else if(boardState.gameStatus === "LOSE")
    {
      setGameOver(true)
      setWinner(false)
      setTimeout(() => {
        setShowEndScreen(true)
    }, 1000)
    }
    
  
    /* return () => {
      second
    } */
  }, [])
  
  return (
    <div className='dark:bg-neutral-900 dark:text-white'>
    <div className='mx-8 min-h-screen animate-fadeIn'>
      {showEndScreen &&
        <EndScreen 
          setShowEndScreen={setShowEndScreen}
        />
      }
      {showHelp && 
        <Help 
          setShowHelp={setShowHelp}
        /> 
      }

      {showSettings && 
        <Settings 
          setShowSettings={setShowSettings}
          handleDarkMode={handleDarkMode}
          handleColorBlind={handleColorBlind}
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
    </div>
  );
}

export default App;
