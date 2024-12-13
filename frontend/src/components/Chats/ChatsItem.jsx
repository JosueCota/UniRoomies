import React from 'react'
import ProfilePic from "../ProfilePic"
import { Link } from 'react-router-dom'
import styles from "./chatsitem.module.css"
import { useChangeHideChatMutation } from '../../features/chatApiSlice'
import { MdClose } from 'react-icons/md'
import { FaDotCircle } from "react-icons/fa";

//An Item of the Users Current Open (not hidden) Chats
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
      <Link to={`chat/${chatId}/${user.id}`} onClick={() => setSelectedChat(chatId)} style={{backgroundColor: selectedChat && selectedChat===chatId && "whitesmoke", }} className={`${styles.chats} ${selectedChat && selectedChat===chatId && styles.chatsActive}`} key={`${chatId}link`}>
        {seen !== true && <FaDotCircle color='red' style={{position:"absolute"}} size={15} key={`${chatId}unread`}/>}
        <ProfilePic num={user.pfp} style={styles.pfp} key={`${chatId}pfp`}/>
        <div key={`${chatId}div1`} style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
          <div key={`${chatId}div2`}>
            <p className={styles.name} key={`${chatId}name`}>{user.firstName} {user.lastName}</p>
            <p className={styles.lastMessage} key={`${chatId}lastMsg`}><span className={styles.hide} key={`${chatId}span`}>Last Message: </span>{message}</p>
          </div>
          <MdClose style={{justifySelf:"end",position:"relative", zIndex:200, border: "1px solid", borderRadius:"1rem"}} onClick={handleClick} key={`${chatId}X`} />
        </div>
      </Link> 
  )
}

export default ChatsItem
