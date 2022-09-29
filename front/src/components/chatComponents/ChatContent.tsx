import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { deconnexion, reset } from '../../features/userSlice';
import { AppDispatch } from '../../app/store';
import { FaAlignJustify, } from 'react-icons/fa';
import { UserList } from '../../types/UserList';
import { pseudoFirstLetterMaj } from './NamesList';

type Props = { 
    handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
    currentContact: UserList;
    userConnect: UserList;
    handleSendMsg: (event: string) => void;
    messages: Message[];
    socket: any
  };

export interface Message {
  fromSelf: boolean,
  message: string
}

  const date = new Date();
  const defaultImg = "data:image/png;base64,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"
type SizeType = Parameters<typeof Form>[0]['size'];
const ChatContent = ({handleMenu, currentContact, userConnect, handleSendMsg, messages, socket} : Props) => {

    const [msg, setMsg] = useState<string>("");
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
      setComponentSize(size);
    };
    const data = `<li className="clearfix user">
    <div className="message-data">
        <span className="message-data-time">10:15 AM, Today</span>
    </div>
    <div className="message my-message">Projecthjf has been already finished and I have results to show you.</div>
    </li>`;
    console.log(messages)
    function scrollToBottom() {
        const el = document.getElementById("messageContentUl") as HTMLElement;
          el.scrollTop = el.scrollHeight;
      }
      const sendMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        // event.preventDefault();
        if(msg.length > 0){
          handleSendMsg(msg);
          setMsg('')
          console.log("belelou");
          
        }
      
      };

    const dispatch = useDispatch<AppDispatch>();
    const deconnecter = () => {
        dispatch(deconnexion());
        dispatch(reset()) ;
        window.location.reload();
    }
  return (
    <div className='chatContent'>
        <div className="chatBar">
            <div className='bar'>
                <img src={currentContact.avatar == "" ? defaultImg : currentContact.avatar} alt="" />
                <div className='barInfos'>
                    <span className='userListName'>{pseudoFirstLetterMaj(currentContact.pseudo)}</span>
                    <span>Last seen: 2 hours ago</span>
                </div>
            </div>
            <div className="deconnexion">
                <Button type="primary" onClick={deconnecter} style={{backgroundColor: "#be2d2d", borderColor:"#000"}}>
                     DECONNEXION
                </Button>
            </div>
            <div className="menuBurger" onClick={handleMenu}>
                <FaAlignJustify />
            </div>
        </div>
        <div className="messageContent">
                    <ul id='messageContentUl' >
                        {/* <li className="clearfix invite">
                            <div className="message-data text-right">
                                <span className="message-data-time">10:10 AM, Today</span>
                            </div>
                            <div className="message other-message"> Hi Aiden, how are you? How is the project coming along? </div>
                        </li> 
                        
                        <li className="clearfix user">
                              <div className="message-data">
                                  <span className="message-data-time">10:15 AM, Today</span>
                              </div>
                              <div className="message my-message">Projecthjf has been already finished and I have results to show you.</div>
                        </li> */}
                      {
                        messages.map((item, index) => {
                          return (
                                  item.fromSelf ? (
                                    <li key={index} className="clearfix user">
                                      <div className="message-data">
                                          <span className="message-data-time">10:15 AM, Today</span>
                                      </div>
                                      <div className="message my-message">{item.message}</div>
                                    </li>)
                                    : (
                                      <li className="clearfix invite">
                                        <div className="message-data text-right">
                                            <span className="message-data-time">10:10 AM, Today</span>
                                        </div>
                                        <div className="message other-message">{item.message}</div>
                                      </li> 
                                      )

                                )
                        })
                      }
                     

                    </ul>
        </div>
        <Form
                wrapperCol={{ span: 30 }}
                layout="horizontal"
                initialValues={{ size: componentSize }}
                onFinish={(e) => sendMessage(e)}
                size="large"
        >
                <Form.Item  className='sendMesage'>
                    <Input  placeholder='Saisissez votre message' value={msg} onChange={(e) => setMsg(e.target.value)} name='message'  />
                </Form.Item>
        </Form>
    </div>
  )
}

export default ChatContent;