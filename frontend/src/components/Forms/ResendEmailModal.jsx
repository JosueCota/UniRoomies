import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import TextInput from './TextInput';
import { useResendLinkMutation } from '../../features/usersApiSlice';
import { toast } from 'react-toastify';
import styles from "./form.module.css"

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
                toast.success("Resent Email!", {toastId:"resendSucc"});
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        } else {
            toast.error("Please input the email associated with the account you registered!", {toastId:"resendErr"})
        }
    }
  return (
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
  )
}

export default ResendEmailModal
