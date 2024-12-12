import React, { useEffect, useState } from 'react'
import { useGetChatsQuery } from '../../features/chatApiSlice'
import Loader from "../Misc/Loader"
import ChatsItem from './ChatsItem'
import { Outlet } from 'react-router-dom'
import styles from "./chats.module.css"
import ChatTemp from './ChatTemp'
import { apiSlice } from '../../features/apiSlice'
import { useDispatch } from 'react-redux'

const Chats = () => {
  const { data, isFetching } = useGetChatsQuery()
  const dispatch = useDispatch();

  //uses chat_id
  const [selectedChat, setSelectedChat] = useState(null);
  
  useEffect(() => {
    dispatch(apiSlice.util.invalidateTags(["Messages", "Chats"]))  
  }, [selectedChat])


  return (
    <div className={styles.container}>
        <div className={styles.chatsContainer}>
          {data && !isFetching?
            data.chats.map((chat, ind) => {
              const user = data.recipients[ind].User
              return <ChatsItem user={user} message={chat.Messages[0]? chat.Messages[0].message: "No Messages..."} setSelectedChat={setSelectedChat} selectedChat={selectedChat} chatId={chat.chat_id} seen={chat.Chat_Participants[0].seen}/>
              })
            : <Loader/>
          }
          {
            data && data.chats.length === 0 && 
            <p className={styles.warning}><p><strong>Notice</strong></p>Go to a users profile and send a message for this to fill up with chats! <p><strong>Note:</strong> Some chats may be hidden if you clicked on the top left X. They are recoverable by finding the user and sending a message again, all messages will be restored as well!</p></p>
          }
        </div>
        <div className={styles.chatContainer}>
          {
            selectedChat? 
            <Outlet context={{setSelectedChat}} /> :
            <ChatTemp/>
          }
        </div>
    </div>
  )
}

export default Chats
