import React, { useState } from 'react'
import { useGetChatsQuery } from '../../features/chatApiSlice'
import Loader from "../Misc/Loader"
import ProfilePic from "../ProfilePic"

const Chats = () => {

  const { data, isFetching } = useGetChatsQuery()

  //uses chat_id
  const [selectedChat, setSelectedChat] = useState(null);

  console.log(selectedChat)

  return (
    <div>
        <ul>
          {data && !isFetching? 
            data.map(chat => {
              const user = chat.Chat_Participants[0].User
              return (
              <div onClick={() => setSelectedChat(chat.chat_id)}>
                <ProfilePic num={user.pfp}/>
                <p>{user.firstName} {user.lastName}</p>
                <p>{chat.Messages[0] && chat.Messages[0].message}</p>

              </div>
              )})
            : <Loader/>
          }
        </ul>
    </div>
  )
}

export default Chats
