import React, { useState, useEffect  } from "react";
import { useParams } from "react-router-dom";
import { BattleField } from "../../Objects/battlefield";
import { Button } from "react-bootstrap";
import "./gameScreen.css"
import toastUtil from "../../utilities/toastUtil";
import CombatPlayerField from "../../Components/combatPlayerFiled";
import { Player } from "../../Objects/player";
import PlayersInfo from "../../Components/playerInfo";
import { useNavigate } from 'react-router-dom';
import ShipPlacementLogic from "../../Components/shipPlacementLogic";
import { Game } from "../../Objects/game";

function GameScreen() {

  const { nickname } = useParams();

  const [game, setGame] = useState(new Game());
  const [playerOne, setPlayerOne] = useState(new Player(nickname, 1));
  const [playerTwo, setplayerTwo] = useState(new Player("BOT", 2));

  const [firstPlayerBattlefield, setFirstPlayerBattlefield] = useState(new BattleField(11, 11, playerOne));
  const [secondPlayerBattlefield, setSecondPlayerBattlefield] = useState(new BattleField(11, 11, playerTwo));

  const [placementFase, setPlacementFase] = useState(true);
  const [playerTurn, setPlayerTurn] = useState(playerOne);

  const [playerOneWins, setPlayerOneWins] = useState(0);
  const [playerTwoWins, setplayerTwoWins] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  const finishPlacementFase = (shipsPlaces, battlefield) => {
    if(shipsPlaces == 4){
      setFirstPlayerBattlefield(battlefield)
      // placeRandomShips(secondPlayerBattlefield);
      let secondBattlefield = game.placeRandomShips(secondPlayerBattlefield)
      setSecondPlayerBattlefield(secondBattlefield)
      setPlacementFase(false);
    } else{
      toastUtil.toastError("Place all ships")
    }
    
  };

  const handleCellClick = (rowIndex, columnIndex, playerBattlefield) => {
    const accurateRowIndex = rowIndex + 1;
    const accurateColumnIndex = columnIndex + 1;

    if(playerBattlefield.user.numberOfUser == 2){
   
        const newBattlefield = secondPlayerBattlefield.clone();
    
        newBattlefield.receiveHit(accurateRowIndex, accurateColumnIndex);
        setSecondPlayerBattlefield(newBattlefield)
        setPlayerTurn(playerTwo)
      };
   }   


  const machinePlay = () => {
    if (playerTurn.numberOfUser === 2) {  
      setFirstPlayerBattlefield(game.attackPlayer(firstPlayerBattlefield));
      console.log(game.attackedCoordinates)
      setPlayerTurn(playerOne)
    }
  };
  
  useEffect(() => {
    machinePlay();
  }, [playerTurn]);
  
  const reset = () => {
    if(playerOne.isOutOfCombat){
      setplayerTwoWins(playerTwoWins + 1)
    } else {
      setPlayerOneWins(playerOneWins + 1)
    }
    setGamesPlayed(gamesPlayed + 1)
    game.reset()
    setPlacementFase(true);
    playerOne.isOutOfCombat = false
    playerOne.fleet = [];
    playerTwo.fleet = [];
    playerTwo.isOutOfCombat = false
    setFirstPlayerBattlefield(new BattleField(11, 11, playerOne));
    setSecondPlayerBattlefield(new BattleField(11, 11, playerTwo))
    setPlayerTurn(playerOne);
    
  };

  const navigate = useNavigate();
  const toMainMenu = () =>{
    navigate(`/`);
  }


  return (
    <>
      {placementFase ? (
        <>
          <div>
            <PlayersInfo playerOneName={playerOne.nickname} playerTwoName={playerTwo.nickname} games={gamesPlayed} winsPlayerOne={playerOneWins} winsPlayerTwo={playerTwoWins}/>
          </div>
          <ShipPlacementLogic
            battlefield={firstPlayerBattlefield}
            finishPlacementFase={finishPlacementFase}
          />
        </>
      ) : (
        <>
          {playerOne.isOutOfCombat || playerTwo.isOutOfCombat ? (
            <>  
             <h1>{playerOne.isOutOfCombat ? playerTwo.nickname.toUpperCase() : playerOne.nickname.toUpperCase()} Wins!</h1>
             <Button className="button-submit" onClick={reset}>PLAY AGAIN</Button>
             <Button className="button-submit" onClick={toMainMenu}>MAIN MENU</Button>
             </>
          ) : (
            <>
              <h1>{playerOne.nickname.toUpperCase()}</h1>
              <CombatPlayerField battleField={firstPlayerBattlefield} hiddenInfo={false} onCellClick={(rowIndex, columnIndex) => handleCellClick(rowIndex, columnIndex, firstPlayerBattlefield)} player={playerTurn} />
              <h1>{playerTwo.nickname.toUpperCase()}</h1>
              <CombatPlayerField battleField={secondPlayerBattlefield} hiddenInfo={false} onCellClick={(rowIndex, columnIndex) => handleCellClick(rowIndex, columnIndex, secondPlayerBattlefield)} player={playerTurn} />
            </>
          )}
        </>
      )}
    </>
  );
 
}

export default GameScreen;
