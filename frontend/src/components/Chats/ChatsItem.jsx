import React from 'react'
import ProfilePic from "../ProfilePic"
import { Link } from 'react-router-dom'
import styles from "./chatsitem.module.css"
import { useChangeHideChatMutation } from '../../features/chatApiSlice'
import { MdClose } from 'react-icons/md'
import { FaDotCircle } from "react-icons/fa";

const ChatsItem = ({user, message, setSelectedChat, selectedChat, chatId, seen}) => {

  const [hideChat] = useChangeHideChatMutation();

  const handleClick = () => {
    hideChat({chatId: chatId})
    setSelectedChat(null)
  }

  const cutText = () => {
    message = `${message.substring(0,12)}...`
  }

  cutText();

  return (
      <Link to={`chat/${chatId}/${user.id}`} onClick={() => setSelectedChat(chatId)} style={{backgroundColor: selectedChat && selectedChat===chatId && "whitesmoke", }} className={`${styles.chats} ${selectedChat && selectedChat===chatId && styles.chatsActive}`}>
          {seen !== true && <FaDotCircle color='red' style={{position:"absolute"}} size={15}/>}
          <ProfilePic num={user.pfp} style={styles.pfp}/>
          <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
            
        <div>
          <p className={styles.name}>{user.firstName} {user.lastName}</p>
          <p className={styles.lastMessage}><span className={styles.hide}>Last Message: </span>{message}</p>
        </div>
        <MdClose style={{justifySelf:"end",position:"relative", zIndex:200, border: "1px solid", borderRadius:"1rem"}} onClick={handleClick}/>
          </div>
      </Link> 
  )
}

export default ChatsItem
