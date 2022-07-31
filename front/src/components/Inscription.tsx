import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { message, Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

const api = "http://localhost:8080/api/user/";

const Inscription = () => {
    const dispatch = useDispatch;
    const [form] = Form.useForm();
     const [datas, setData] = useState([]);
    const [values, setValues] = useState({
        pseudo: '',
        email: '',
        password: ''
    })
    useEffect(() => {
        axios.get(api).then((res) => console.log(res.data));
       
   }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        const name = event.target.name;
        setValues((values) => ({
            ...values,
            [name]: event.target.value,
        }));
    };
    const onFinish = (values :any) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
        console.log('Failed:', errorInfo);
      };
    // const registerUser = (e: any) => {
    //     e.preventDefault()
        
    //     if(!values.pseudo || !values.email || !values.password){
    //         message.error('Remplissez tous les champs');

    //     }
    //     else{
    //         axios.post(api, values).then(res =>{
    //             setData(res.data)
    //             values.pseudo = ""
    //             values.email = ""
    //             values.password = ""
    //             form.resetFields();
    //         })
           
    //         message.success('Inscription terminée!');
    //     }


    // }

    
    
    return ( 
        <>
            <div className="formulaire">
                <h1>Formulaire inscription</h1>
                <Form
                    className='formu'
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 30,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Pseudo"
                        name="pseudo"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input size="large" name="pseudo" onChange={handleInputChange}/>
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
                        <Input size="large" name="email" onChange={handleInputChange}/>
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
                        <Input.Password size="large" name='password' onChange={handleInputChange}/>
                    </Form.Item>

                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" >
                    Submit
                    {/* onClick={registerUser} */}
                    </Button>
                </Form.Item>
                </Form>               

            </div>

        </>
     );
}
 
export default Inscription;