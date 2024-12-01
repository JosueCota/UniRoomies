import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'

const FloatingInput = ({type, required, name, label, defaultVal, step, max, min}) => {
  return (
    <FloatingLabel controlId={name} label={label} style={{zIndex:"0", color:"black"}}>
        <Form.Control name={name} type={type} placeholder={label} required={required} defaultValue={defaultVal} max={max || null} min={min || null} step={step || null} />
    </FloatingLabel>
  )
}

export default FloatingInput
