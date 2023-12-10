import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import toastUtil from "../utilities/toastUtil"; 

function ButtonStartGame({ nickname }) {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate(`/gameScreen/${nickname}`);
    toastUtil.toastSuccess(`Welcome ${nickname}`);
    
  };

  return (
    <Button variant="light" onClick={handleStartGame}>
      Start Game
    </Button>
  );
}

export default ButtonStartGame;