import axios from 'axios';
import React, { FC, useEffect, useState, useRef } from 'react'
import ChatContent, { Message } from '../components/chatComponents/ChatContent';
import DefaultChatContent from '../components/chatComponents/DefaultChatContent';
import NamesList from '../components/chatComponents/NamesList';
import { UserList } from '../types/UserList';
import { io } from "socket.io-client";


const Chat : FC = () => {
  const socket = useRef() as any; 
  const [arrivalMessage, setArrivalMessage] = useState<Message>();
  const [userConnect, setUserConnect] = useState<UserList>({
    _id: "",
    pseudo: "",
    email: "",
    avatar: ""

  })
  const [openMenu, setOpenMenu] = useState(false);
  const [contacts, setContacts] = useState<UserList[]>([]);
  const storage: string | null = localStorage.getItem('user');
  const [isNotSelect, setIsNotSelect] = useState<boolean>(false)
  const [currentContact, setCurrentContact] = useState<UserList>({
    _id: "",
    pseudo: "",
    email: "",
    avatar: ""
  })

  const [messages, setMessages] = useState<Message[]>([])

  const changeChat = (currentContact:UserList) => {
    setCurrentContact(currentContact)
        setIsNotSelect(true)
  }
  const handleMenu = () => {
    setOpenMenu(!openMenu);
}

useEffect(() => {
  if(typeof(storage) == "string"){
    setUserConnect(JSON.parse(storage))
    const idUserConnect = JSON.parse(storage)._id;
    axios.get(`http://dev.tchat.kae-dev.com/api/users/${idUserConnect}`)
    .then((response) => response.data)
    .then((data) => {
      setContacts(data);
       return true
    })
    .catch((err) => {
       console.log(err.message);
       return false
    });
  }else{
    console.log("storage is null")
  }
  
}, []);
 
useEffect(() => {
  const nameclasse = document.getElementById("nameliste") as HTMLElement;
  if(openMenu){
    nameclasse.classList.remove("namesList");
    nameclasse.classList.add("openMenu");
  }else{
    nameclasse.classList.remove("openMenu");
    nameclasse.classList.add("namesList");
    
  }
}, [openMenu])

//CHATCONTENT
useEffect( () => {
  const getMessage = async () => {
    const res = await axios.post("http://dev.tchat.kae-dev.com/api/messages/getmsg", {
      from: userConnect._id,
      to: currentContact._id,
    });
    setMessages(res.data);
  }
  if(currentContact){

    getMessage()
  }

}, [currentContact])

useEffect(() => {
  if(userConnect){
    socket.current = io("http://dev.tchat.kae-dev.com/");
    socket.current.emit("add-user", userConnect._id) 
  }
}, [userConnect])






const handleSendMsg = async (msg:string) => {
     await axios.post("http://localhost:8080/api/messages/addmsg", {
      from: userConnect._id,
      to: currentContact._id,
      message: msg,
     });
     socket.current.emit("send-msg", {
      to: currentContact._id,
      from: userConnect._id,
      message: msg
     })

     const msgs: Message[] = [...messages];
     msgs.push({fromSelf: true, message: msg})
     setMessages(msgs);
}
useEffect(() => {
  if(socket.current){
    socket.current.on("msg-recieve", (msg: string) => {
      setArrivalMessage({fromSelf: false, message: msg})
    });
  }
})

useEffect(() => {
  arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
}, [arrivalMessage])


  return (
    <div className="chat">
      <NamesList 
        contacts={contacts} 
        userConnect={userConnect}  
        currentContact={currentContact}  
        changeChat={changeChat}/>
      {
        isNotSelect === false ?
        (              
        <DefaultChatContent  handleMenu={handleMenu}/>
        ):
        <ChatContent 
          handleMenu={handleMenu} 
          messages={messages} 
          handleSendMsg={handleSendMsg} 
          userConnect={userConnect}  
          currentContact={currentContact} 
          socket={socket}
          />

      }
    </div>
  )
}


export default Chat;
