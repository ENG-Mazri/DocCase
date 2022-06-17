import React, {useState} from "react"


const Search = (props)=>{

    
    const[ newValue, setNewValue] = useState('') 
    const changed = (event)=>{
        setNewValue(event.target.value)
    }
    
    const clear = ()=>{
        
        
        setNewValue('')
        
    }
    const filteredList = props.list.filter(animal=>{
            return animal.includes(newValue)

        })
    
    const isTyped = newValue.length>0
    return (
        <div>
            <input type="text" onChange={changed} value={newValue} placeholder="type in here.."></input>
            {isTyped ?<button onClick={clear}>clear</button>&&
            <ul>
                { filteredList.map(animal=> {
                    return <li key={animal}><a href="google.com">{animal}</a></li>
                    })
                }
            </ul>
            :<button>Info</button>}
            

        </div>
        
    )
}

export default Search