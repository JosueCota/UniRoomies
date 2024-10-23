import React from 'react'
import TextInput from './TextInput'
import SubmitBtn from './SubmitBtn'
import styles from "./form.module.css"
import { Link } from 'react-router-dom'

const RegisterForm = () => {
  return (

    <div className={styles.container}>
      <h2>Register</h2>

      <div className='row g-4'>
          <TextInput placeholder={"First Name"} label={"First Name"} state={null} onChange={null} name={"firstName"} required={true} maxChar={20}/>
          <TextInput placeholder={"Last Name"} label={"Last Name"} state={null} onChange={null} name={"lastName"} required={true} maxChar={20}/>
      </div>
      
      <TextInput placeholder={"Email"} label={"Email"} state={null} onChange={null} name={"email"} required={true} maxChar={50}/>
      <TextInput placeholder={"Password"} label={"Password"} state={null} onChange={null} name={"password"} required={true} type={"password"} maxChar={50}/>
      <TextInput placeholder={"Re-Type Password"} label={"Confirm Password"} state={null} onChange={null} name={"r-password"} required={true} type={"password"} maxChar={50}/>
      <Link className={styles.link} to={"/login"}>Already Have An Account?</Link>
      <SubmitBtn name={"Create Account"} action={null}/>

    </div>
    
  )
}

export default RegisterForm
