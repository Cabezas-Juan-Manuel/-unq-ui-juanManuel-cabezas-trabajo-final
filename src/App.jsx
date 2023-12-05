import {BrowserRouter, Route, Routes} from 'react-router-dom'; // Corregir aquí

import './App.css';
import Lobby from './Views/lobby/lobby/lobby.jsx';
import GameScreen from './Views/lobby/gameScreen/gameScreen.jsx';

function App() {
  return (
    <>
      <BrowserRouter> {/* Corregir aquí */}
        <Routes>

          <Route exact path="/" element={<Lobby />} />
          <Route exact path="/gameScreen" element={<GameScreen />} />          
        </Routes>
      </BrowserRouter> {/* Corregir aquí */}
    </>
  );
}

export default App;
