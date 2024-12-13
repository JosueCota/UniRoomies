import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'

//Single selection from a list of options
const SingleSelect = ({controlId, label, options, name, def, optionLabel}) => {
  return (
    <FloatingLabel controlId={controlId} label={label} style={{zIndex:"0"}}>
                <Form.Select name={name}>
                  <option value={""} selected disabled hidden>Choose {optionLabel}</option>
                    {options.map(   (option, index) => <option key={option+index} value={option} selected={def && def===option? true: false}>{option}</option>  )}
                </Form.Select>
    </FloatingLabel>
  )
}

export default SingleSelect
