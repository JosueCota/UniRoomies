import React from 'react'
import { Form } from 'react-bootstrap'

const Checkbox = ({label, name}) => {
  return (
    <div style={{display:"flex", flexFlow:"column wrap", alignItems: "center", marginTop:".5rem"}}>
      <span><strong>{label}</strong></span>
      <Form.Check style={{display: "flex", justifyContent:"start", flexWrap:"wrap",}}>
          <Form.Group style={{display:"flex", gap:"2rem"}}>
            <div>
                <Form.Check.Input style={{padding:".75rem", width:".5rem"}}  name={name} value={1} type='radio' defaultChecked/>
                <Form.Check.Label style={{marginLeft:".3rem",verticalAlign:"middle"}}>{"Yes"}</Form.Check.Label>
            </div>
            <div>
                <Form.Check.Input style={{padding:".75rem", width:"1rem"}}  name={name} value={0} type='radio'/>
                <Form.Check.Label style={{marginLeft:".3rem",verticalAlign:"middle"}}>{"No"}</Form.Check.Label>
            </div>

          </Form.Group>
      </Form.Check>
    </div>
  )
}

export default Checkbox
