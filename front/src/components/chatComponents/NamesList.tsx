import React, { FC, useEffect, useState } from 'react'
import { Input } from 'antd';
import { UserList } from '../../types/UserList';



const { Search } = Input;
const onSearch = (value: string) => console.log(value);
export interface ContactsProps{
  contacts: UserList[];
  currentContact: UserList;
  changeChat: (item: UserList) => void;
  userConnect: UserList
}
export const pseudoFirstLetterMaj = (pseudo:string) => {
  let first = '';
  let sup = '';
    for(let i = 0; i < pseudo.length; i++){
    first = pseudo[0].toUpperCase();
      sup = first + pseudo.slice(1)
    }
    return sup

}

const NamesList : FC<ContactsProps> = ({contacts, currentContact, changeChat, userConnect}, ) => {
  const [currIndex, setCurrIndex] = useState<number>(0);



 

  return (
    <div className='namesList' id='nameliste'>
      <div className='searchName'>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      </div>
      <ul className='ulname'> 
         {
          contacts.map((item, index) => 
            <li key={index} className={`userList ${index === currIndex  ? "selectTalk" : ""}`}  onClick={() => {setCurrIndex(index); changeChat(item)}}>
            <img src={item.avatar} alt="" />
            <div className='userListInfo'>
              <span className='userListName'>{pseudoFirstLetterMaj(item.pseudo)}</span>
              <span className='userListName'>Online</span>
            </div>
          </li>
            
          )
         }
          
      </ul>
      <div className="userConnecter">
        <img src={userConnect.avatar} alt="" />
        <span>{pseudoFirstLetterMaj(userConnect.pseudo)}</span>
        
      </div>   
    </div>
  )
}

export default NamesList;