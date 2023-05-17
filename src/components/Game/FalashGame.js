import './FalashGame.css'
import Card from './Card'
import Deck from './Deck';
import React, {  useCallback, useState } from 'react';
import shuffleCards from './Deck';


function FalashGame(){
     
    const deck = new Deck();

    const[initial, setShuffledCards] = useState(deck)

    const handleClickShuffle = ()=>{
        let newDeck = initial.shuffle();
        setShuffledCards([...newDeck])
    }
     
     
         function displayCards(){
        
            return  initial.cards.map(card => {
            return (
               <Card value={card.value} suit = {card.suit} />
           );
         })
       
       }













    return (
        <div>
            <div>
                <button onClick ={handleClickShuffle} > Shuffle</button>
            </div>  



            <div className ="falash-game-container" >
            {displayCards()}
            </div>

            
        </div>


    )
}






export default FalashGame;