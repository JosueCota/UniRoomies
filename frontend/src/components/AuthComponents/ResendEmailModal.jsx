import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import TextInput from '../Forms/TextInput';
import { useResendLinkMutation } from '../../features/authApiSlice';
import styles from "./form.module.css"
import { showToastError, showToastSuccess } from '../../utils/helperFunctions';
import Loader from '../Loader';

const ResendEmailModal = () => {

    const [resendLink, {isLoading}] = useResendLinkMutation();
    const [email, setEmail] = useState("")
    const [show, setShow] = useState(false);
    
    const handleResend = async () => {
        if (email !== "") {
            try {
                await resendLink({email}).unwrap();
                setShow(false);
                setEmail("");
                showToastSuccess("Resent Email", "resendSuccess")
            } catch (err) {
              showToastError(err)
            }
        } else {
          showToastError("Please input the email associated with the account you registered!", "resendErr")
        }
    }
  return (
    <>
      { !isLoading? 
        <>
          <p className={styles.link} onClick={() => setShow(true)}>Didn't Receieve Email?</p>
          <Modal show={show} onHide={() => setShow(false)} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>Resend Activation Email</Modal.Title>
            </Modal.Header>
          
            <Modal.Body>Input Email Associated with Account Made:
              <TextInput name={'email'} placeholder={"Email"} state={email} onChange={setEmail}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => {setShow(false); setEmail("")}}>
                Close
              </Button>
              <Button variant="primary" onClick={handleResend}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </>
    :<Loader/>}
  </>
  )
}

export default ResendEmailModal
