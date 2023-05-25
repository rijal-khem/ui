
import './Visualization.css'
import { useEffect, useState } from 'react';
import React  from 'react'
import ArrayBar from "./ArrayBar";




function Visualization(){




    const [array, setArray] = useState([])
    const [isGenerateDisabled, setIsGenerateDisabled] = useState(false);
    const [isInsertionSortDisabled, setIsInsertionSortDisabled] = useState(false);

    const [isMergeSortDisabled, setMergeSortDisabled] = useState(false)
    const [isResetDisabled, setIsResetDisabled] = useState(false)

    const [iterationCount, setIterationCount]  = useState(0);
    const [animationRunning, setAnimationRuning] = useState(false)


    function animate(elementsArr){
        
        if(elementsArr.length===0){
            return;
        }
        const [k,j] = elementsArr.shift();

        [array[k], array[j]] = [array[j], array[k]]
        setIterationCount((iterationCount)=> iterationCount +1)
        

        setTimeout(()=>{
            animate(elementsArr)
        }, .0001)
            
    }

    

    const handleResetclick=()=>{
        setArray([]);
        setIsGenerateDisabled(false);
        
    }
     


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



        function mergeSortAlgo(arrayCopy){

            setIterationCount(iterationCount=>iterationCount+1);
 


            if(arrayCopy.length<=1){
                return arrayCopy;
            } 
        

            let midpoint = Math.floor(arrayCopy.length/2)
           
            let leftArray = arrayCopy.slice(0,midpoint)
            let rightArray = arrayCopy.slice(midpoint);

            leftArray  = mergeSortAlgo(leftArray)
            rightArray = mergeSortAlgo(rightArray)

            
           
            return doMerge(leftArray,rightArray);
        }


        function doMerge(leftArray, rightArray){

           const sortedArray =[];
            let leftIdx = 0;
            let rightIdx =0;
            let mainIdx =0;

            //Compare smallest elements 
             
            while(leftIdx<leftArray.length && rightIdx<rightArray.length){
               debugger
                if(leftArray[leftIdx] <= rightArray[rightIdx]){
                   sortedArray[mainIdx] = leftArray[leftIdx];
                    leftIdx++;
                } else{
                    sortedArray[mainIdx] = rightArray[rightIdx]
                    rightIdx++;
                }
               mainIdx++;
               
            }


            //if arrays are unequal length , insert remaining array to input array.       
          
            if(leftIdx<leftArray.length){
                sortedArray.push(...leftArray.slice(leftIdx))  
            }

            if(rightIdx<rightArray.length){
                sortedArray.push(...rightArray.slice(rightIdx))
            }
       
         
            return sortedArray;
           
        }

    
    const handleMergeSortAlgoClick =()=>{

        setMergeSortDisabled(true);
        setIsInsertionSortDisabled(true);
        setIsGenerateDisabled(true);

        const copyArray = array.slice();

       const sortedArray =  mergeSortAlgo(copyArray);
       
       console.log(sortedArray);

       setArray(sortedArray);

        

       

      

    }
  

    
    function generateRandomNumbersBetween(min, max){
      return Math.ceil(Math.random() *(max-min)+ min);
    }


    function mapNumbersToPercent(number){
        return Math.floor(number*(100/(max-min)))
    }

    function fillArrayWithRandomNumbers(min, max){
        for(let i=0;i<150;i++){
            var randomNumber = generateRandomNumbersBetween(min,max);
           const randomNumberPercent =  Math.floor(100*generateRandomNumbersBetween(min,max)/(max-min))
           array.push(randomNumberPercent)
        }
       
        
    
    }



        const handleInsertionAlgoClick = ()=>{
            
        setIsInsertionSortDisabled(true);
        const copyArr = array.slice();
        const animationIdxsArr = insertionSortingAlgo(copyArr);
        console.log(animationIdxsArr)

        setAnimationRuning(true);
        animate(animationIdxsArr)
    


      }

      



    const handleGenerateArray = (e)=> {
        fillArrayWithRandomNumbers(1, 500)
        setIsInsertionSortDisabled(false);
        setIsGenerateDisabled(true);
        setIterationCount(0)
        setMergeSortDisabled(false)
    
        
    }


    return (
    <div className="visualization-container">
      
        <div className="array-box">

           {
            array.map((value,idx)=> {
                return (
                    <ArrayBar value={value} key={idx}/>
                )
            })
           }
        </div>


        <div className="left-container">  

            <div className="sort-algo-details">
                <h3>Insertion Sorting Algorithm</h3>
            </div>
            <div className="stats">
                <h3>Data Size : {array.length}</h3>
                <h3>Number of Iterations : {iterationCount}</h3> 
            </div>

            <div className="console">

                <button disabled = {isGenerateDisabled} onClick={handleGenerateArray}>Generate New Array</button>
                <button disabled={isInsertionSortDisabled} onClick={handleInsertionAlgoClick}>Insertion Sort</button>
                <button disabled={isResetDisabled} onClick={handleResetclick}>Reset Array</button>
                <button disabled={isMergeSortDisabled} onClick={handleMergeSortAlgoClick}>Merge Sort</button>

            </div>

            
            

            
        </div>
        

       

       


    </div>)
}

export default Visualization;