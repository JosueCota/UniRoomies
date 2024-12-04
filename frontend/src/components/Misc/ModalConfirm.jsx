import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import GeneralButton2 from '../Forms/GeneralButton2';

const ModalConfirm = ({handleConfirm, title, name}) => {

    const [show, setShow] = useState(false);

    return (
        <>
            <GeneralButton2 name={name} type={"button"} onClick={() => setShow(true)}/>
            <Modal show={show} onHide={() => setShow(false)} backdrop="static">
            <Modal.Header>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{display: "flex", flexFlow: "column", alignItems:"center",textAlign:'center'}}>Are You Sure?
            </Modal.Body>
            <Modal.Footer style={{display: "flex", justifyContent:"center",textAlign:'center'}}>
              <Button variant="secondary" onClick={() => {setShow(false); setPassword("")}}>
                Close
              </Button>
              <Button variant="primary" onClick={() => {
                handleConfirm(); 
                setShow(false);}}
                >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
}

export default ModalConfirm
