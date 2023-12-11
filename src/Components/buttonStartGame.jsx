import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import toastUtil from "../utilities/toastUtil"; 

function ButtonStartGame({ nickname }) {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate(`/Lobby/${nickname}`);
    toastUtil.toastSuccess(`Welcome ${nickname}, Choose your game mode`);
  };

  return (
    <Button variant="light" onClick={handleStartGame}>
      Log In
    </Button>
  );
}

export default ButtonStartGame;