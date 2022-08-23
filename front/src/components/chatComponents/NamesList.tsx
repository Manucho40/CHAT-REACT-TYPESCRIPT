import React, { useEffect, useState } from 'react'
import { Input } from 'antd';
import axios from 'axios';
import { User } from '../../types/User';


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
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const NamesList = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
     axios.get('http://localhost:8080/api/user')
        .then((response) => response.data)
        .then((data) => {
           setUsers(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
  }, []);

  const pseudoFirstLetterMaj = (pseudo:string) => {
    let first = '';
    let sup = '';
      for(let i = 0; i < pseudo.length; i++){
       first = pseudo[0].toUpperCase();
        sup = first + pseudo.slice(1)
      }
      return sup
  }

 

  return (
    <div className='namesList'>
      <div className='searchName'>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      </div>
      <ul className='ulname'> 
         {
          users.map((item) => 
            <li key={item._id} className='userList'>
            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" />
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