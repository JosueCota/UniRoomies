import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'


const SingleSelect = ({controlId, label, options, nullOption, value, onChange}) => {
  return (
    <FloatingLabel controlId={controlId} label={label} style={{zIndex:"0"}}>
                <Form.Select onChange={onChange} value={value }>
                    { nullOption && <option>{null}</option> }
                    {options.map(   (option, index) => <option key={option+index}>{option}</option>    )}
                </Form.Select>
    </FloatingLabel>
  )
}

export default SingleSelect
