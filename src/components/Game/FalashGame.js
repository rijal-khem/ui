import './FalashGame.css'
import Card from './Card'
import Deck from './Deck';
import React, { useEffect, useState } from 'react';
//import shuffleCards from './Deck';

const FalashGame = () => {    
    const deck = new Deck();
    const[initialCards, setInitialCards] = useState(deck)
    const [isShuffle, setIsShuffle] = useState(false)

    useEffect(()=>{
        setInitialCards(initialCards.shuffle())
        setIsShuffle(false)
    }, [isShuffle])
     

    return (
        <div>
            <div>
                <button onClick ={()=>setIsShuffle(true)}> Shuffle</button>
            </div>  

            <div className ="falash-game-container" >
                {initialCards.cards.map(card => (
                    <Card value={card.value} suit={card.suit} />
                ))}
            </div> 
        </div>
    )
}

export default FalashGame;