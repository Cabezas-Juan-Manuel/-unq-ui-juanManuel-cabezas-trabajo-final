import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BattleField } from "../../Objects/battlefield";
import PlayerField from "../../Components/playerField";
import ShipSelectionBoard from "../../Components/shipSelectionBoard";
import { Button } from "react-bootstrap";
import "./gameScreen.css"
import toastUtil from "../../utilities/toastUtil";
import { Ship } from "../../Objects/ship";

function GameScreen() {


  const { nickname } = useParams();

  const [firstPlayerBattlefield, setfirstPlayerBattlefield] = useState(new BattleField(11, 11));
  const [secondPlayerBattlefield, setSecondPlayerBattlefield] = useState(new BattleField(11, 11));
  const [placementFase, setPlacementFase] = useState(true);
  const [selectedShip, setSelectedShip] = useState(null);
  const [startCoordinate, setStartCoordinate] = useState('');
  const [endCoordinate, setEndCoordinate] = useState('');
  const [placedShipsLength, setPlacedShipsLength] = useState([]);


  const finishPlacementFase = () => {
    placeRandomShips(secondPlayerBattlefield);
    setPlacementFase(false);
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

          const ValidstartRow = validCoordinatesRange.startCoordinate.toUpperCase().charCodeAt(0) - 65 +1;
          const ValidstartColumn = parseInt(validCoordinatesRange.startCoordinate.slice(1), 10) - 1 + 1;
          const ValidendRow = validCoordinatesRange.endCoordinate.toUpperCase().charCodeAt(0) - 65 + 1;
          const ValidendColumn = parseInt(validCoordinatesRange.endCoordinate.slice(1), 10) - 1 + 1;

          const randomStartRow = Math.floor(Math.random() * (ValidendRow - ValidstartRow + 1)) + ValidstartRow;
          const randomStartColumn = Math.floor(Math.random() * (ValidendColumn - ValidstartColumn + 1)) + ValidstartColumn;
          const randomEndRow = Math.floor(Math.random() * (ValidendRow - ValidstartRow + 1)) + ValidstartRow;
          const randomEndColumn = Math.floor(Math.random() * (ValidendColumn - ValidstartColumn + 1)) + ValidstartColumn;
                

          if(!battlefield.areCellsOccupied(randomStartRow, randomStartColumn, randomEndRow, randomEndColumn)){
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
  
    firstPlayerBattlefield.placeShip(adjustedStartRow, adjustedStartColumn, adjustedEndRow, adjustedEndColumn, selectedShip);
  
    setPlacedShipsLength(prevLengths => [...prevLengths, selectedShip.length]);
    setEndCoordinate('');
    setSelectedShip(null);
};

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
              placeholder="A,1"
              onChange={(e) => setStartCoordinate(e.target.value)}
            />
            </label>
            <label>
              End Coordinate:
                <input
                type="text"
                value={endCoordinate}
                placeholder="A,2"
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
        <PlayerField battleField={firstPlayerBattlefield.board} />
        <PlayerField battleField={secondPlayerBattlefield.board} />
        </>
      )}
    </>
  );
}

export default GameScreen;
