import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { BattleField } from "../../Objects/battlefield";
import { Button } from "react-bootstrap";
import "../gameScreen/gameScreen.css"
import "./playerVsPlayerScreen.css";
import CombatPlayerField from "../../Components/combatPlayerFiled";
import { Player } from "../../Objects/player";
import PlayersInfo from "../../Components/playerInfo";
import { useNavigate } from 'react-router-dom';
import ShipPlacementLogic from "../../Components/shipPlacementLogic";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function PlayerVsPlayerScreen(){
  const { nicknameFirstUser, nicknameSecondUser } = useParams();
   
  const [playerOne, setPlayerOne] = useState(new Player(nicknameFirstUser, 1));
  const [playerTwo, setplayerTwo] = useState(new Player(nicknameSecondUser, 2));

  const [firstPlayerBattlefield, setFirstPlayerBattlefield] = useState(new BattleField(11, 11, playerOne));
  const [secondPlayerBattlefield, setSecondPlayerBattlefield] = useState(new BattleField(11, 11, playerTwo));

  const [placementFase, setPlacementFase] = useState(true);
  const [placementTurn, setPlacementTurn] = useState(playerOne);
  const [playerTurn, setPlayerTurn] = useState(playerOne);

  const [playerOneWins, setPlayerOneWins] = useState(0);
  const [playerTwoWins, setplayerTwoWins] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  const finishPlacementFase = (battlefield) => {

    if(placementTurn == playerOne){
        setFirstPlayerBattlefield(battlefield)
        setPlacementTurn(playerTwo)
       
    } else {
      setSecondPlayerBattlefield(battlefield)
      setPlacementTurn(playerOne)
      setPlacementFase(false)
    }
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
        setPlayerTurn(playerTwo, () => {
        });
      } else {
        const newBattlefield = firstPlayerBattlefield.clone();
    
        newBattlefield.receiveHit(accurateRowIndex, accurateColumnIndex);
        setFirstPlayerBattlefield(newBattlefield)
        setPlayerTurn(playerOne)
      }
   }   


  
  const reset = () => {
    if(playerOne.isOutOfCombat){
      setplayerTwoWins(playerTwoWins + 1)
    } else {
      setPlayerOneWins(playerOneWins + 1)
    }
    setPlacementTurn(playerOne)
    setGamesPlayed(gamesPlayed + 1)
    setPlacementFase(true);
    playerOne.reset()
    playerTwo.reset()
    setFirstPlayerBattlefield(new BattleField(11, 11, playerOne));
    setSecondPlayerBattlefield(new BattleField(11, 11, playerTwo))
    setPlayerTurn(playerOne);
    
  };

  const navigate = useNavigate();

  const toMainMenu = () =>{
    navigate(`/Lobby/${nicknameFirstUser}`);
  }

  const signOut = () =>{
    navigate(`/`);
  }


  return (
    <>
    <div className="sign-out-container">
        <button className="sign-out-button" onClick={signOut}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span> Log Out</span>
        </button>
      </div>
      {placementFase ? (
        <>
        <div className="container">
  <div className="players-info">
    <PlayersInfo playerOneName={playerOne.nickname} playerTwoName={playerTwo.nickname} games={gamesPlayed} winsPlayerOne={playerOneWins} winsPlayerTwo={playerTwoWins}/>
  </div>

  {placementTurn === playerOne ? (
    <div className="ship-placement">
      <h3>{nicknameFirstUser.toUpperCase()}: PLACE YOUR SHIPS</h3>
      <ShipPlacementLogic
        battlefield={firstPlayerBattlefield}
        finishPlacementFase={finishPlacementFase}
      />
    </div>
  ) : (
    <div className="ship-placement">
      <h3>{nicknameSecondUser.toUpperCase()}: PLACE YOUR SHIPS</h3>
      <ShipPlacementLogic
        battlefield={secondPlayerBattlefield}
        finishPlacementFase={finishPlacementFase}
      />
    </div>
  )}
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
              <h1>ITS {playerTurn.nickname.toUpperCase()} TURN</h1>
              <h1>{playerOne.nickname.toUpperCase()} FIELD</h1>
              <CombatPlayerField battleField={firstPlayerBattlefield} hiddenInfo={true} onCellClick={(rowIndex, columnIndex) => handleCellClick(rowIndex, columnIndex, firstPlayerBattlefield)} player={playerTurn} />
              <h1>{playerTwo.nickname.toUpperCase()} FIELD</h1>
              <CombatPlayerField battleField={secondPlayerBattlefield} hiddenInfo={true} onCellClick={(rowIndex, columnIndex) => handleCellClick(rowIndex, columnIndex, secondPlayerBattlefield)} player={playerTurn} />
            </>
          )}
        </>
      )}
    </>
  );
}

export default PlayerVsPlayerScreen