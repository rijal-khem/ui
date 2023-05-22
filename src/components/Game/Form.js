import './Form.css'
import React  from 'react'



export default function Form({setPlayerName, setGame}) {


    const existingPlayerName = localStorage.getItem('playerName')
  
    

    const handleSubmit =(e)=>{
        e.preventDefault();

        if(localStorage.getItem('playerName')!==null){
            setPlayerName(player=>localStorage.getItem('playerName'))
        } else {
            setPlayerName(player=> e.target.name.value);
            localStorage.setItem('playerName',e.target.name.value)
        }
       
        

        setGame(game=> e.target.select.value);

    }



    return (
            <form onSubmit={handleSubmit}>

                {
                    localStorage.getItem('playerName')===null && 
                    <div>
                        <h3> Welcome to Fun </h3>
                    <label> Name </label>
                    <br/>
                    <input type="text" name ="name"  placeholder='Enter your name'></input>
                </div>
                }
                {
                    localStorage.getItem('playerName')!==null && 
                    <div>
                        <h3> Welcome back ! <br/> {localStorage.getItem('playerName')}</h3>
                    </div>

                }
                
                 <div>
                    <lable> Select Game</lable>

                    <select name="select">
                        <option value="FalashGame">Falash Game</option>
                        <option value="BlackJackGame">Black Jack Game</option>
                    </select>

                    <div>
                        <button>Play Now</button>
                    </div>

                 </div>
                 
            </form>
        
    )

}