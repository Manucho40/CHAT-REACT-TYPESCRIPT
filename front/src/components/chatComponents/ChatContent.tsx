import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { deconnexion, reset } from '../../features/userSlice';
import { AppDispatch } from '../../app/store';
import { FaAlignJustify, } from 'react-icons/fa';

type Props = { 
    handleMenu: (event: React.MouseEvent<HTMLElement>) => void
  };
  type Message = {
    text: string,
    time: Date
  }
  const date = new Date();
type SizeType = Parameters<typeof Form>[0]['size'];
const ChatContent = ({handleMenu} : Props) => {
    const [message, setMessage] = useState<Message>({
        text: "",
        time: date
    });
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
    const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setMessage((message) => ({
            ...message,
            text: event.target.value,
            time: date
        }));
    };
    function scrollToBottom() {
        const el = document.getElementById("messageContentUl") as HTMLElement;
          el.scrollTop = el.scrollHeight;
      }
    const envoiMessage = () => {
        const messageContent = window.document.getElementById('messageContentUl') as HTMLElement;
        messageContent.innerHTML += `<li className="clearfix user">
        <div className="message-data">
            <span className="message-data-time">10:15 AM, Today</span>
        </div>
        <div className="message my-message">Projecthjf has been already finished and I have results to show you.</div>
        </li>`;
        scrollToBottom()
        console.log("Hello msg bien envoyé")
    }
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
                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" />
                <div className='barInfos'>
                    <span className='userListName'>Manucho</span>
                    <span>Last seen: 2 hours ago</span>
                </div>
            </div>
            <div className="deconnexion">
                <Button type="primary"  danger onClick={deconnecter}>
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
                        </li> */}
                        
                      <li className="clearfix user">
        <div className="message-data">
            <span className="message-data-time">10:15 AM, Today</span>
        </div>
        <div className="message my-message">Projecthjf has been already finished and I have results to show you.</div>
        </li>
                      
                     

                    </ul>
        </div>
        <Form
                wrapperCol={{ span: 30 }}
                layout="horizontal"
                initialValues={{ size: componentSize }}
                onValuesChange={onFormLayoutChange}
                onSubmitCapture={envoiMessage}
                size="large"
        >
                <Form.Item className='sendMesage'>
                    <Input placeholder='Saisissez votre message' name='message' value={message.text} onChange={handleMessage} />
                </Form.Item>
        </Form>
    </div>
  )
}

export default ChatContent;