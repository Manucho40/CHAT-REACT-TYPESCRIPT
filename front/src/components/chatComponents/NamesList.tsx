import React, { useEffect, useState } from 'react'
import { Input } from 'antd';
import axios from 'axios';
import { UserList } from '../../types/UserList';
// import { User } from '../../types/User';



const { Search } = Input;
const onSearch = (value: string) => console.log(value);
const avatarMen = [
  {
    id: 1,
    link: "https://www.bootdey.com/img/Content/avatar/avatar1.png"
  },
  {
    id: 2,
    link: "https://www.bootdey.com/img/Content/avatar/avatar2.png"
  },
  {
    id: 3,
    link: "https://www.bootdey.com/img/Content/avatar/avatar3.png"
  },
  {
    id: 3,
    link: "https://www.bootdey.com/img/Content/avatar/avatar4.png"
  }
]

const NamesList = () => {
  const [contacts, setContacts] = useState<UserList[]>([]);
  const storage: string | null = localStorage.getItem('user');
  
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
  console.log(contacts);
  
    const namelist = document.getElementById('nameliste') as HTMLElement;
    const pseudoFirstLetterMaj = (pseudo:string) => {
      let first = '';
      let sup = '';
        for(let i = 0; i < pseudo.length; i++){
        first = pseudo[0].toUpperCase();
          sup = first + pseudo.slice(1)
        }
        return sup

    }

  // const selectTalk = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   li.classList.toggle('selectTalk');
  //   console.log(e.target)
  // }

 

  return (
    <div className='namesList' id='nameliste'>
      <div className='searchName'>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      </div>
      <ul className='ulname'> 
         {
          contacts.map((item) => 
            <li key={item._id} className='userList' >
            <img src={item.avatar} alt="" />
            <div className='userListInfo'>
              <span className='userListName'>{pseudoFirstLetterMaj(item.pseudo)}</span>
              <span className='userListName'>Online</span>
            </div>
          </li>
            
          )
         }
          
      </ul>

    </div>
  )
}

export default NamesList;