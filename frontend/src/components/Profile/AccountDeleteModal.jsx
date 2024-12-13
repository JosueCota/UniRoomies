import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import TextInput from '../Forms/TextInput';
import { useDeleteUserMutation } from '../../features/usersApiSlice';
import styles from "./accountsettings.module.css"
import { useNavigate } from 'react-router-dom';
import { clearCredentials } from '../../features/authSlice';
import { deleteSearch } from '../../features/searchesSlice';
import { useDispatch } from 'react-redux';
import { logout, showToastError, showToastSuccess } from '../../utils/helperFunctions';

//Modal for deleting account, requires password input
const AccountDeleteModal = () => {

    const [deleteUser] = useDeleteUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false);
    
    const handleDelete = async () => {
        if (password !== "") {
            try {
                await deleteUser({password}).unwrap();
                setShow(false);
                setPassword("");

                dispatch(clearCredentials());
                dispatch(deleteSearch());
                
                showToastSuccess("Successfully Deleted Account", "delSuccess");
                navigate("/");
            } catch (err) {
                showToastError(err)
                if (err.status === 401) {
                  logout(navigate, dispatch);
                }
            }
        } else {
          showToastError("Please Input Your Password", "delErr");
        }
    }
  return (
    <>
        <p className={`${styles.buttons} ${styles.delButton}`} onClick={() => setShow(true)}>Delete Account</p>

        <Modal show={show} onHide={() => setShow(false)} backdrop="static">
        <Modal.Header>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{display: "flex", flexFlow: "column", alignItems:"center",textAlign:'center'}}>Input Password:
          <TextInput name={'password'} placeholder={"Password"} state={password} onChange={setPassword}/>
        </Modal.Body>
        <Modal.Footer style={{display: "flex", justifyContent:"center",textAlign:'center'}}>
          <Button variant="secondary" onClick={() => {setShow(false); setPassword("")}}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AccountDeleteModal
