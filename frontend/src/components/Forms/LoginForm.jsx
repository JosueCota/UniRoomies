import React from 'react'
import TextInput from './TextInput'
import SubmitBtn from './SubmitBtn'
import styles from "./form.module.css"
import { Link } from 'react-router-dom'

const LoginForm = () => {
  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <TextInput placeholder={"Email"} label={"Email"} state={null} onChange={null} name={"email"} required={true}type={"text"}/>      
      <TextInput placeholder={"Password"} label={"Password"} state={null} onChange={null} name={"password"} required={true} hidden={true} type={"password"}/>
      <Link className={styles.link} to={"/register"}>Create an Account</Link>
      <SubmitBtn name={"Login"} action={null}/>
    </div>
  )
}

export default LoginForm
