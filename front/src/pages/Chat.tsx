import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import ChatContent from '../components/chatComponents/ChatContent';
import NamesList from '../components/chatComponents/NamesList';
import { UserList } from '../types/UserList';

const Chat : FC = () => {


  const [openMenu, setOpenMenu] = useState(false);
  const [contacts, setContacts] = useState<UserList[]>([]);
  const storage: string | null = localStorage.getItem('user');
  const [contact, setContact] = useState<UserList>({
    _id: "",
    pseudo: "",
    email: "",
    avatar: ""
  })

  const changeChat = (contact:UserList) => {
        setContact(contact)
        console.log(contact)
  }
  const handleMenu = () => {
    setOpenMenu(!openMenu);
}

useEffect(() => {
  if(typeof(storage) == "string"){
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

  return (
    <div className="chat">
      <NamesList contacts={contacts} contact={contact} changeChat={changeChat}/>
      <ChatContent handleMenu={handleMenu} contacts={contacts} contact={contact}/>
    </div>
  )
}


export default Chat;
