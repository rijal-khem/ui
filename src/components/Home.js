import './Home.css'


function Home (){

    const firstLine =`public static Fun live(WeekDay day) Throws LeaveExceptions {`
    const secondLine = `  if(day.isWeekend())){
           return   travellingTo(Places.Randomize())
          
            }`
    const thirdLine =`    return Fun.makeOutOF(coding(),cooking());
           
      }`

   




    return (
        <div className="container">
           
            <div className="row-1">
                <div className ="col-1">
                    <p>
                        <code>
                            {firstLine}
                            <br/> 
                            <br/>
                            {secondLine}
                            <br/>
                            <br/>
                            {thirdLine}
                        </code>
                                       
                    </p>
                    <br/>
                <div className="row-2">
                    <p>
                   <h1>Hi, I am an engineer based in Delaware, USA.</h1>  <br/>
                    Since 2014, I have enjoyed turning complex problems <br/> 
                    into  simple, intuitive and high quality engineering solutions.
                    </p>
                </div>


                </div>
                <div className ="col-2">
                <img className ="landing-image" src="/imgs/profile/profilePic.jpg" alt="Rizal"></img>
                    
                </div>
            </div>

            
        </div>
    )
}

export default Home;