import { Form, Button, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import Header from "../components/Header";
import { connexion, reset } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const initialStat: any = {
  pseudo: "",
  password: "",
};
const Connexion = () => {
  const [dataCo, setDataCo] = useState({
    pseudo: "",
    password: "",
  });

  const { pseudo, password } = dataCo;
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState<boolean[]>([]);

  // console.log(navigation("/"));
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const name = event.target.name;
    setDataCo((values) => ({
      ...values,
      [name]: event.target.value,
    }));
  };
  const { loading } = useSelector((state: any) => state.users);
  useEffect(() => {
    if (loading === "failed") {
      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[0] = false;
          return newLoadings;
        });
        message.error("Champs vide ou Pseudo déjà existant!");
      }, 2000);
    }
    if (loading === "succeeded") {
      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[0] = false;
          return newLoadings;
        });
        message.success("Vous êtes bien connectez!");
        navigate("/chat");
      }, 2000);
    }

    dispatch(reset());
  }, [loading, dispatch, navigate]);
  const onFinish = async () => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    const dataConnexion = {
      pseudo,
      password,
    };
    await dispatch(connexion(dataConnexion));
    setDataCo(initialStat);
    form.resetFields();
  };

  return (
    <>
      <Header />
      <div className="formulaire">
        <h1 className="titreInscription">
          <FaSignInAlt /> FORMUMLAIRE DE CONNEXION
        </h1>
        <h2 className="sousTitreInscription">Connectez Vous Pour Tchater !</h2>

        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input name="pseudo" value={pseudo} onChange={handleInputChange} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Button
            onChange={onFinish}
            type="primary"
            htmlType="submit"
            loading={loadings[0]}
            style={{
              backgroundColor: "#000000",
              borderColor: "#000000",
              width: "100%",
            }}
          >
            Connexion
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Connexion;
