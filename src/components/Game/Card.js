
import React from "react";

function Card(props){


   
    const cardName = () => {
        let basepath = "/imgs/cardsImgs/";
        
        let imageName = props.value + "_of_" + props.suit.toLowerCase() + ".png";
        
       return  basepath + imageName; 
    } 

   

   


    return (
        <div className="card">
            
         <img src={cardName()} alt="card"></img>
        </div>
    
    
    );


    



}
export default Card;