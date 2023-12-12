import React, { useState } from 'react';
import ButtonStartGame from '../../Components/ButtonStartGame';
import { useParams } from 'react-router-dom';
import './login.css';

function Login() {
  const { nicknameFirstUser } = useParams();
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  return (
    <>
  {nicknameFirstUser ? (
    <div className="form-container">
      <h3 className='secondPlayer-text'>ENTER SECOND PLAYER NICKNAME</h3>
      <div className="login-container">
        <label htmlFor="nickname" className="nickName-text">
          NICKNAME:
        </label>
        <div>
          <input
            className="input-nickName"
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="Enter your nickname"
          />
          <ButtonStartGame nickname={nicknameFirstUser} secondUserNickname={nickname} className="start-button" />
        </div>
      </div>
    </div>
  ) : (
    <div className="form-container">
      <img src="../public/battleShipTitle1.png" alt="battleShip title" className="battleShip-title" />
      <div className="login-container">
        <label htmlFor="nickname" className="nickName-text">
          NICKNAME:
        </label>
        <div>
          <input
            className="input-nickName"
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="Enter your nickname"
          />
          <ButtonStartGame nickname={nickname} className="start-button" />
        </div>
      </div>
    </div>
  )}
</>
  );
}

export default Login;
