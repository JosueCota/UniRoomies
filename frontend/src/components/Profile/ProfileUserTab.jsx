import React, { useState, useEffect } from 'react'
import TextInput from '../Forms/TextInput'
import SubmitBtn from '../Forms/SubmitBtn'
import styles from "./profileusertab.module.css"
import Form from "react-bootstrap/Form"
import { useSelector} from "react-redux";
import { toast } from 'react-toastify'
import Loader from '../Loader'
import { useUpdateUserInfoMutation, useUpdateUserPasswordMutation } from '../../features/usersApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from "../../features/authSlice"
import ProfileAccount from './ProfileAccount'
import PictureSelect from "../Forms/PictureSelect"

const ProfileUserTab = () => {

  const { user } = useSelector((state) => state.auth);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [pfp, setPfp] = useState({})

  const [updateInfo, {isLoading}] = useUpdateUserInfoMutation();
  const [updatePassword] = useUpdateUserPasswordMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email)
    setPfp({value: user.pfp, image: `pfp${user.pfp}`})
  }, [])

  const validatePassword = () => {
    let valid = true;
    if (newPassword && newPassword === oldPassword ) {
      toast.error("New Password Matches Old Password", {toastId: "upPassErr"});
      valid = false;
    }
    return valid
  }

  const validateName = () => {
    const namePattern = /^[a-zA-Z-]{2,}$/;
    let valid = true;
    if (!namePattern.test(firstName) || !namePattern.test(lastName)){
      toast.error( "Make Sure Name Does Not Contain Numbers or Special Characters other than '-'", {toastId: "upNameErr"})
      valid = false;
    } else if (firstName === user.firstName && lastName === user.lastName && pfp.value === user.pfp) {
      toast.error("A Change Must be Made", {toastId: "upNameErr"})
      valid = false;
    }
    return valid
  }

  const resetStates = () => {
    setNewPassword("");
    setOldPassword("");
  }

  const handleNameFormSubmit = async(event) => {
    event.preventDefault();
    if (validateName()) {
      try {
      
          const val = pfp.value
          const res = await updateInfo({firstName, lastName, pfp:val}).unwrap();
          dispatch(setCredentials({...res}));
          toast.success("Successfully Updated Info!");
        } catch (err) {
          toast.error(err?.data?.message || err.error , {toastId: "updateUserServerErr"});
        }
    }
  }

  const handlePasswordFormSubmit = async(event) => {
    event.preventDefault();
    if (validatePassword()) {
      try {
        if (newPassword !== "") {
          await updatePassword({oldPassword, newPassword}).unwrap();
          toast.success("Successfully Updated Password!", {toastId: 'userUpdateSuccess'});
          resetStates();
        }
        } catch (err) {
          toast.error(err?.data?.message || err.error , {toastId: "updateUserServerErr"});
        }
    }
  }

  return (
    <div>
      <Form className={styles.formCont} onSubmit={handleNameFormSubmit} id='updateName'>
        <h2 className={styles.title}>Update User</h2>
        <TextInput placeholder={firstName} label={"First Name"} state={firstName} onChange={setFirstName} name={"firstName"} required={true} maxChar={20} tip={"No Numbers or Special Symbols"} minLength={2}/>
        <TextInput placeholder={lastName} label={"Last Name"} state={lastName} onChange={setLastName} name={"lastName"} required={true} maxChar={20} tip={"No Numbers or Special Symbols"} minLength={2}/>
        <TextInput disabled placeholder={email} label={"Email"}/>
        <PictureSelect pfp={pfp} setPfp={setPfp} size={64}/>
        <SubmitBtn name={"Update Name"} formId={"updateName"}/> 
      </Form>
      <Form className={styles.formCont} onSubmit={handlePasswordFormSubmit} id="updatePassword">
        <h2 className={styles.title}>Update Password</h2>
        <TextInput placeholder={"New Password"} label={"New Password"} state={newPassword} onChange={setNewPassword} name={"password"} maxChar={50} tip={"Must be Different From Current Password"} minLength={8}/>
        <TextInput placeholder={"Current Password"} label={"Current Password"} state={oldPassword} onChange={setOldPassword} name={"r-password"}  type={"password"} maxChar={50} tip={"Must Match Current Password"} minLength={8}/>
        {(isLoading) && <Loader/>}
        <SubmitBtn name={"Update Password"} formId={"updatePassword"}/> 
      </Form>
      <ProfileAccount/>
    </div>
  )
}

export default ProfileUserTab
