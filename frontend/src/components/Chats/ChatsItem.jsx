import React from 'react'
import ProfilePic from "../ProfilePic"
import { Link } from 'react-router-dom'
import styles from "./chatsitem.module.css"
import { useChangeHideChatMutation } from '../../features/chatApiSlice'
import { MdClose } from 'react-icons/md'

const ChatsItem = ({user, message, setSelectedChat, selectedChat, chatId}) => {

  const [hideChat] = useChangeHideChatMutation();

  const handleClick = () => {
    hideChat({chatId: chatId})
    setSelectedChat(null)
  }

  return (
    <Link to={`chat/${chatId}/${user.id}`} onClick={() => setSelectedChat(chatId)} style={{backgroundColor: selectedChat && selectedChat===chatId && "whitesmoke", }} className={`${styles.chats} ${selectedChat && selectedChat===chatId && styles.chatsActive}`}>
        <ProfilePic num={user.pfp}/>
      <div>
        <p>{user.firstName} {user.lastName}</p>
        <p>Last Message: {message}</p>
      </div>
      <MdClose style={{position:"absolute", zIndex:200}} onClick={handleClick}/>
    </Link>
 
  )
}

export default ChatsItem
