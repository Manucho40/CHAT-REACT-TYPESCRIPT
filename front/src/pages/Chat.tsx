import React, { FC } from 'react'
import ChatContent from '../components/chatComponents/ChatContent';
import NamesList from '../components/chatComponents/NamesList';

const Chat : FC = () => {
  return (
    <div className="chat">
      <NamesList />
      <ChatContent />
    </div>
  )
}


export default Chat;
