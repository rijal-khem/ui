import './Game.css'
import FalashGame from "./FalashGame"
import { useState } from 'react'

function Games () {

    const [game, setGame] = useState("GameScreen");

     
    return (
    <div className="game-container">
        <div className='left-sidebar'>
        <button onClick= {()=>setGame("FalashGame")}> Falash Game </button>
        <button onClick= {()=>setGame("")}> Black Jack Game </button>
        </div>
    
    
    <div className='game-view'>
        {game==="FalashGame" && <FalashGame/>}
    </div>

    <div className='right-sidebar'>
        
    </div>

    </div>)
}

export default Games

