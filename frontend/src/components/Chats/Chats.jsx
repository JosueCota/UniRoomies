import React, { useEffect, useState } from 'react'
import GeneralButton2 from "../Forms/GeneralButton2"
import { useSelector } from "react-redux"

const Chats = () => {
    
    const {user: self} = useSelector((state)=> state.auth)
    const socket = io.connect("http://localhost:8081", {query: {user_id: self.id}})
    
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState();
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        socket.on("receive_message", (data) => {
            alert(data.message)
        })
    }, [socket])

    socket.on("message", (data) => {
        setMessages(prev => [...prev, data])
    });

    socket.on("activity", (user) => {
        setUser(user);    
    })

    const sendMessage = (e) => {
        setUser(null)
        e.preventDefault()
        if (message) {
            socket.emit("message", message)
            setMessage("")
        }
    }
  return (
    <div>
        
        <div>
            {messages.map(m => (<li>{m}</li>))}
        </div>
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Message'></input>
            <GeneralButton2 type={"button"} name={"Send"} onClick={sendMessage}/>
        <p>{user && `${user} is typing...`}</p>
    </div>
  )
}

export default Chats
