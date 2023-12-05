import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ButtonStartGame({ nickname }) {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate(`/gameScreen/${nickname}`);
  };

  return (
    <Button variant="light" onClick={handleStartGame}>
      Start Game
    </Button>
  );
}

export default ButtonStartGame;