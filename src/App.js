import './App.css'
import './CSS/style.css'
import React from "react"
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rollingTimes, setRollingTimes] = React.useState(0)
  const [minNumOfRolls, setMinNumOfRolls] = React.useState( () =>
    Number(localStorage.getItem("rolls")) || 999
  )
  const [timer, setTimer] = React.useState({
    minute : 0,
    second : 0
  })

  React.useEffect( () => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)

      if (allHeld && allSameValue){
        setTenzies(true)
        // Store the minimun number of rolls
        if (rollingTimes !== 0 && rollingTimes < minNumOfRolls){         
          localStorage.setItem("rolls", rollingTimes + '')        
          setMinNumOfRolls(rollingTimes)
        }
      }
    }
  , [dice, rollingTimes, minNumOfRolls])

  React.useEffect( () => {
    // Start timer
    const myTimer = setInterval( () => (
      setTimer( prevTimer => prevTimer.second < 60
        ? {...prevTimer, second: prevTimer.second + 1 }
        : {...prevTimer, minute: prevTimer.minute + 1, second: 0}
        )
    ), 1000)

    if (tenzies) {
      return clearInterval(myTimer)
    }

    return () => clearInterval(myTimer)
    
  }, [timer])

  function allNewDice() {
    const randomNums = []

    for(let i = 0; i < 10; i++){
      randomNums.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    })
    }
    return randomNums
  }

  function holdDice(id) {
    setDice( oldDice => oldDice.map( die => {
      return die.id === id 
              ? {...die, isHeld: !die.isHeld}
              : die
    }))
  }

  function generateNewDie() {
    return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
            }
  }

  function roll() {   
    if (!tenzies) {
      setDice( oldDice => oldDice.map( die => {
        // Count rolling times
        setRollingTimes(rollingTimes + 1)  
        
        return die.isHeld
                ? die
                : generateNewDie()
      }))
    } else {
      // Reset tenzies game
      setTenzies(false)
      setDice(allNewDice())
      // Reset rolling times
      setRollingTimes(0)
      // Reset timer
      setTimer({
        minute : 0,
        second : 0
      })
    }
  }

  const allDice = dice.map( die => (
    <Die value={die.value} 
         key={die.id} 
         isHeld={die.isHeld} 
         holdDice={ () => holdDice(die.id)} 
    />
  ))

  return (
    <main>
      { tenzies && <Confetti width={600}/> }
      <h1 className="title">Tenzies</h1>
      <div className='record'>
        <p className='rolling-times'>
          <strong>
            Rolling Times: &nbsp;
            <span className='rolling-times-color'>
              {rollingTimes}
            </span>
          </strong>
        </p>
        <p className='time-cost'>
          <strong>
            Time Cost: &nbsp;
            <span className='time-cost-color'> 
              {timer.minute} : {timer.second}
            </span>
          </strong>
        </p>      
        <p className='best-time'>
          <strong>
            Best Rolls: &nbsp;
            <span className='best-time-color'>
              {minNumOfRolls}
            </span>
          </strong>
        </p>
      </div>
      <p className="instructions">
        Roll until all dice are the same. 
        Click each die to freeze it at its current 
        value between rolls.
      </p>
      <div className='dice-container'>
       {allDice}
      </div>
      <button 
        className='roll-dice' 
        onClick={roll}
      >
          { tenzies ? "New Game" : "Roll" }
      </button>
    </main>
  );
}

export default App;