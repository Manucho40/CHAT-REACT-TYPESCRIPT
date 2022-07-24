import React from 'react'
import { Input, Space } from 'antd';


const { Search } = Input;
const onSearch = (value: string) => console.log(value);
const NamesList = () => {
  return (
    <div className='namesList'>
      <div className='searchName'>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      </div>
      <ul className='ulname'> 
            <li className='userList'>
              <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" />
              <div className='userListInfo'>
                <span className='userListName'>Kaelou Baudouin</span>
                <span className='userListName'>Online</span>
              </div>
            </li>
            <li className='userList'>
              <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" />
              <div className='userListInfo'>
                <span className='userListName'>Kaelou Bertrand</span>
                <span className='userListName'>Online</span>
              </div>
            </li>
            <li className='userList'>
              <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" />
              <div className='userListInfo'>
                <span className='userListName'>An Emmanuel</span>
                <span className='userListName'>Online</span>
              </div>
            </li>
            <li className='userList'>
              <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" />
              <div className='userListInfo'>
                <span className='userListName'>An Emmanuel</span>
                <span className='userListName'>Online</span>
              </div>
            </li>
          
      </ul>

    </div>
  )
}

export default NamesList;