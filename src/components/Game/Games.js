import './Game.css'
import FalashGame from "./FalashGame"
import { useState } from 'react'
import Form from './Form'

function Games () {

    const [game, setGame] = useState(null);
    const [playerName, setPlayerName] = useState(null)


    
    
     
    return (
    <div className="game-container">

    <div className='game-view'>

    {game===null&&playerName===null && <Form  setPlayerName={setPlayerName} setGame={setGame}/>}
        
    {game==="FalashGame" && <FalashGame playerName={playerName}/>}
    

    </div>

    </div>)
}

export default Games

