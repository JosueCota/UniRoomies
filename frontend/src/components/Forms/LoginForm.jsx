import React from 'react'
import TextInput from './TextInput'
import SubmitBtn from './SubmitBtn'

const LoginForm = () => {
  return (
    <div>
      <TextInput placeholder={"Email"} label={"Email"} state={null} onChange={null} name={"email"}/>
      <SubmitBtn name={"Login"} action={null}/>
    </div>
  )
}

export default LoginForm
