import React, { useState } from 'react';
import ButtonStartGame from '../../Components/ButtonStartGame';

function Lobby() {
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={nickname}
        onChange={handleNicknameChange}
        placeholder="Enter your nickname"
      />
      <ButtonStartGame nickname={nickname} className="start-button" />
    </div>
  );
}

export default Lobby;