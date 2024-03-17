import React, { FC } from "react";
import Accueil from "./pages/Accueil";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./styles/App.css";
import "antd/dist/antd.min.css";
import Chat from "./pages/Chat";
import Connexion from "./pages/Connexion";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import BaseURL from "./config";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}
const App: FC = () => {
  const userSession = localStorage.getItem("user");
  const location = useLocation();
  console.log(BaseURL);
  return (
    <div className="App">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={userSession ? <Navigate to="/chat" /> : <Accueil />}
        />
        <Route
          path="/connexion"
          element={userSession ? <Navigate to="/chat" /> : <Connexion />}
        ></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="*" element={<h1>Page non trouvée - ERROR 404</h1>} />
      </Routes>
    </div>
  );
};

export default App;
