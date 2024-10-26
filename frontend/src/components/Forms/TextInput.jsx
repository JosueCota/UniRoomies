import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from 'react-bootstrap/Tooltip';
import styles from "./textinput.module.css"

const TextInput = ({name, label, placeholder, state, onChange, required, type, maxChar, tip, minLength}) => {
  
  const renderTooltip = (props) => (
    <Tooltip id={name} className={styles.tooltip} {...props}>
      {tip}
    </Tooltip>
  );

  return (
    <Form.Group as={Col} controlId={name} className={styles.container}>
      <div className={styles.labelCont}>
        <Form.Label>{label}</Form.Label> 
        { tip? 
        <OverlayTrigger 
        placement='right'
        delay={{show:100, hide:200}}
        overlay={renderTooltip}
        >
          <i className="fa solid fa-circle-info"></i>
        </OverlayTrigger>: null
        }
      </div>
        <Form.Control required={required} type={type} placeholder={placeholder} value={state} onChange={(e) => onChange(e.target.value)} maxLength={maxChar} minLength={minLength}/>
        
      <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
      <Form.Control.Feedback type='invalid'>Cannot be Empty!</Form.Control.Feedback>
    </Form.Group>
  )
}

export default TextInput
