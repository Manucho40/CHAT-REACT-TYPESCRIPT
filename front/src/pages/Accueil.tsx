import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import Header from '../components/Header'
import Inscription from '../components/Inscription';
import ModalConnexion from '../components/ModalConnexion';
import { dataAPI } from '../features/userSlice';

const Accueil: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dataUser = useSelector((state) => state)
  useEffect(() => {
    dispatch(dataAPI())
  }, [])
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(!visible);
  };


    return(
      <>
        <Header showModal={showModal}/>
        <ModalConnexion visible={visible} showModal={showModal}/>
        <Inscription />
      </>
    )
}

export default Accueil;
