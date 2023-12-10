import React, { useState, useEffect  } from "react";
import { useParams } from "react-router-dom";
import { BattleField } from "../../Objects/battlefield";
import PlayerField from "../../Components/playerField";
import ShipSelectionBoard from "../../Components/shipSelectionBoard";
import { Button } from "react-bootstrap";
import "./gameScreen.css"
import toastUtil from "../../utilities/toastUtil";
import { Ship } from "../../Objects/ship";
import CombatPlayerField from "../../Components/combatPlayerFiled";
import { Player } from "../../Objects/player";

function GameScreen() {


  const { nickname } = useParams();

  const [playerOne, setPlayerOne] = useState(new Player(nickname, 1));
  const [playerTwo, setplayerTwo] = useState(new Player("BOT", 2));

  const [firstPlayerBattlefield, setFirstPlayerBattlefield] = useState(new BattleField(11, 11, playerOne));
  const [secondPlayerBattlefield, setSecondPlayerBattlefield] = useState(new BattleField(11, 11, playerTwo));

  const [placementFase, setPlacementFase] = useState(true);
  const [selectedShip, setSelectedShip] = useState(null);
  
  const [startCoordinate, setStartCoordinate] = useState('');
  const [endCoordinate, setEndCoordinate] = useState('');
  
  const [placedShipsLength, setPlacedShipsLength] = useState([]);

  const [playerTurn, setPlayerTurn] = useState(playerOne);

  const [machineAttackedCoordinates, setMachineAttackedCoordinates] = useState(new Set());


  const finishPlacementFase = () => {
    console.log(placedShipsLength.length)
    if(placedShipsLength.length == 4){
      placeRandomShips(secondPlayerBattlefield);
      setPlacementFase(false);
    } else{
      toastUtil.toastError("Place all ships")
    }
    
  };


  const placeRandomShips = (battlefield) => {
    let boat = new Ship(2);
    let submarine = new Ship(3);
    let crusier = new Ship(4);
    let carrier = new Ship(5);
  
    const shipsToPlace = [boat, submarine, crusier, carrier];
  
    shipsToPlace.forEach((ship) => {
      let placed = false;
  
      while (placed === false) {
        const validCoordinatesRange = battlefield.getValidCoordinatesRange();
  
        const ValidstartRow = validCoordinatesRange.startCoordinate.toUpperCase().charCodeAt(0) - 65 + 1;
        const ValidstartColumn = parseInt(validCoordinatesRange.startCoordinate.slice(1), 10);
        const ValidendRow = validCoordinatesRange.endCoordinate.toUpperCase().charCodeAt(0) - 65 + 1;
        const ValidendColumn = parseInt(validCoordinatesRange.endCoordinate.slice(1), 10);
  
        const randomStartRow = Math.floor(Math.random() * (ValidendRow - ValidstartRow + 1)) + ValidstartRow;
        const randomStartColumn = Math.floor(Math.random() * (ValidendColumn - ValidstartColumn + 1)) + ValidstartColumn;
  
       
        const randomOrientation = Math.floor(Math.random() * 2);
  
        let randomEndRow, randomEndColumn;
  
        if (randomOrientation === 0) {
          
          randomEndRow = randomStartRow;
          randomEndColumn = randomStartColumn + ship.length - 1;
        } else {
          
          randomEndRow = randomStartRow + ship.length - 1;
          randomEndColumn = randomStartColumn;
        }
    
        if (!battlefield.areCoordinatesOutOfRange(randomStartRow, randomStartColumn, randomEndRow, randomEndColumn) && 
             !battlefield.areCellsOccupied(randomStartRow, randomStartColumn, randomEndRow, randomEndColumn)) {
          battlefield.placeShip(
            randomStartRow,
            randomStartColumn,
            randomEndRow,
            randomEndColumn,
            ship
          );
          placed = true;
        }
      }
    });
  };
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (selectedShip === null) {
        toastUtil.toastError("Choose ship");
        return;
    }

    if (startCoordinate === "" || endCoordinate === "") {
        toastUtil.toastError("Complete coordinates");
        return;
    }

    if (placedShipsLength.includes(selectedShip.length)) {
      toastUtil.toastError("You cannot place the same ship twice");
      return;
    }

    const startRow = startCoordinate.toUpperCase().charCodeAt(0) - 65;
    const startColumn = parseInt(startCoordinate.slice(1), 10) - 1;
    const endRow = endCoordinate.toUpperCase().charCodeAt(0) - 65;
    const endColumn = parseInt(endCoordinate.slice(1), 10) - 1;
  
    const adjustedStartRow = startRow + 1;
    const adjustedStartColumn = startColumn + 1;
    const adjustedEndRow = endRow + 1;
    const adjustedEndColumn = endColumn + 1;

    if(firstPlayerBattlefield.areCoordinatesOutOfRange(adjustedStartRow, adjustedStartColumn, adjustedEndRow, adjustedEndColumn)){
      toastUtil.toastError("Coordinates are out of range")
      return;
    }

    const distance = Math.max(
      Math.abs(adjustedEndRow - adjustedStartRow),
      Math.abs(adjustedEndColumn - adjustedStartColumn)
    );

    if (distance >= selectedShip.length) {
      toastUtil.toastError("Distance exceeds ship length");
      return;
    }

    if(firstPlayerBattlefield.areCellsOccupied(adjustedStartRow, adjustedStartColumn, adjustedEndRow, adjustedEndColumn, selectedShip)){
         toastUtil.toastError("Coordinates are occupied")  
         return;    
    }

    const distance1 = Math.abs(adjustedEndRow - adjustedStartRow) + Math.abs(adjustedEndColumn - adjustedStartColumn) + 1;


    if(distance1 < selectedShip.length){
       toastUtil.toastError("Distance is shorter than ship length")
       return;
    }

  
    firstPlayerBattlefield.placeShip(adjustedStartRow, adjustedStartColumn, adjustedEndRow, adjustedEndColumn, selectedShip);
  
    setPlacedShipsLength(prevLengths => [...prevLengths, selectedShip.length]);
    setStartCoordinate('')
    setEndCoordinate('');
    setSelectedShip(null);
  };

  const handleCellClick = (rowIndex, columnIndex, playerBattlefield) => {
    const accurateRowIndex = rowIndex + 1;
    const accurateColumnIndex = columnIndex + 1;

    if(playerBattlefield.user.numberOfUser == 1){
      setFirstPlayerBattlefield(prevBattlefield => {
        if (!prevBattlefield) {
          return prevBattlefield;
        }
      
        const newBattlefield = prevBattlefield.clone();
        newBattlefield.receiveHit(accurateRowIndex, accurateColumnIndex);
        setPlayerTurn(playerOne)
        console.log(playerTurn)
        return newBattlefield;
      });
    } else{
      setSecondPlayerBattlefield(prevBattlefield => {
        if (!prevBattlefield) {
          return prevBattlefield;
        }
      
        const newBattlefield = prevBattlefield.clone();
        newBattlefield.receiveHit(accurateRowIndex, accurateColumnIndex);
        setPlayerTurn(playerTwo)
        return newBattlefield;
      });
    }    
  };

  const machinePlay = () => {
    if (playerTurn.numberOfUser == 2) {
      setFirstPlayerBattlefield((prevBattlefield) => {

        const validCoordinatesRange = prevBattlefield.getValidCoordinatesRange();
        const startRow = validCoordinatesRange.startCoordinate.toUpperCase().charCodeAt(0) - 65 + 1;
        const startColumn = parseInt(validCoordinatesRange.startCoordinate.slice(1), 10);
        const endRow = validCoordinatesRange.endCoordinate.toUpperCase().charCodeAt(0) - 65 + 1;
        const endColumn = parseInt(validCoordinatesRange.endCoordinate.slice(1), 10);

        let randomRow = 0
        let randomColumn = 0

        while (machineAttackedCoordinates.has(`${randomRow}-${randomColumn}`)) {
           randomRow = Math.floor(Math.random() * (endRow - startRow + 1)) + startRow;
           randomColumn = Math.floor(Math.random() * (endColumn - startColumn + 1)) + startColumn;
        }
  
        // Registra las coordenadas atacadas
        setMachineAttackedCoordinates((prevCoordinates) => new Set(prevCoordinates.add(`${randomRow}-${randomColumn}`)));

        const newBattlefield = prevBattlefield.clone();
        newBattlefield.receiveHit(randomRow, randomColumn);
        setPlayerTurn(playerOne); 
        return newBattlefield;
      });
    }
  };
  
  useEffect(() => {
    machinePlay();
  }, [playerTurn]);
  
  


  useEffect(() => {
    console.log("secondPlayerBattlefield:", secondPlayerBattlefield);
  }, [secondPlayerBattlefield]);



  return (
    <>
      {placementFase ? (
        <>
          <h1>CHOOSE A SHIP</h1>
          <ShipSelectionBoard onSelectShip={(ship) => setSelectedShip(ship)} />
          <h1>SET COORDINATES</h1>
          <form onSubmit={handleFormSubmit}>
            <label>
            Start Coordinate:
            <input
              type="text"
              value={startCoordinate}
              placeholder="A1"
              onChange={(e) => setStartCoordinate(e.target.value)}
            />
            </label>
            <label>
              End Coordinate:
                <input
                type="text"
                value={endCoordinate}
                placeholder="A2"
                onChange={(e) => setEndCoordinate(e.target.value)}
                />
            </label>
               <button type="submit">PLACE SHIP</button>
            </form>
          <PlayerField battleField={firstPlayerBattlefield.board} />
          <Button onClick={finishPlacementFase}>BATTLE!</Button>
        </>
      ) : (
        <>
          {playerOne.isOutOfCombat || playerTwo.isOutOfCombat ? (
            <h1>Game Over</h1>
          ) : (
            <>
              <h1>{playerOne.nickname.toUpperCase()}</h1>
              <CombatPlayerField battleField={firstPlayerBattlefield} hiddenInfo={false} onCellClick={(rowIndex, columnIndex) => handleCellClick(rowIndex, columnIndex, firstPlayerBattlefield)} player={playerTurn} />
              <h1>{playerTwo.nickname}</h1>
              <CombatPlayerField battleField={secondPlayerBattlefield} hiddenInfo={true} onCellClick={(rowIndex, columnIndex) => handleCellClick(rowIndex, columnIndex, secondPlayerBattlefield)} player={playerTurn} />
            </>
          )}
        </>
      )}
    </>
  );
 
}

export default GameScreen;
