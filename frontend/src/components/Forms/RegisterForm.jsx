import React, { useState, useEffect } from 'react'
import TextInput from './TextInput'
import SubmitBtn from './SubmitBtn'
import styles from "./form.module.css"
import { Link, useNavigate } from 'react-router-dom'
import Form from "react-bootstrap/Form"
import { useDispatch, useSelector} from "react-redux";
import { useRegisterMutation } from '../../features/usersApiSlice'
import { toast } from 'react-toastify'
import Loader from '../Loader'

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate();
  const {userInfo} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [register, {isLoading}] = useRegisterMutation(); 

  useEffect(() => {
    if (userInfo) {
      navigate("/roommates")
    }
  }, [navigate, userInfo]);

  const validate = () => {
    const emailPattern= /^[a-zA-Z0-9._-]{3,}@[a-zA-Z.]{2,}?.edu$/;
    const namePattern = /^[a-zA-Z-]{2,}$/;
    let err = false
    if (!namePattern.test(firstName) || !namePattern.test(lastName)){
      toast.error( "Make Sure Name Does Not Contain Numbers or Special Characters other than '-'")
      err = true;
    }
    if (!emailPattern.test(email)) {
      toast.error("Email Does Not Match .edu Pattern")
      err = true;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
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
      console.log("Error with Submission")
    } else {
      try {
        await register({firstName, lastName, email, password});
        resetStates();

      } catch(err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (

    <div className={styles.container}>
      <h2 style={{marginBottom: "2rem"}}>Register</h2>
      
    <Form className={styles.formCont} onSubmit={handleSubmit}>
        <div className='row g-3' style={{display: "flex", flexFlow:"row", width:"90%", justifyContent:"center", textAlign:"center"}}>
            <TextInput placeholder={"Ex: John"} label={"First Name"} state={firstName} onChange={setFirstName} name={"firstName"} required={true} maxChar={20} tip={"No Numbers or Special Symbols"} minLength={2}/>
            <TextInput placeholder={"Ex: Doe"} label={"Last Name"} state={lastName} onChange={setLastName} name={"lastName"} required={true} maxChar={20} tip={"No Numbers or Special Symbols"} minLength={2}/>
        </div>

        <TextInput placeholder={"Email"} label={"Email"} state={email} onChange={setEmail} name={"email"} required={true} maxChar={50} tip="Must be in the format: example@school.edu"/>
        <TextInput placeholder={"Password"} label={"Password"} state={password} onChange={setPassword} name={"password"} required={true} type={"password"} maxChar={50} tip={"Must be Eight Characters Or Longer"} minLength={8}/>
        <TextInput placeholder={"Re-Type Password"} label={"Confirm Password"} state={confirmPassword} onChange={setConfirmPassword} name={"r-password"} required={true} type={"password"} maxChar={50} tip={"Must Match Password"}/>

        <Link className={styles.link} to={"/login"}>Already Have An Account?</Link>
        {isLoading && <Loader/>}
        <SubmitBtn name={"Create Account"} />
    </Form>

    </div>
    
  )
}

export default RegisterForm
