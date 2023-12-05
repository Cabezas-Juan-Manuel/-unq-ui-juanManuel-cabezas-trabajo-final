import React, { useState } from 'react';
import ButtonStartGame from '../../Components/ButtonStartGame';
import "./lobby.css"

function Lobby() {
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  return (
    <>
    <img src="../public/battleShipTitle1.png" alt="battleShip title" className='battleShip-title' />
      <div className = "login-container">
        <label htmlFor="nickname" className='nickName-text'>NICKNAME:</label>
        <div>
            <input className='input-nickName'
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="Enter your nickname"
          />
          <ButtonStartGame nickname={nickname} className="start-button" />
        </div>
      </div>
    </>
  );
}

export default Lobby;