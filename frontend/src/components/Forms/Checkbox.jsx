import React from 'react'
import { Form } from 'react-bootstrap'

const Checkbox = ({label, value, name, onChange}) => {
  return (
    <div style={{padding: ".5rem", backgroundColor:"white", border:"1px solid lightgray", borderRadius:".5rem"}}>
    <Form.Check style={{display: "flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }} type='switch'>
        <Form.Check.Input style={{padding:".7rem", width:"3rem"}} value={value} name={name} onChange={(e) => onChange(e.target.checked)}/>
        <Form.Check.Label style={{alignContent:"center"}}>{label}</Form.Check.Label>
    </Form.Check>
    </div>
  )
}

export default Checkbox
