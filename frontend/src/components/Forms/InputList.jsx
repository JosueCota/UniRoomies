import React, { useState } from 'react'
import { FloatingLabel, Button, InputGroup, Form} from 'react-bootstrap';
import styles from "./inputlist.module.css";

const InputList = ({state, onChange, label, limit}) => {

    const [item, setItem] = useState(""); 
    
    const addItem = () => {
      if (item !== "") {

        if (state.length !== limit){
          
          onChange((prev) => {
            if (!prev.includes(item)){
              return [...prev, item.trim()]
            }
            return prev 
          })
          setItem("")
        }
      } 
    }

    const removeItem = (val) => {
        onChange((prev) => prev.filter(item => {
            return (item !== val)
          }))
    }

  return (
<div className={styles.container}>
    <InputGroup onKeyDown={(event) => {event.key === "Enter" && addItem()}}>
        <FloatingLabel label={label} controlId={label} style={{zIndex:0}}>
            <Form.Control type='text' placeholder={label} value={item} onChange={(e) => setItem(e.target.value)}/>
        </FloatingLabel>    
            <Button onClick={addItem} style={{zIndex:0}} >Add</Button>
    </InputGroup>
    <ul className={styles.listContainer}>
    {
        state?
        state.map((val, index) => 
        <div key={`${val}${index}div`} className={styles.listDiv} onClick={() => removeItem(val)}>
            <li key={`${val}${index}item`} className={styles.listItem} ><strong style={{color:"black", marginLeft:'1rem', marginRight:"1rem"}}>X</strong>   {val}</li>
        </div>
        )
    : null}
    </ul>
    { state.length ===0 ? <p style={{color:"red", fontWeight:"600"}}>Must not be empty</p>: null}
</div>
  )
}

export default InputList
