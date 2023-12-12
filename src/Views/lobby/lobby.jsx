import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './loby.css';

function Lobby (){
  const { nickname } = useParams();
  
  const navigate = useNavigate()

  const handleLogOut = () => {
    navigate(`/`);
  };

  const handleVsCom = () => {
    navigate(`/gameScreen/${nickname}`);
  };

  const handleVsPlayer = () => {
    navigate(`/${nickname}`);
  };



  return (
    <div className="game-container-wrapper">
      <div className="game-container">
        <h1 className='title-text'>GAME OPTIONS</h1>
        <button className='option-text' onClick={handleVsCom}>PLAYER VS COM</button>
        <button className='option-text' onClick = {handleVsPlayer}>PLAYER VS PLAYER</button>
        <button className='option-text' onClick = {handleLogOut}>LOG OUT</button>
      </div>
    </div>
  );
};

export default Lobby;