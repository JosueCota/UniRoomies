import React, { useState, useEffect } from 'react';
import TextInput from '../Forms/TextInput';
import GeneralButton from '../Forms/GeneralButton';
import styles from "./form.module.css";
import { Link, useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import { useSelector} from "react-redux";
import { useRegisterMutation } from '../../features/authApiSlice';
import Loader from '../Misc/Loader';
import ResendEmailModal from './ResendEmailModal';
import { showToastError, showToastSuccess, showToastWarning } from '../../utils/helperFunctions';
import PictureSelect from '../Forms/PictureSelect';
import PasswordInput from '../Forms/PasswordInput';

//Register form responsible for creating user and sending email activation link to user
const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pfp, setPfp] = useState({value: 1, image: "pfp1"});
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  const [register, {isLoading}] = useRegisterMutation(); 

  useEffect(() => {
    if (user) {
      navigate("/roommates");
    }
  }, [navigate, user]);

  const validate = () => {
    const emailPattern= /^[a-zA-Z0-9._-]{3,}@[a-zA-Z.]{2,}?.edu$/;
    const namePattern = /^[a-zA-Z-]{2,}$/;
    let err = false;
    if (!namePattern.test(firstName) || !namePattern.test(lastName)){
      showToastWarning("Make Sure Name Does Not Contain Numbers or Special Characters other than '-'", "regNameWarning")
      err = true;
    }
    if (!emailPattern.test(email)) {
      showToastWarning("Email Does Not Match .edu Pattern", "regEmailWarning")
      err = true;
    }
    if (password !== confirmPassword) {
      showToastWarning("Password do not match", "regPassWarning")
      err = true;
    }
    return err
  }

  const resetStates = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPfp({})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validate()) {
      try {
        const pic = pfp.value;
        await register({firstName, lastName, email, password, pfp: pic}).unwrap();
        resetStates();
        showToastSuccess("Created Account, Check Email for Verification Link", "regSuccess")
      } catch(err) {
        showToastError(err, "regServerErr")
      }
    }
  };

  return (

    <div className={styles.container}>
      <h2 style={{marginBottom: "2rem"}}>Register</h2>
      
    <Form className={styles.formCont} onSubmit={handleSubmit} id='registerForm'>
        <div className={styles.sameLine}>
            <TextInput placeholder={"Ex: John"} label={"First Name*"} state={firstName} onChange={setFirstName} name={"firstName"} required={true} maxChar={20} tip={"No Numbers or Special Symbols"} minLength={2}/>
            <TextInput placeholder={"Ex: Doe"} label={"Last Name*"} state={lastName} onChange={setLastName} name={"lastName"} required={true} maxChar={20} tip={"No Numbers or Special Symbols"} minLength={2}/>
          <PictureSelect setPfp={setPfp} pfp={pfp}/>
        </div>

        <TextInput placeholder={"Email"} label={"Email*"} state={email} onChange={setEmail} name={"email"} required={true} maxChar={50} tip="Must be in the format: example@school.edu"/>
       
        <PasswordInput placeholder={"Password"} label={"Password"} state={password} onChange={setPassword} name={"password"}  tip={"Must be Eight Characters Or Longer"} />
        <PasswordInput placeholder={"Re-Type Password"} label={"Confirm Password*"} state={confirmPassword} onChange={setConfirmPassword} name={"r-password"} tip={"Must Match Password"}/>
        
        <div className={styles.regLinks}>
          <ResendEmailModal/>
          <Link className={styles.link} to={"/login"}>Already Have An Account?</Link>
        </div>
        {isLoading && <Loader/>}
        <GeneralButton name={"Create Account"} type={"submit"}/> 
    </Form>

    </div>
    
  )
}

export default RegisterForm
