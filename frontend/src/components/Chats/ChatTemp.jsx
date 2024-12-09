import React from 'react'
import styles from "./chat.module.css"
import Loader from '../Misc/Loader'

const ChatTemp = () => {
    
  return (
    <div className={styles.chatbox} style={{width:"80%", overflow:"hidden", margin:"auto"}}>
      <p style={{margin:"auto", fontSize:"1.5rem", fontWeight:"800"}}>No Chat Selected</p>
      <Loader/>
    </div>
  )
}

export default ChatTemp
