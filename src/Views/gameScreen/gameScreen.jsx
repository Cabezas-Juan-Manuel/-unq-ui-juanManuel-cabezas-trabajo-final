import React, { useState, useEffect  } from "react";
import { useParams } from "react-router-dom";
import { BattleField } from "../../Objects/battlefield";
import { Button } from "react-bootstrap";
import "./gameScreen.css"
import CombatPlayerField from "../../Components/combatPlayerFiled";
import { Player } from "../../Objects/player";
import PlayersInfo from "../../Components/playerInfo";
import { useNavigate } from 'react-router-dom';
import ShipPlacementLogic from "../../Components/shipPlacementLogic";
import { Game } from "../../Objects/game";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import toastUtil from "../../utilities/toastUtil";
import GameInfo from "../../Components/gameInfo";

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

  const [infoVisible, setInfoVisible] = useState(false);

  const finishPlacementFase = (battlefield) => {
      setFirstPlayerBattlefield(battlefield)
      let secondBattlefield = game.placeRandomShips(secondPlayerBattlefield)
      console.log(firstPlayerBattlefield)
      setSecondPlayerBattlefield(secondBattlefield)
      setPlacementFase(false);
      toastUtil.toastSuccess(`Player ${nickname} has the first turn!`);
    }
    

  const handleCellClick = (rowIndex, columnIndex, playerBattlefield) => {
    const accurateRowIndex = rowIndex + 1;
    const accurateColumnIndex = columnIndex + 1;

    if (playerBattlefield.isCellClicked(accurateRowIndex, accurateColumnIndex)) {
      return;
    }

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
    playerOne.reset()
    playerTwo.reset()
    setFirstPlayerBattlefield(new BattleField(11, 11, playerOne));
    setSecondPlayerBattlefield(new BattleField(11, 11, playerTwo))
    setPlayerTurn(playerOne);
    
  };

  const navigate = useNavigate();
  const toMainMenu = () =>{
    navigate(`/Lobby/${nickname}`);
  }

  const signOut = () =>{
    navigate(`/`);
  }

  const handleInfoHover = () => {
    setInfoVisible(true);
  }

  const handleInfoLeave = () => {
    setInfoVisible(false);
  }


  return (
    <>
      <div className="sign-out-container">
        <button className="sign-out-button" onClick={signOut}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Log Out</span>
        </button>
      </div>
      {placementFase ? (
          <>
            <div className="info-container">
              <GameInfo/>
            </div> 
            <div className="ship-placement-container">
              <div className="ship-selection">
                <ShipPlacementLogic
                  battlefield={firstPlayerBattlefield}
                  finishPlacementFase={finishPlacementFase}
                />
              </div>
              <div className="counter-container">
                <PlayersInfo
                  playerOneName={playerOne.nickname}
                  playerTwoName={playerTwo.nickname}
                  games={gamesPlayed}
                  winsPlayerOne={playerOneWins}
                  winsPlayerTwo={playerTwoWins}
                />
              </div>
            </div>
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
              <h1>{playerOne.nickname.toUpperCase()} FIELD</h1>
              <CombatPlayerField battleField={firstPlayerBattlefield} hiddenInfo={false} onCellClick={(rowIndex, columnIndex) => handleCellClick(rowIndex, columnIndex, firstPlayerBattlefield)} player={playerTurn} />
              <h1>{playerTwo.nickname.toUpperCase()} FIELD</h1>
              <CombatPlayerField battleField={secondPlayerBattlefield} hiddenInfo={true} onCellClick={(rowIndex, columnIndex) => handleCellClick(rowIndex, columnIndex, secondPlayerBattlefield)} player={playerTurn} />
            </>
          )}
        </>
      )}
    </>
  );
 
}

export default GameScreen;
