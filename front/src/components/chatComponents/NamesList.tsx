import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Input } from "antd";
import { UserList } from "../../types/UserList";
import { FaPowerOff } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { deconnexion, reset } from "../../features/userSlice";
import axios from "axios";
import { User } from "../../types/User";
import { useNavigate } from "react-router-dom";

export interface ContactsProps {
  contacts: UserList[];
  currentContact: UserList;
  changeChat: (item: UserList) => void;
  userConnect: UserList;
}
export const pseudoFirstLetterMaj = (pseudo: string) => {
  let first = "";
  let sup = "";
  for (let i = 0; i < pseudo.length; i++) {
    first = pseudo[0].toUpperCase();
    sup = first + pseudo.slice(1);
  }
  return sup;
};

const NamesList: FC<ContactsProps> = ({
  contacts,
  currentContact,
  changeChat,
  userConnect,
}) => {
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [resultSearch, setResultSearch] = useState<User[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const deconnecter = () => {
    dispatch(deconnexion());
    dispatch(reset());
    navigate("/connexion");
  };

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValueSearch(value);
  };

  useEffect(() => {
    try {
      axios
        .get(
          "https://kae-chat-api.onrender.com/api/users?pseudo=" + valueSearch
        )
        .then((res) => setResultSearch([...res.data]));
    } catch (error) {
      console.log(error);
    }
  }, [valueSearch]);

  return (
    <div className="namesList" id="nameliste">
      <div className="searchName">
        <Input placeholder="Saisissez le pseudo..." onChange={onSearch} />
      </div>
      <ul className="ulname">
        {valueSearch
          ? resultSearch.map((item, index) => (
              <li
                key={index}
                className={`userList ${
                  index === currIndex ? "selectTalk" : ""
                }`}
                onClick={() => {
                  setCurrIndex(index);
                  changeChat(item);
                }}
              >
                <img src={item.avatar} alt="" />
                <div className="userListInfo">
                  <span className="userListName">
                    {pseudoFirstLetterMaj(item.pseudo)}
                  </span>
                  <span className="userListName">Online</span>
                </div>
              </li>
            ))
          : contacts.map((item, index) => (
              <li
                key={index}
                className={`userList ${
                  index === currIndex ? "selectTalk" : ""
                }`}
                onClick={() => {
                  setCurrIndex(index);
                  changeChat(item);
                }}
              >
                <img src={item.avatar} alt="" />
                <div className="userListInfo">
                  <span className="userListName">
                    {pseudoFirstLetterMaj(item.pseudo)}
                  </span>
                  <span className="userListName">Online</span>
                </div>
              </li>
            ))}
      </ul>
      <div className="userConnecter">
        <div>
          <img src={userConnect.avatar} alt="" />
          <span>{pseudoFirstLetterMaj(userConnect.pseudo)}</span>
        </div>
        <FaPowerOff className="decon" onClick={deconnecter} size={28} />
      </div>
    </div>
  );
};

export default NamesList;
