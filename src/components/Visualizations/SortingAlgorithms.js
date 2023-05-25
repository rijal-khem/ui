




function insertionSortingAlgo(arrayCopy){

    const elementsForAnimation =[];

    for(let i=1; i<arrayCopy.length;i++){
        //supposing the first element i.e at idx=0 is already sorted on we start sorting from next position 
        //as similary as we sort playing cards by placing the new card in left or right position of previous card
            //[86, 45,63,25]
            //say i=3 then value is 8, this 8 has to compared backward
            //16
            for(let k=i-1;k>=0;k--){           //k=2
                
                if(arrayCopy[k]>arrayCopy[k+1]){     //expression 86>16 true
                    //swap the position 
                    [arrayCopy[k+1], arrayCopy[k]] =[arrayCopy[k], arrayCopy[k+1]]
                    elementsForAnimation.push([k+1, k])
                   
                }
            }            
             
    }

 return elementsForAnimation;


}
export default insertionSortingAlgo;
