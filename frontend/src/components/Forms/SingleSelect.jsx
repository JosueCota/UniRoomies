import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'


const SingleSelect = ({controlId, label, options, name}) => {

  return (
    <FloatingLabel controlId={controlId} label={label} style={{zIndex:"0"}}>
                <Form.Select name={name}>
                    {options.map(   (option, index) => <option key={option+index} value={option}>{option}</option>  )}
                </Form.Select>
    </FloatingLabel>
  )
}

export default SingleSelect
