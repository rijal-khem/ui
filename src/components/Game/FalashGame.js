import './FalashGame.css'
import Deck from './Deck';
import React, { useEffect, useState } from 'react';
import Card from './Card'
import CardsComparator from './CardsComparator';
import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';





const FalashGame = ({playerName}) => {  
    
    
    


    const deck = new Deck();
    
    const[initialCards, setInitialCards] = useState(deck);
    const [isShuffle, setIsShuffle] = useState(false);

    const [isShow, setIsShow] = useState(false);

    const [isDealDisabled, setIsDealDisabled] = useState(false)

    const [isShowDisabled, setIsShowDisabled] = useState(true);
    const [isSeeDisabled, setIsSeeDisabled] = useState(true);

    const [isSee, setIsSee] = useState(false)
    const [winner, setWinner] = useState("");
    const [roundCount, setRoundCount] =useState(0);

    const [player, setPlayer] = useState({
        name:playerName,
        score:0,
        cards:[]

    })

    const [computerPlayer, setComputerPlayer] = useState({
        name:"Computer",
        score:0,
        cards:[]
    })

    const players = [computerPlayer,player];
    



    useEffect(()=>{
        setInitialCards(initialCards=> initialCards.shuffle())
        setIsShuffle(false)
    }, [isShuffle,isShow])



    const dealCards =()=>{
        setIsDealDisabled(true) 
        setWinner("")
        if(computerPlayer.cards.length!==0 || player.cards.length!==0){
            cleanPreviousCards();
        }
        
        setRoundCount((roundCount)=>roundCount+1)
       
        for(let i=0; i<3;i++){
            computerPlayer.cards.push(initialCards.cards.pop());
            player.cards.push(initialCards.cards.pop());
        } 

        setIsShowDisabled(false);
        setIsSeeDisabled(false);
     

        
       
    }


    const cleanPreviousCards=()=> {
       initialCards.cards = [...computerPlayer.cards, ...player.cards,...initialCards.cards];
        player.cards = [];
        computerPlayer.cards=[];
        setIsDealDisabled(false);
        setIsShow(false);
        setIsSee(false);
    }

    


    const handleShowClick =()=>{
        setIsShow(true);
        setIsSee(true)
        setIsShowDisabled(true)
        setIsDealDisabled(true)
        setIsSeeDisabled(true);
       
       
       console.log(player.cards)
       console.log(computerPlayer.cards)
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


    
      setTimeout(cleanPreviousCards,4000)
      setIsSeeDisabled(true);
      setIsShowDisabled(true)
     
      
   

    }

    const handleSeeClick=()=>{
        setIsSee(true)

    }

    const handleRaiseClick =()=>{

    }


     

    return (

        <div className="falash-game-container">

        <div className="game-area">
            <div className="players-area">
                    <div className="player-area">
                                <div className="falash-cards-container">
                                                {
                                                    computerPlayer.cards.map((card)=>{
                                                        if(isShow){
                                                        return  (
                                                            <div className= "falash-card">
                                                                <Card classNames="card-front" value={card.value} suit={card.suit} />
                                                            </div>)
                                                        }
                                                        else {
                                                        return (
                                                            <div className= "falash-card">
                                                                <Card classNames="card-back"/>
                                                            </div>)
                                                        }
                                                        
                                                    }
                                                        )
                                                }

                                            
                                           
                                </div>  
                    </div>
                    

                    <div className="player-area" >
                                <div className="falash-cards-container">

                                    {
                                        player.cards.map((card)=> {

                                            if(isSee || isShow){
                                            return (
                                                <div className= "falash-card">
                                                    <Card classNames="card-front" value={card.value} suit={card.suit} />
                                                </div>
                                            )
                                            } else {
                                                return  (
                                                    <div className= "falash-card">
                                                        <Card classNames="card-back"/>
                                                    </div>
                                                )
                                            }
                                        }
                                            )
                                    }
                                </div>  
                    </div>
            </div>
            <div className="game-center">
                <div className="deck-area">
                        <Card classNames="card-back"/>
                </div>

                <div className="player-console">
                                    <div>
                                        <button className ="button" onClick ={()=>setIsShuffle(true)}> Shuffle </button>
                                    </div> 

                                    <div>
                                            <button className ="button" disabled={isDealDisabled} onClick={dealCards}> Deal </button>
                                    </div>

                                    <div>
                                            <button className ="button"  disabled ={isShowDisabled} onClick={handleShowClick}> Show </button>
                                    </div>

                                    <div>
                                            <button className ="button" disabled={isSeeDisabled} onClick={handleSeeClick}> See </button>
                                    </div>

                </div>
            </div>

            
            
            <div className="game-stats">
                    <div className="winner-banner">
                            <h3>Round {roundCount} Winner </h3>
                            <h1>{winner}</h1>
                    </div>


                    <div className="score-board">

                            {
                                players.map((player)=>{
                                        return (

                                            <div className="player-state">
                                                <h3>{player.name}</h3>
                                                <br/>
                                                <h4>Score : {player.score}</h4>
                                            </div>
                                        )
                                })

                            }
                    </div>     
             </div>       
            
        </div>
        
       
       


    </div>)


}

export default FalashGame;