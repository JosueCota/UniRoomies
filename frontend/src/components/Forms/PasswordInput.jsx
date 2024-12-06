import React, { useState } from 'react'
import { Form, Tooltip } from 'react-bootstrap'
import { OverlayTrigger, Col } from 'react-bootstrap'
import {BiSolidHide, BiHide} from "react-icons/bi"
import { MdVisibility } from "react-icons/md";
import styles from "./textinput.module.css"

const PasswordInput = ({tip, name, state, onChange, placeholder, label}) => {
  const [hidden, setHidden] = useState(true); 
  const renderTooltip = (props) => (
    <Tooltip id={name} className={styles.tooltip} {...props}>
      {tip}
    </Tooltip>
  );

  return (
    <Form.Group as={Col} controlId={name} className={styles.container}>
      <div className={styles.labelCont}>
        <Form.Label>{label}</Form.Label> 
        { tip && 
        <OverlayTrigger 
        placement='right'
        delay={{show:100, hide:200}}
        overlay={renderTooltip}
        >
          <i className="fa solid fa-circle-info" style={{opacity:.4}}></i>
        </OverlayTrigger>
        }
      </div>
        <div className={styles.passwordDiv}>
          <Form.Control required type={hidden? "password": "text"} placeholder={placeholder} value={state} onChange={(e) => onChange(e.target.value)} maxLength={100} minLength={8} name={name} style={{border:"none"}}/>
          <Form.Text onClick={() => setHidden(prev => !prev)} style={{minWidth:"50px", display:"flex", justifyContent:"center", alignItems: "center", height:"2rem"}}>{hidden? <BiSolidHide/>: <MdVisibility />}</Form.Text>

        </div>
    </Form.Group>
  )
}

export default PasswordInput
