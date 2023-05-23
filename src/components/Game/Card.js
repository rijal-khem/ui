
import React from "react";
import "./Card.css"

const SUITS = ["♠", "♥" ,"♦", "♣"];

function Card(props){

    const className = "card" +" "+ props.classNames;

    const cardColor=()=> (props.suit==="♥" || props.suit==="♦") ? "card-red" : "card-black";

    
    return (
        <div className={className}>
            <div className={cardColor()}>

                    <div className="card-data-element-top">
                                {props.value} {props.suit}
                    </div>

                    <div>
                        {props.suit}
                    </div>

                    <div className="card-data-element-bottom">
                                {props.value} {props.suit}
                    </div>     

            </div>
            
            
        </div>
        
    );

}
export default Card;