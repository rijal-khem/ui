import './Home.css'


function Home (){

    const firstLine =`public static Fun live(WeekDay day) Throws LeaveExceptions {`
    const secondLine = `  while(day.isWeekend())){
           return   travellingTo(Places.Randomize())
          
            }`
    const thirdLine =`    return Fun.makeOutOF(coding() + cooking());
           
      }`

   




    return (
        <div class="container">
           
            <div class="row-1">
                <div class ="col-1">
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
                <div class="row-2">
                    <p>
                   <h1>Hi, I am an engineer based in Delaware, USA.</h1>  <br/>
                    Since 2014, I have enjoyed turning complex problems <br/> 
                    into  simple, intuitive and high quality engineering solutions.
                    </p>
                </div>


                </div>
                <div class ="col-2">
                <img class ="landing-image" src="/imgs/profile/profilePic.jpg" alt="Rizal"></img>
                    
                </div>
            </div>

            
        </div>
    )
}

export default Home;