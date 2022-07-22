import { Modal, Checkbox, Form, Input } from 'antd'
import React, { useState } from 'react'

type AppProps = {
  visible: boolean;
  showModal: (val:boolean) => void;
}
const ModalConnexion = ({visible, showModal}: AppProps) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
        <Modal
        title="CONNECTEZ-VOUS"
        centered
        visible={visible}
        onCancel={() => showModal(false)}
        onOk={onFinish}
        width={1000}
        >
           <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

      
              </Form>
        </Modal>
    </div>
  )
}

export default ModalConnexion;