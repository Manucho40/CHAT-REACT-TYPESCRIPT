import React, { FC, useEffect, useState } from 'react'
import ChatContent from '../components/chatComponents/ChatContent';
import NamesList from '../components/chatComponents/NamesList';

const Chat : FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenu = () => {
    setOpenMenu(!openMenu);
}
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
      <NamesList />
      <ChatContent handleMenu={handleMenu} />
    </div>
  )
}


export default Chat;
