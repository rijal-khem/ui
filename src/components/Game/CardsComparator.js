
const CARD_VALUE_MAP = {
    "2":2, 
    "3":3, 
    "4":4,
    "5":5, 
    "6":6, 
    "7":7,
    "8":8, 
    "9":9, 
    "10":10,
     J:11, 
     Q:12, 
     K:13, 
     A:14
}



export default function CardsComparator(playerCards, computerPlayerCards){
    
   //sorting the players cards
   cardsSort(playerCards);
   cardsSort(computerPlayerCards);


   if (isTrial(playerCards) && isTrial(computerPlayerCards)){
        return () => (CARD_VALUE_MAP[playerCards[0].value]>CARD_VALUE_MAP[computerPlayerCards[0].value]) ? playerCards :computerPlayerCards;
       
    } else if(isTrial(playerCards) && !isTrial(computerPlayerCards)){
        return playerCards;

    } else if ( isTrial(computerPlayerCards) && !isTrial(computerPlayerCards)){
        return computerPlayerCards;

    } else if (isDoubleRun(playerCards) && (!isTrial(computerPlayerCards) || !isDoubleRun(computerPlayerCards))){
        return playerCards;
    } else if (isDoubleRun(computerPlayerCards) && (!isTrial(playerCards) || !isDoubleRun(playerCards))){
        return computerPlayerCards;
    }else if (isDoubleRun(playerCards) && isDoubleRun(computerPlayerCards)){
        return innerCardsCompare(playerCards, computerPlayerCards);         
    } else if(isRun(playerCards) && (!isRun(computerPlayerCards))){
        return playerCards;
    }else if(isRun(computerPlayerCards) &&(!isRun(playerCards))){
        return computerPlayerCards;
    }else if (isRun(playerCards) && isRun(computerPlayerCards)){
        return innerCardsCompare(playerCards, computerPlayerCards)
    } else if (isSameColor(playerCards) && (!isSameColor(computerPlayerCards))){
        return playerCards;
    } else if (isSameColor(computerPlayerCards) && (!isSameColor(playerCards))){
        return computerPlayerCards;
    } else if (isSameColor(playerCards) && isSameColor(computerPlayerCards)){
         return innerCardsCompare(playerCards, computerPlayerCards);
    } else if(isPair(playerCards) && !isPair(computerPlayerCards)){
        return playerCards;
    } else if(isPair(computerPlayerCards) && !isPair(playerCards)){
        return computerPlayerCards;
    }else if (isPair(playerCards) && isPair(computerPlayerCards)){
        return innerCardsCompareForPairs(playerCards, computerPlayerCards, true)
    }else if(isTop(playerCards) && isTop(computerPlayerCards)){
        return innerCardsCompareForTop(playerCards, computerPlayerCards, false);
    }
}



const cardsSort = (cards) => cards.sort((c1, c2)=> CARD_VALUE_MAP[c2.value]- CARD_VALUE_MAP[c1.value]);

const isPair = (cards) => ((cards[0].value===cards[1].value) || (cards[1].value===cards[2].value) || (cards[0].value===cards[2].value))? true:false;

const isTrial = (cards)=>((cards[0].value===cards[1].value) && (cards[1].value===cards[2].value))?true:false;

const isSameColor = (cards) => ((cards[0].suit===cards[1].suit) && (cards[1].suit ===cards[2].suit))?true:false;


const isRun = (cards)=> {
    if(cards[0].value==="A" && cards[1].value==="2" && cards[2].value[2]==="3"){
        return true;
    }else 
    return  (CARD_VALUE_MAP[cards[0].value] - CARD_VALUE_MAP[cards[1].value]===1 && CARD_VALUE_MAP[cards[1].value] - CARD_VALUE_MAP[cards[2].value]===1)?true:false;
}



const isDoubleRun = (cards) => (isRun(cards)&& isSameColor(cards))? true:false;
const isTop = (cards) => (isTrial(cards)|| isDoubleRun(cards) || isRun(cards) || isSameColor(cards) || isPair(cards)) ? false:true;

const innerCardsCompare= (playerCards, computerPlayerCards)=>{
    if(CARD_VALUE_MAP[playerCards[0].value]>CARD_VALUE_MAP[computerPlayerCards[0].value]){
        return playerCards;
    }else if (CARD_VALUE_MAP[playerCards[0].value]===CARD_VALUE_MAP[computerPlayerCards[0].value]){
        if(playerCards[0].suit==="SPADE"){
            return playerCards;
        } else if (computerPlayerCards[0].suit==="SPADE"){
            return computerPlayerCards;
        } else return 0;
    }

}

const innerCardsCompareForPairs= (playerCards, computerPlayerCards)=>{

    //common function for inner comparision of cards. for pair the middle car is compared first and left right. so mid = idx+1
    //send isPairComparision true for inner compare of pair cards.
    //for top starts for left which is idx = -1 i.e -1+1 = 0 index, can be refactired later.
    // send isPairComparision  false for comparing the top cards.
   
   var idx =0;

    if(CARD_VALUE_MAP[playerCards[1].value]>CARD_VALUE_MAP[computerPlayerCards[1].value]){
        return playerCards;
    }else if (CARD_VALUE_MAP[playerCards[1].value]===CARD_VALUE_MAP[computerPlayerCards[1].value])
    {
                if(CARD_VALUE_MAP[playerCards[0].value] > CARD_VALUE_MAP[computerPlayerCards[0].value])
                {
                        return playerCards;
                }else if (CARD_VALUE_MAP[playerCards[0].value] === CARD_VALUE_MAP[computerPlayerCards[0].value])
                {
                            if(CARD_VALUE_MAP[playerCards[2].value]>CARD_VALUE_MAP[computerPlayerCards[2].value])
                            {
                                return playerCards;
                            }else if (CARD_VALUE_MAP[playerCards[2].value]===CARD_VALUE_MAP[computerPlayerCards[2].value])
                            {
                                    if(playerCards[0].suit==="SPADE")
                                    {
                                        return playerCards;
                                    } else if (computerPlayerCards[0].suit==="SPADE"){
                                        return computerPlayerCards;
                                    } else return 0; 
                            }else return computerPlayerCards;
       
                } else return computerPlayerCards;
    } else return computerPlayerCards;
}


const innerCardsCompareForTop= (playerCards, computerPlayerCards, isPairComparision)=>{


    
    if(CARD_VALUE_MAP[playerCards[0].value]>CARD_VALUE_MAP[computerPlayerCards[0].value]){
        return playerCards;
    }else if (CARD_VALUE_MAP[playerCards[0].value]===CARD_VALUE_MAP[computerPlayerCards[0].value])
    {
                if(CARD_VALUE_MAP[playerCards[1].value] > CARD_VALUE_MAP[computerPlayerCards[1].value])
                {
                        return playerCards;
                }else if (CARD_VALUE_MAP[playerCards[1].value] === CARD_VALUE_MAP[computerPlayerCards[1].value])
                {
                            if(CARD_VALUE_MAP[playerCards[2].value]>CARD_VALUE_MAP[computerPlayerCards[2].value])
                            {
                                return playerCards;
                            }else if (CARD_VALUE_MAP[playerCards[2].value]===CARD_VALUE_MAP[computerPlayerCards[2].value])
                            {
                                    if(playerCards[0].suit==="SPADE")
                                    {
                                        return playerCards;
                                    } else if (computerPlayerCards[0].suit==="SPADE"){
                                        return computerPlayerCards;
                                    } else return 0; 
                            }else return computerPlayerCards;
       
                } else return computerPlayerCards;
    } else return computerPlayerCards;
}













