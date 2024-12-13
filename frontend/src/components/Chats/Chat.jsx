import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { useOutletContext, useParams } from 'react-router-dom'
import { useGetMessagesQuery } from '../../features/chatApiSlice'
import styles from "./chat.module.css"
import Loader from '../Misc/Loader'
import ChatForm from './ChatForm'
import ChatBox from './ChatBox'

//Responsible for all socket communication in chat, displays ui components 
const Chat = () => {
    //Exitting out of chat
    const { setSelectedChat }= useOutletContext();

    //Chat Id for Message API Req, To Id for Socket Connection
    const { chat_id, to_id } = useParams();
    const { data, isFetching } = useGetMessagesQuery({chatId:chat_id})
    const {user: self} = useSelector((state)=> state.auth)
    
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState();
    const [other, setOther] = useState(null);
  
    //Gets old messages on load 
    useEffect(()=> {
        if (!data) return
        setMessages(data && data.messages? data.messages.map(message => message): [])
    }, [data]);

    //Scrolls down into last message
    useEffect(()=> {
        scrolling()
    }, [messages])

    //Connects socket and sets it
    useEffect(()=> {
        const socket = io.connect(import.meta.env.VITE_BACKEND_URL, {query: {user_id: self.id, to_id: to_id}})
        setSocket(socket);

        return () => {
            socket.disconnect();
        }
    }, [chat_id, to_id]);

    //Socket listener
    useEffect(() => {
        if (socket===null) return
        socket.on("message", (data) => {
            appendMessage(data, to_id)
        });

        socket.on("getOther", (data) => {
            setOther(data);
        })

        socket.on("connect_error", () => {
            socket.connect();
        })

        socket.on("disconnect", (reason) => {
            if (reason === "io server disconnect") {
              // the disconnection was initiated by the server, you need to reconnect manually
              socket.connect();
            }
          });

    }, [socket]);

    const scrolling = () => {
        const messages = document.getElementById("chatbox")
        if (messages){
            messages.scrollTop = messages.scrollHeight;
        }
            
    }
    const appendMessage = (data, id) => {
        if (id) {
            if (data) {
                setMessages(prev => [...prev, {message: data, sender_id: id}])
            }
        } else {
            setMessages(prev => [...prev, data])
        }
    }; 

    const sendMessage = (e) => {
        e.preventDefault()
        if (message &&  socket) {
            appendMessage(message, self.id)
            socket.emit("message", message)
            setMessage("")
        }
    };

  if (isFetching) {
        return <Loader/>
  }

  return (
    <div className={styles.chatContainer}>
        <p className={styles.name}>{other!==null && `${other[0]} ${other[1]}`} </p>
        <ChatBox setSelectedChat={setSelectedChat} id={self.id} messages={messages} />
        <ChatForm message={message} setMessage={setMessage} sendMessage={sendMessage}/>
    </div>
  )
}

export default Chat
