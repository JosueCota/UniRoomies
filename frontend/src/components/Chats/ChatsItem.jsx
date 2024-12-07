import React from 'react'

const ChatsItem = ({user, message}) => {
  return (
    <div onClick={() => setSelectedChat(chat.chat_id)}>
                <ProfilePic num={user.pfp}/>
                <p>{user.firstName} {user.lastName}</p>
                <p>{chat.Messages[0] && chat.Messages[0].message}</p>
    </div>
 
  )
}

export default ChatsItem
