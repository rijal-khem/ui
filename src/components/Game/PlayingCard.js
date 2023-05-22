import './PlayingCard.css'

export default function  PlayingCard (props) {

    const cardName = () => {
        let basepath = "/imgs/cardsImgs/";
        
        let imageName = props.value + "_of_" + props.suit.toLowerCase() + ".png";
        
       return  basepath + imageName; 
    } 


    return (
        <div className="card-front-view">
         <img src={cardName()} alt="card"></img>
        </div>
    );


}