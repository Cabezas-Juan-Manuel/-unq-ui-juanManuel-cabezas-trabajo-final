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
  const [playerTwo, setplayerTwo] = useState(new Player("cpu", 2));

  const [firstPlayerBattlefield, setfirstPlayerBattlefield] = useState(new BattleField(11, 11, playerOne));
  const [secondPlayerBattlefield, setSecondPlayerBattlefield] = useState(new BattleField(11, 11, playerTwo));

  const [placementFase, setPlacementFase] = useState(true);
  const [selectedShip, setSelectedShip] = useState(null);
  
  const [startCoordinate, setStartCoordinate] = useState('');
  const [endCoordinate, setEndCoordinate] = useState('');
  
  const [placedShipsLength, setPlacedShipsLength] = useState([]);

  const playerTurn = playerOne


  const finishPlacementFase = () => {
    if(placedShipsLength.length === 0){
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
  
        // Determinar la orientación aleatoria: 0 para horizontal, 1 para vertical
        const randomOrientation = Math.floor(Math.random() * 2);
  
        let randomEndRow, randomEndColumn;
  
        if (randomOrientation === 0) {
          // Orientación horizontal
          randomEndRow = randomStartRow;
          randomEndColumn = randomStartColumn + ship.length - 1;
        } else {
          // Orientación vertical
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


    console.log(distance1)
    console.log(distance)

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

    console.log(playerBattlefield.user)
    console.log(firstPlayerBattlefield)
    console.log(secondPlayerBattlefield)

    if(playerBattlefield.user.numberOfUser == 1){
      setfirstPlayerBattlefield(prevBattlefield => {
        if (!prevBattlefield) {
          console.error("Error: Battlefield is undefined");
          return prevBattlefield;
        }
      
        const newBattlefield = prevBattlefield.clone();
        newBattlefield.receiveHit(accurateRowIndex, accurateColumnIndex);
      
        console.log("After state update:", newBattlefield);
        return newBattlefield;
      });
    } else{
      setSecondPlayerBattlefield(prevBattlefield => {
        if (!prevBattlefield) {
          console.error("Error: Battlefield is undefined");
          return prevBattlefield;
        }
      
        const newBattlefield = prevBattlefield.clone();
        newBattlefield.receiveHit(accurateRowIndex, accurateColumnIndex);
      
        console.log("After state update:", newBattlefield);
        return newBattlefield;
      });
    }    
  };
  
  


  useEffect(() => {
    console.log("secondPlayerBattlefield:", secondPlayerBattlefield);
  }, [secondPlayerBattlefield]);

  console.log(playerTwo.isOutOfCombat)

  

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
        <CombatPlayerField battleField={firstPlayerBattlefield.board} hiddenInfo = {false} onCellClick={(rowIndex, columnIndex) => handleCellClick(rowIndex, columnIndex, firstPlayerBattlefield)}/>
        <CombatPlayerField battleField={secondPlayerBattlefield.board} hiddenInfo = {false} onCellClick={(rowIndex, columnIndex) => handleCellClick(rowIndex, columnIndex, secondPlayerBattlefield)}/>
        </>
      )}
    </>
  );


 
}

export default GameScreen;
