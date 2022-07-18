import React, { FC } from 'react';
import Accueil from './pages/Accueil';
import './styles/App.css';
import 'antd/dist/antd.min.css';

const App: FC = () => {
  return (
    <div className="App">
        <Accueil />
    </div>
  );
}

export default App;
