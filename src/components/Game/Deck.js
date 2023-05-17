


const SUITS = ["Hearts", "SPADES", "DIAMONDS", "CLUBS"];
const VALUES =["A", "2","3","4","5","6","7","8","9","10","J","Q","K"];

export default class Deck {

    constructor(cards = freshDeck()){
        this.cards = cards;
    }
    
    getnumberofCards(){
        return this.cards.length;
    }

    shuffle(){
        for(let i=0; i<this.cards.length;i++){
        const newIndex = Math.floor(Math.random()*i)
        const oldValue = this.cards[newIndex];
        this.cards[newIndex] = this.cards[i];
        this.cards[i] = oldValue;
        }
       return this;
    }
    

}

class Card {
    constructor(suit, value){
        this.suit =suit;
        this.value = value;
    }
}


function freshDeck() {

    return SUITS.flatMap(suit=> 
        {return VALUES.map(value=>{ 
            return new Card(suit,value)})});
}
