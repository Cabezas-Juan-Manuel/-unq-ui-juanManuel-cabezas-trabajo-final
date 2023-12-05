import {BrowserRouter, Route, Routes} from 'react-router-dom';

import './App.css';
import Lobby from './Views/lobby//lobby.jsx';
import GameScreen from './Views/gameScreen/gameScreen.jsx';

function App() {
  return (
    <>
      <BrowserRouter> 
        <Routes>

          <Route exact path="/" element={<Lobby />} />
          <Route exact path="/gameScreen" element={<GameScreen />} />          
        </Routes>
      </BrowserRouter> 
    </>
  );
}

export default App;
