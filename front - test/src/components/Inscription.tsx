import React, { useEffect } from 'react';
import { useState} from 'react';
import { message, Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import {addUserAsync, reset } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { User } from '../types/User';
import { FaUserAlt} from "react-icons/fa";
// const api = "http://localhost:8080/api/user/";

const initialState: any = {
    pseudo: '',
    email: '',
    password: '',
    avatar: "https://www.bootdey.com/img/Content/avatar/avatar6.png"
};
const Inscription = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [form] = Form.useForm();
    const [values, setValues] = useState<User>({
        _id: '',
        pseudo: '',
        email: '',
        password: '',
        avatar: 'https://www.bootdey.com/img/Content/avatar/avatar6.png'
    })
    const { loading } = useSelector((state:any) => state.users);
    useEffect(() => {
        if (loading === "failed") {
            message.error("Champs vide ou Pseudo/Mail déjà existant!");
            
        }
        if(loading === "succeeded"){
            message.success('Inscription terminée!');
        }
        dispatch(reset())
      }, [loading, dispatch])
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        const name = event.target.name;
        setValues((values) => ({
            ...values,
            [name]: event.target.value,
        }));
    };
    const onFinish = () => {
        dispatch(addUserAsync(values));
        setValues(initialState);
        form.resetFields();
      };
    
    return ( 
        <>
            <div className="formulaire">
                <h1 className='titreInscription'><FaUserAlt /> FORMUMLAIRE D'INSCRIPTION</h1>
                <h2>Creez un compte s'il vous plait !</h2>
                <Form
                    className='formu'
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 2,
                    }}
                    wrapperCol={{
                        span: 30,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Pseudo"
                        name="pseudo"
                        rules={[{ required: true, message: "S'il vous plait votre pseudo" }]}
                    >
                        <Input className='an' size="large" name="pseudo" value={values.pseudo} onChange={handleInputChange}/>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        
                        rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input className='an' size="large" name="email" value={values.email} onChange={handleInputChange}/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input.Password  size="large" name='password' value={values.password} onChange={handleInputChange}/>
                    </Form.Item>

                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                <h3 className='sousTitreInscription'>Selectionnez votre avatar !</h3>
                <div className='checkImage' onChange={handleInputChange}>
                    <input type="radio" name="avatar" id="man1" className="input-hidden" value="https://www.bootdey.com/img/Content/avatar/avatar1.png"/>
                        <label htmlFor="man1">
                        <img 
                            src="https://www.bootdey.com/img/Content/avatar/avatar1.png" 
                            alt="I'm sad" />
                        </label>

                    <input type="radio" name="avatar" id="girl1" className="input-hidden" value="https://www.bootdey.com/img/Content/avatar/avatar3.png"/>
                        <label htmlFor="girl1">
                        <img
                            src="https://www.bootdey.com/img/Content/avatar/avatar3.png" 
                            alt="I'm happy" />
                        </label>
                    <input type="radio" name="avatar" id="man2" className="input-hidden" value="https://www.bootdey.com/img/Content/avatar/avatar7.png"/>
                        <label htmlFor="man2">
                        <img
                            src="https://www.bootdey.com/img/Content/avatar/avatar7.png" 
                            alt="I'm happy" />
                        </label>
                    <input type="radio" name="avatar" id="girl2" className="input-hidden" value="https://www.bootdey.com/img/Content/avatar/avatar8.png"/>
                        <label htmlFor="girl2">
                        <img
                            src="https://www.bootdey.com/img/Content/avatar/avatar8.png" 
                            alt="I'm happy" />
                        </label>

                </div> <br />
                    <Button type="primary" htmlType="submit" onChange={onFinish} style={{backgroundColor: "#000000", borderColor:"#000000", width: "100%"}}>
                    S'INSCRIRE                
                    </Button>
                </Form.Item>
                </Form>               
          
            </div>

        </>
     );
}
 
export default Inscription;