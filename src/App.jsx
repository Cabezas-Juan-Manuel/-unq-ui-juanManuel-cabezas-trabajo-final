import {BrowserRouter, Route, Routes} from 'react-router-dom';

import './App.css';
import Login from './Views/login/login.jsx';
import Lobby from './Views/lobby/lobby.jsx';
import GameScreen from './Views/gameScreen/gameScreen.jsx';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PlayerVsPlayerScreen from './Views/playerVsPlayerScreen/playerVsPlayerScreen.jsx';

function App() {
  return (
    <>
      <BrowserRouter> 
        <Routes>

          <Route path="/:nicknameFirstUser?" element={<Login />} />
          <Route exact path="/lobby/:nickname" element={<Lobby />} />  
          <Route exact path="/gameScreen/:nickname" element={<GameScreen />} />   
          <Route path="/playerVsPlayerScreen/:nicknameFirstUser/:nicknameSecondUser" element={<PlayerVsPlayerScreen />} />       
        </Routes>
      </BrowserRouter> 
      <ToastContainer position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            draggable
                            theme="dark"
                            style={{whiteSpace: "pre-line"}}/>
    </>
  );
}

export default App;
