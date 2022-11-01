import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';
import 'antd/dist/antd.min.css';

const App: FC = () => {
  const userSession = localStorage.getItem('user');
  
  return (
    <div className="App">
   <Routes>
    <Route path='/' element={userSession ? <Navigate to="/chat" /> : <Accueil />} />
    <Route path='/connexion' element={userSession ? <Navigate to="/chat" /> : <Connexion />}></Route>
    <Route path='/chat' element={!userSession ? <Navigate to="/connexion" /> : <Chat />}></Route>
  </Routes>
    </div>
  );
}

export default App;
