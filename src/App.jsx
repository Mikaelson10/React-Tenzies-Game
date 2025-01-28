import { useEffect, useState, useRef } from "react"
import './App.css'
import DieComponent from './components/DieComponent'
import { nanoid } from "nanoid"
import Confetti from "react-confetti"


function App() {
    const [diceValue, setDiceValue] = useState(() => generateAllNewDice())
    const buttonRef = useRef(null)

    const gameWon = diceValue.every(die => die.isHeld) &&
    diceValue.every(die => die.value === diceValue[0].value)

    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])

    function onRoll() {
        if (!gameWon) {
            const interval = setInterval(() => {
                setDiceValue((prevDice) =>
                    prevDice.map((dice) =>
                        dice.isHeld
                            ? dice : {...dice, value: Math.ceil(Math.random() * 6)}
                    ) 
                )
            }, 100) //spins every 100ms 
    
            setTimeout(() => {
                clearInterval(interval);
            }, 1000)
        } else {
            setDiceValue(generateAllNewDice())
        }
    }

    function generateAllNewDice() {
        return new Array(10).fill("").map(() => ({
            value: Math.ceil(Math.random() * 6), 
            isHeld: false,
            id: nanoid()
        }))   
    }

    function hold(id) {
        setDiceValue((oldArray) => 
            oldArray.map((dice) =>
                dice.id === id 
                    ? {...dice, isHeld: !dice.isHeld} : dice
        
            )
        )
    }

    const diceElements = diceValue.map((dieObj) => (
        <DieComponent 
            key={dieObj.id} 
            value={dieObj.value} 
            isHeld={dieObj.isHeld}
            handleClick={() => hold(dieObj.id)}
        />
    ))
   

    return (
        <main>
            {gameWon && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll untill all dice are the same. Click each die to freeze</p>
            <div className='die-container'>
                {diceElements}
            </div>
            
            <button ref={buttonRef} className="roll-button" onClick={onRoll}>{gameWon ? "New Game" : "Roll"}</button>
        </main>
    )
}

export default App
