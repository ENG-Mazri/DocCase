import React from "react"
import "./MyComp.css"


const MyComp = (props)=>{
    
    return (
        <div>{props.children}
            <div id="MyComp">
            </div>
        </div>
        
    )
}

export default MyComp