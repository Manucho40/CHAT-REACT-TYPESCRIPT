import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import ChatContent from '../components/chatComponents/ChatContent';
import DefaultChatContent from '../components/chatComponents/DefaultChatContent';
import NamesList from '../components/chatComponents/NamesList';
import { UserList } from '../types/UserList';

const Chat : FC = () => {

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

  const changeChat = (currentContact:UserList) => {
    setCurrentContact(currentContact)
        setIsNotSelect(true)
        console.log(currentContact)
  }
  const handleMenu = () => {
    setOpenMenu(!openMenu);
}

useEffect(() => {
  if(typeof(storage) == "string"){
    setUserConnect(JSON.parse(storage))
    const idUserConnect = JSON.parse(storage)._id;
    axios.get(`http://localhost:8080/api/users/${idUserConnect}`)
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
const handleSendMsg = async (msg:string) => {
     await axios.post("http://localhost:8080/api/messages/addmsg", {
      from: userConnect._id,
      to: currentContact._id,
      message: msg,
      
     })
}
  return (
    <div className="chat">
      <NamesList contacts={contacts} userConnect={userConnect}  currentContact={currentContact}  changeChat={changeChat}/>
      {
        isNotSelect === false ?
        (              
        <DefaultChatContent />
        ):
        <ChatContent handleMenu={handleMenu} handleSendMsg={handleSendMsg} userConnect={userConnect}  currentContact={currentContact} />

      }
    </div>
  )
}


export default Chat;
