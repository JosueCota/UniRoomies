import React from 'react'
import styles from "./chat.module.css"
import { InputGroup } from 'react-bootstrap'
import GeneralButton2 from '../Forms/GeneralButton2'

//Responsible for the form ui in the chat
const ChatForm = ({message, setMessage, sendMessage}) => {
  return (
    <InputGroup className={styles.form}>
                <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Message' onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}></input>
                <GeneralButton2 type={"button"} name={"Send"} onClick={sendMessage}/>
    </InputGroup>
  )
}

export default ChatForm
