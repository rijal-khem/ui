import './Form.css'
import React  from 'react'



export default function Form({setPlayerName, setGame}) {

    

    const handleSubmit =(e)=>{
        e.preventDefault();
       
        setPlayerName(player=> e.target.name.value);

        setGame(game=> e.target.select.value);

    }

    return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label >Name</label>
                    <input type="text" name ="name"  placeholder='Enter your name'></input>
                </div>
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