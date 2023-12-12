import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import toastUtil from "../utilities/toastUtil"; 

function ButtonStartGame({ nickname, secondUserNickname }) {
  const navigate = useNavigate();

  const handleStartGame = () => {
    const destination = secondUserNickname
      ? `/playerVsPlayerScreen/${nickname}/${secondUserNickname}`
      : `/Lobby/${nickname}`;

    navigate(destination);

    // Mostrar el toast solo cuando se redirige al lobby
    if (!secondUserNickname) {
      toastUtil.toastSuccess(`Welcome ${nickname}, Choose your game mode`);
    }
  };

  return (
    <Button variant="light" onClick={handleStartGame}>
      Log In
    </Button>
  );
}

export default ButtonStartGame;