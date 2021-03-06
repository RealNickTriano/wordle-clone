import { useState, useEffect } from 'react'
import Line from './components/Line';
import GameOver from './components/GameOver';
import Navbar from './components/Navbar';
import Help from './components/Help';
import Settings from './components/Settings'
import Stats from './components/Stats';
import EndScreen from './components/EndScreen'
import SideBar from './components/SideBar';
import Alert from './components/Alert';
import Key from './components/Key';
import Keyboard from './components/Keyboard';

function App() {
  const keysRow1 = ['q','w','e','r','t','y','u','i','o','p']
  const keysRow2 = ['a','s','d','f','g','h','j','k','l']
  const keysRow3 = ['Enter','z','x','c','v','b','n','m','Backspace']

  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [wordError, setWordError] = useState(false);

  const [colors1, setColors1] = useState(['bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400',]);
  const [colors2, setColors2] = useState(['bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400',]);
  const [colors3, setColors3] = useState(['bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400','bg-slate-400',]);

  const [wordle, setWordle] = useState('apple');
  const [guessTypes, setGuessTypes]  = useState(Array(6).fill(null))
  const API_URL = 'https://wordlemon-api.herokuapp.com/api/wordlemon'
  const POKE_API = 'https://pokeapi.co/api/v2/generation/1/'
  const POKE_DATA_URL = 'https://pokeapi.co/api/v2/pokemon/'

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

  const fetchMon = async (currentGuess) => {
    try {
      const response = await fetch(`${POKE_DATA_URL}${currentGuess}`);
      if (!response.ok) throw Error('Did not recieve expected data');
      const data = await response.json();
      const newTypes = guessTypes
      newTypes[guesses.findIndex(value => value === null) - 1] = data.types.map(item => item.type.name)
      setGuessTypes(newTypes)
    } catch (error) {
      console.error(error);
    } finally {

    }
  }

  const handleType = (event) => {
    if(gameOver) return
    else if(event.key === 'Backspace') 
    {
      setCurrentGuess(currentGuess.slice(0, -1))
      const newState = JSON.parse(localStorage.getItem('board-state'))
      newState.currentGuess = currentGuess.slice(0, -1)
      newState.lastPlayedTs = new Date().getTime()
      localStorage.setItem('board-state', JSON.stringify(newState))
    }
    else if(event.key === 'Enter')
    {
      if(currentGuess.length !== wordle.length) return
      else if(!(JSON.parse(localStorage.getItem('word-list')).map(item => item.name).includes(currentGuess)))
      {
        setShowAlert(true)
        setWordError(true)
        setTimeout(() => {
          setWordError(false)
        }, 300)
        setTimeout(() => {
          setShowAlert(false)
        }, 2000)
        return
      }
      else {
        // Fetch types and set display types
        fetchMon(currentGuess)
      }
      
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
        setTimeout(() => setShowEndScreen(true), 1000)

        // set board local storage
        const newState = JSON.parse(localStorage.getItem('board-state'))
        newState.guesses = newGuesses
        newState.currentGuess = ''
        newState.gameStatus = 'WIN'
        newState.lastCompletedTs = new Date().getTime()
        newState.lastPlayedTs = new Date().getTime()
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
        setTimeout(() => setShowEndScreen(true), 1000)

        // set local storage
        const newState = JSON.parse(localStorage.getItem('board-state'))
        newState.guesses = newGuesses
        newState.currentGuess = ''
        newState.gameStatus = 'LOSE'
        newState.lastCompletedTs = new Date().getTime()
        newState.lastPlayedTs = new Date().getTime()
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
        newState.lastPlayedTs = new Date().getTime()
        localStorage.setItem('board-state', JSON.stringify(newState))

      }
      
    }
    else if(currentGuess.length === wordle.length) return
    else if(event.key.match(/^[a-z]{1}$/) != null)
    {
      setCurrentGuess(currentGuess + event.key)
      const newState = JSON.parse(localStorage.getItem('board-state'))
      newState.currentGuess = currentGuess + event.key
      newState.lastPlayedTs = new Date().getTime()
      localStorage.setItem('board-state', JSON.stringify(newState))
    }
    
  }

  useEffect(() => {
    
    window.addEventListener('keydown', handleType)

    return () => window.removeEventListener('keydown', handleType)

  }, [currentGuess])

  useEffect(() => {
    // Fetch the wordle for today
    const fetchWordle = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not recieve expected data');
        const pokemon = await response.json();
        setWordle(pokemon.name)
      } catch (error) {
        console.error(error);
      } finally {
        
      }
    }
    fetchWordle()

    const fetchPokemon = async () => {
      try {
        const response = await fetch(POKE_API);
        if (!response.ok) throw Error('Did not recieve expected data');
        const listItems = await response.json();
        const array = listItems.pokemon_species;
        localStorage.setItem('word-list', JSON.stringify(array))
      } catch (error) {
        console.error(error);
      } finally {
        
      }
    }

    // On Page load create localStorage object
    if(localStorage.getItem('word-list') === null)
    {
      fetchPokemon()
    }

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
        darkMode: false
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

    if((new Date(boardState.lastPlayedTs).getUTCDate() < new Date().getUTCDate()) ||
    (new Date(boardState.lastPlayedTs).getUTCDate() === new Date().getUTCDate() && new Date(boardState.lastPlayedTs).getUTCHours() < 1) )
    {
      const boardState = {
        guesses: Array(6).fill(null),
        currentGuess: "",
        gameStatus: "IN-PROGRESS",
        lastCompletedTs: JSON.parse(localStorage.getItem('board-state')).lastCompletedTs,
        lastPlayedTs: new Date().getTime()
      }

      localStorage.setItem('board-state', JSON.stringify(boardState))
      setGuesses(boardState.guesses)
      setCurrentGuess(boardState.currentGuess)
    }
    else if(boardState.gameStatus === "IN-PROGRESS")
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
      
    <div className='mx-8 h-screen animate-fadeIn'>
        {showEndScreen &&
          <EndScreen 
            setShowEndScreen={setShowEndScreen}
            tries={guesses.findIndex(value => value === null)}
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
        setShowSideBar={setShowSideBar}
        setOpenSideBar={setOpenSideBar}
        showSideBar={showSideBar}

      />
      {showSideBar &&
        <SideBar 
          setShowSideBar={setShowSideBar}
          open={openSideBar}
        />
      }
        <div className="flex justify-center items-center">
          <div className='flex flex-col gap-1 justify-center items-center'>
            <div className='min-h-[10rem] flex justify-center items-center'>
              {
                gameOver && 
                <GameOver 
                  wordle={wordle}
                  winner={winner}
                />
              }
              {
                showAlert && <Alert />
              }
            </div>
            {
              guesses.map((guess, index) => {
                const onCurrent = index === guesses.findIndex(value => value === null)
                return (
                    <Line 
                      key={index}
                      error={wordError}
                      guess={onCurrent ? currentGuess : guess ?? ""}
                      wordleLength={wordle.length} 
                      wordle={wordle}
                      submitted={!onCurrent && guess !== null}
                      setColors1={setColors1}
                      setColors2={setColors2}
                      setColors3={setColors3}
                      keysRow1={keysRow1}
                      keysRow2={keysRow2}
                      keysRow3={keysRow3}
                      colors1={colors1}
                      colors2={colors2}
                      colors3={colors3}
                    />
                )
              })
            }
            <Keyboard 
              keysRow1={keysRow1}
              keysRow2={keysRow2}
              keysRow3={keysRow3}
              colors1={colors1}
              colors2={colors2}
              colors3={colors3}
              handleType={handleType}
            />
          </div>
        </div>
        </div>
    </div>
    </div>
  );
}

export default App;
