import React, {useState} from "react"


const Slider = (props)=>{
    const r = 50

    const[ newValue, setNewValue] = useState('') 
    const changed = (event)=>{
        setNewValue(event.target.value)
    }


    return (
        <div>
            <input type="range" onChange={changed} max={r}></input>
            <div>{r}</div>
            <div>{newValue}</div>
        </div>
        
    )
}

export default Slider