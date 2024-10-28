import React, { useState, useEffect } from 'react'
import TextInput from '../Forms/TextInput'
import SubmitBtn from '../Forms/SubmitBtn'
import styles from "./profileusertab.module.css"
import Form from "react-bootstrap/Form"
import { useSelector} from "react-redux";
import { toast } from 'react-toastify'
import Loader from '../Loader'
import { useUpdateUserNameMutation, useUpdateUserPasswordMutation } from '../../features/usersApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from "../../features/authSlice"

const ProfileUserTab = () => {

  const { user } = useSelector((state) => state.auth);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")

  const [updateName, {isLoading}] = useUpdateUserNameMutation();
  const [updatePassword] = useUpdateUserPasswordMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email)
  }, [])

  const validate = () => {
    const namePattern = /^[a-zA-Z-]{2,}$/;
    let err = false
    if (!namePattern.test(firstName) || !namePattern.test(lastName)){
      toast.error( "Make Sure Name Does Not Contain Numbers or Special Characters other than '-'", {toastId: "regNameErr"})
      err = true;
    }
    if (newPassword && newPassword === oldPassword ) {
      toast.error("New Password Matches Old Password", {toastId: "regPassErr"});
      err = true;
    }
    return err
  }

  const resetStates = () => {
    setNewPassword("");
    setOldPassword("");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (validate()) {
      console.log("Error with Submission")
    } 
    else {
      try {
        if (firstName !== user.firstName || lastName!== user.lastName) {
          const res = await updateName({firstName, lastName}).unwrap();
          dispatch(setCredentials({...res}));
          toast.success("Successfully Updated User!", {toastId: 'userUpdateSuccess'});
        }
        if (newPassword !== "") {
          await updatePassword({oldPassword, newPassword}).unwrap();
          toast.success("Successfully Updated User", {toastId: 'userUpdateSuccess'});
          resetStates();
        }
      } catch(err) {

        toast.error(err?.data?.message || err.error , {toastId: "updateUserServerErr"});
      }
    }
  };

  return (
    <Form className={styles.formCont} onSubmit={handleSubmit}>   
    <h2 className={styles.title}>Update Profile</h2>
      <TextInput placeholder={firstName} label={"First Name"} state={firstName} onChange={setFirstName} name={"firstName"} required={true} maxChar={20} tip={"No Numbers or Special Symbols"} minLength={2}/>
      <TextInput placeholder={lastName} label={"Last Name"} state={lastName} onChange={setLastName} name={"lastName"} required={true} maxChar={20} tip={"No Numbers or Special Symbols"} minLength={2}/>
      <TextInput disabled placeholder={email} label={"Email"}/>
      <TextInput placeholder={"New Password"} label={"New Password"} state={newPassword} onChange={setNewPassword} name={"password"} maxChar={50} tip={"Must be Different From Current Password"} minLength={8}/>
      <TextInput placeholder={"Current Password"} label={"Current Password"} state={oldPassword} onChange={setOldPassword} name={"r-password"}  type={"password"} maxChar={50} tip={"Must Match Current Password"}/>
      {(isLoading) && <Loader/>}
      <SubmitBtn name={"Update"}/> 
    </Form>    
  )
}

export default ProfileUserTab
