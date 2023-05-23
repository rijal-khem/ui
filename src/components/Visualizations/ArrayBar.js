
import "./ArrayBar.css"
import React  from 'react'


function ArrayBar(props) {



    return (

        <div className="data-element" key={props.key} style = {{height: `${props.value}%`}}>
         

        </div>
    )


}


export default ArrayBar;