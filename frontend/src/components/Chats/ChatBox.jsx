import React from 'react'
import styles from "./chat.module.css"
import { IoMdClose } from "react-icons/io";

//Responsible for the chatbox ui
const ChatBox = ({setSelectedChat, messages, id}) => {
  return (
    <div className={styles.chatbox} id='chatbox'>
        <div style={{position:"sticky", left:"99%", top:"0px", width:"fit-content", height:"fit-content", backgroundColor:"#333", borderRadius:"2rem", lineHeight:"0px"}} onClick={() => setSelectedChat(null)}>
            <IoMdClose size={30} color='white'/>
        </div>
        {messages.length >=1 && messages.map(m => (
            <p className={`${m.sender_id === id? styles.me: styles.recipient} ${styles.message}`}>
            <p className={styles.messageContent}>{m && m.message}</p></p>
        ))}
    </div>
  )
}

export default ChatBox
