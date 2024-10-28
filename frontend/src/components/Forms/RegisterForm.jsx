import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import SubmitBtn from './SubmitBtn';
import styles from "./form.module.css";
import { Link, useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import { useSelector} from "react-redux";
import { useRegisterMutation } from '../../features/usersApiSlice';
import { toast } from 'react-toastify';
import Loader from '../Loader';
import ResendEmailModal from './ResendEmailModal';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      toast.error( "Make Sure Name Does Not Contain Numbers or Special Characters other than '-'", {toastId: "regNameErr"})
      err = true;
    }
    if (!emailPattern.test(email)) {
      toast.error("Email Does Not Match .edu Pattern", {toastId: "regEmailErr"})
      err = true;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {toastId: "regPassErr"});
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
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (validate()) {
      console.log("Error with Submission");
    } else {
      try {
        await register({firstName, lastName, email, password}).unwrap();
        resetStates();
        toast.success("Created Account, Check Email for Verification Link", {toastId: "regSuccess"});
      } catch(err) {
        toast.error(err?.data?.message || err.error, {toastId: "regServerErr"});
      }
    }
  };

  return (

    <div className={styles.container}>
      <h2 style={{marginBottom: "2rem"}}>Register</h2>
      
    <Form className={styles.formCont} onSubmit={handleSubmit}>
        <div className={styles.sameLine}>
            <TextInput placeholder={"Ex: John"} label={"First Name*"} state={firstName} onChange={setFirstName} name={"firstName"} required={true} maxChar={20} tip={"No Numbers or Special Symbols"} minLength={2}/>
            <TextInput placeholder={"Ex: Doe"} label={"Last Name*"} state={lastName} onChange={setLastName} name={"lastName"} required={true} maxChar={20} tip={"No Numbers or Special Symbols"} minLength={2}/>
        </div>

        <TextInput placeholder={"Email"} label={"Email*"} state={email} onChange={setEmail} name={"email"} required={true} maxChar={50} tip="Must be in the format: example@school.edu"/>
        <TextInput placeholder={"Password"} label={"Password*"} state={password} onChange={setPassword} name={"password"} required={true} type={"password"} maxChar={50} tip={"Must be Eight Characters Or Longer"} minLength={8}/>
        <TextInput placeholder={"Re-Type Password"} label={"Confirm Password*"} state={confirmPassword} onChange={setConfirmPassword} name={"r-password"} required={true} type={"password"} maxChar={50} tip={"Must Match Password"}/>
        <div className={styles.regLinks}>
          <ResendEmailModal/>
          <Link className={styles.link} to={"/login"}>Already Have An Account?</Link>
        </div>
        {isLoading && <Loader/>}
        <SubmitBtn name={"Create Account"} /> 
    </Form>

    </div>
    
  )
}

export default RegisterForm
