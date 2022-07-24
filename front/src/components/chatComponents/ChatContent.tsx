import React, { useState } from 'react'
import { Form, Input } from 'antd';
// import background from "../../assets/img/bg.jpg"

type SizeType = Parameters<typeof Form>[0]['size'];
const ChatContent = () => {
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
      setComponentSize(size);
    };
  return (
    // style={{backgroundSize:"no-repeat", backgroundImage: `url(${background})` }}
    <div className='chatContent'>
        <div className="chatBar">
            <div className='bar'>
                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" />
                <div className='barInfos'>
                    <span className='userListName'>Manucho</span>
                    <span>Last seen: 2 hours ago</span>
                </div>
            </div>
        </div>
        <div className="messageContent" >
                    <ul>
                        <li className="clearfix invite">
                            <div className="message-data text-right">
                                <span className="message-data-time">10:10 AM, Today</span>
                            </div>
                            <div className="message other-message"> Hi Aiden, how are you? How is the project coming along? </div>
                        </li>
                        <li className="clearfix user">
                            <div className="message-data">
                                <span className="message-data-time">10:15 AM, Today</span>
                            </div>
                            <div className="message my-message">Project has been already finished and I have results to show you.</div>
                        </li>
                        <li className="clearfix user">
                            <div className="message-data">
                                <span className="message-data-time">10:15 AM, Today</span>
                            </div>
                            <div className="message my-message">Project has been already finished and I have results to show you.</div>
                        </li>

                    </ul>
        </div>
        <Form
                wrapperCol={{ span: 30 }}
                layout="horizontal"
                initialValues={{ size: componentSize }}
                onValuesChange={onFormLayoutChange}
                size="large"
        >
                <Form.Item>
                    <Input  />
                </Form.Item>
        </Form>
    </div>
  )
}

export default ChatContent;