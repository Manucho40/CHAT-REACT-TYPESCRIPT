import {Form, Button, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import Header from '../components/Header';
import { connexion, reset } from '../features/userSlice';


const initialStat: any = {
    pseudo: '',
    password: '',
};
const Connexion = () => {
  const [dataCo, setDataCo] = useState({
    pseudo: '',
    password: ''
  })

  const {pseudo, password} = dataCo;
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const name = event.target.name;
    setDataCo((values) => ({
        ...values,
        [name]: event.target.value,
    }));
};

const {loading} = useSelector((state:any) => state.users);
useEffect(() => {
    if (loading === "failed") {
        message.error("Champs vide ou Pseudo déjà existant!");
    }
    if(loading === "succeeded"){
        message.success('Vous êtes bien connectez!');
        window.location.reload();
    }

    dispatch(reset())
  }, [loading, dispatch])
  const onFinish = (values: any) => {
    const dataConnexion = {
      pseudo,
      password
    }
    dispatch(connexion(dataConnexion))
    setDataCo(initialStat);
    form.resetFields();
  };

  return (
    <>
    <Header />
    <div className='contain formulaire'>
        <h1 className='titreInscription'><FaSignInAlt /> FORMUMLAIRE DE CONNEXION</h1>
        <h2 className='sousTitreInscription'>Connectez Vous Pour Tchater !</h2>

    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      form={form}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input name='pseudo' value={pseudo} onChange={handleInputChange} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password name="password" value={password}  onChange={handleInputChange}/>
      </Form.Item>
{/* 
      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button onChange={onFinish} type="primary" htmlType="submit" style={{backgroundColor: "#000000", borderColor:"#000000"}}>
          Connexion
        </Button>
      </Form.Item>
    </Form>  

    </div>
    </>
  )
}

export default Connexion;