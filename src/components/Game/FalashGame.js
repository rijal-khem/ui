import './FalashGame.css'
import Deck from './Deck';
import React, { useEffect, useState } from 'react';
import Card from './Card'
import CardsComparator from './CardsComparator';





const FalashGame = ({playerName}) => {   

    const computerPlayer = {
        name:"Computer",
        score:0,
        cards:[]
    }
    const player = {
        name:playerName,
        score:0,
        cards:[]
    }

    const deck = new Deck();
    
    const[initialCards, setInitialCards] = useState(deck);
    const [isShuffle, setIsShuffle] = useState(false);

    const [isShow, setIsShow] = useState(false);

    const [isDealDisabled, setIsDealDisabled] = useState(false)
    const [isSee, setIsSee] = useState(false)
    const [winner, setWinner] = useState("");


    useEffect(()=>{
        setInitialCards(initialCards=> initialCards.shuffle())
        setIsShuffle(false)
    
    }, [isShuffle])



    const dealCards =()=>{
        if(computerPlayer.cards.length!==0 || player.cards.length!==0){
            cleanPreviousCards();
            setWinner("")
        }
        
        setIsShow(false);
        setIsSee(false);
        for(let i=0; i<3;i++){
            computerPlayer.cards.push(initialCards.cards.pop());
            player.cards.push(initialCards.cards.pop());
        } 
        setIsDealDisabled(true) 
    }


    const cleanPreviousCards=()=> {
       initialCards.cards = [...computerPlayer.cards, ...player.cards,...initialCards.cards];
        computerPlayer.cards =[];
        player.cards=[];
       
    }

    


    const handleShowClick =()=>{
       setIsShow(true);
       setIsDealDisabled(false);
       const winningCards = CardsComparator(player.cards, computerPlayer.cards)
      if(winningCards===player.cards){
        console.log("Player is Winner");
        player.score = player.score+1;
        setWinner(player.name)
      }else if(winningCards===computerPlayer.cards){
        console.log("Computer Player is Winner");
        computerPlayer.score = computerPlayer.score+1;
        setWinner(computerPlayer.name);
      }
      else setWinner("Draw")

    }

    const handleSeeClick=()=>{
        setIsSee(true)

    }

    const handleRaiseClick =()=>{

    }


     

    return (
        <div className ="falash-game-container">
             
                    <div className="game-view" >

                                    <div className="player-area">
                                            <div className="player-details">
                                                <h3>{computerPlayer.name}</h3> 
                                                <h4> Score : {computerPlayer.score}</h4>
                                            </div>
                                            <div className ="cards-container">
                                            
                                                {
                                                    computerPlayer.cards.map((card)=>{
                                                        if(isShow){
                                                        return   <Card value={card.value} suit={card.suit} />
                                                        }
                                                        else{
                                                        return  <Card value="facedown" suit="deck"/>
                                                        }
                                                        
                                                    }
                                                        )
                                                }
                                            </div>
                                                
                                    </div>
                    
                                    <div className="player-area">
                                            <div className ="player-details">
                                                <h3>{player.name}</h3> 
                                                <h4> Score : {player.score}</h4>

                                            </div>
                                                    
                                            <div className ="cards-container">
                                                    {
                                                        player.cards.map((card)=> {

                                                            if(isSee || isShow){
                                                            return  <Card value={card.value} suit={card.suit} />
                                                            } else {
                                                                return  <Card value="facedown" suit="deck"/>
                                                            }
                                                        }
                                                            )
                                                    }
                                            </div>      
                                    </div>
                    </div>
                


          
                    <div className='right-sidebar'>
                            <div className="deck">
                                <Card value="facedown" suit="deck"/>
                            </div>

                            <div>
                                <lable> Winner </lable><br></br>
                                <h1>{winner}</h1>
                            </div>


                            <div className="console">
                                    <div>
                                        <button className ="button" onClick ={()=>setIsShuffle(true)}> Shuffle </button>
                                    </div> 

                                    <div>
                                            <button className ="button" disabled={isDealDisabled} onClick={dealCards}> Deal </button>
                                    </div>

                                    <div>
                                            <button className ="button" onClick={handleShowClick}> Show </button>
                                    </div>

                                    <div>
                                            <button className ="button" onClick={handleSeeClick}> See </button>
                                    </div>

                                    <div>
                                            <button className ="button" onClick={handleRaiseClick}>Raise </button>
                                    </div>
                            </div>
                        
                    </div>
            
        </div>
    )



}

export default FalashGame;