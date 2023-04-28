import { useState } from "react";


function LogIn(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = async() => {
        const requestData = {email, password}

           const response = await fetch('http://localhost:8080/user/login',
            {
                method:"POST",
                headers: {"Content-Type" : "application/json"},
                body:JSON.stringify(requestData)
            })
            const data = await response.json();
            console.log(data.id)
            alert(data.email)
    }

   

    

    return (
        <div>
            <form>
                <label>Email</label>
                <input type="text" onChange={(e)=> setEmail(e.target.value)}></input>
            
                <label>Password</label>
                <input type="password" onChange={(e)=> setPassword(e.target.value)}></input>
            </form>
            <button onClick={handleClick}>LogIn</button>
        </div>
    )
}
export default LogIn;