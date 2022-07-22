import React, { FC, useState } from 'react'
import Header from '../components/Header'
import ModalConnexion from '../components/ModalConnexion';

const Accueil: FC = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(!visible);
  };
    return(
      <>
        <Header showModal={showModal}/>
        <ModalConnexion visible={visible} showModal={showModal}/>
      </>
    )
}

export default Accueil;
