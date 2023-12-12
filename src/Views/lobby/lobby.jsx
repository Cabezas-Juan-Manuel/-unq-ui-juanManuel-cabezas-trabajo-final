import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './loby.css';
import toastUtil from '../../utilities/toastUtil';

function Lobby (){
  const { nickname } = useParams();
  
  const navigate = useNavigate()

  const handleLogOut = () => {
    navigate(`/`);
  };

  const handleVsCom = () => {
    navigate(`/gameScreen/${nickname}`);
    toastUtil.toastSuccess("Click on a ship to select and set up its coordinates. Get ready!");
  }

  const handleVsPlayer = () => {
    navigate(`/${nickname}`);
  };

  

  return (
    <>
    <div className="game-container-wrapper">
      <div className="game-container">
        <h1 className='title-text'>GAME OPTIONS</h1>
        <button className='option-text' onClick={handleVsCom}>PLAYER VS COM</button>
        <button className='option-text' onClick = {handleVsPlayer}>PLAYER VS PLAYER</button>
        <button className='option-text' onClick = {handleLogOut}>LOG OUT</button>
      </div>
    </div>
    </>
  );
};

export default Lobby;