import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'

const FloatingInput = ({type, required, name, label, defaultVal}) => {
  return (
    <FloatingLabel controlId={name} label={label} style={{zIndex:"0"}}>
        <Form.Control name={name} type={type} placeholder={label} required={required} defaultValue={defaultVal} />
    </FloatingLabel>
  )
}

export default FloatingInput
