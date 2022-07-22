import React, { FC } from 'react';
import Accueil from './pages/Accueil';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import 'antd/dist/antd.min.css';
import Chat from './pages/Chat';

const App: FC = () => {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Accueil />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
