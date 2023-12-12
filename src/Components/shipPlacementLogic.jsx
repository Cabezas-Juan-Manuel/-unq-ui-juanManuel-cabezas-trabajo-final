import React, { useState } from "react";
import toastUtil from "../utilities/toastUtil";
import { Button } from "react-bootstrap";
import CoordinateInput from "../Components/coordinateInput";
import PlayerField from "./playerField";
import { Ship } from "../Objects/ship";
import ShipSelectionBoard from "./shipSelectionBoard"
import "./Styles/shipPlacementLogic.css"

const ShipPlacementLogic = ({ battlefield, finishPlacementFase }) => {
  const [selectedShip, setSelectedShip] = useState(null);
  const [startCoordinate, setStartCoordinate] = useState("");
  const [endCoordinate, setEndCoordinate] = useState("");
  const [placedShipsLength, setPlacedShipsLength] = useState([]);

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

    if(adjustedStartRow != adjustedEndRow && adjustedStartColumn != adjustedEndColumn){
      toastUtil.toastError("Ships must be placed horizontally or vertically")
      return
    }

    if(battlefield.areCoordinatesOutOfRange(adjustedStartRow, adjustedStartColumn, adjustedEndRow, adjustedEndColumn)){
      toastUtil.toastError("Coordinates are out of range")
      return;
    }

    if (adjustedStartRow > adjustedEndRow || adjustedStartColumn > adjustedEndColumn) {
      toastUtil.toastError("Coordinates are inverted.");
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

    if(battlefield.areCellsOccupied(adjustedStartRow, adjustedStartColumn, adjustedEndRow, adjustedEndColumn, selectedShip)){
         toastUtil.toastError("Coordinates are occupied")  
         return;    
    }

    const distance1 = Math.abs(adjustedEndRow - adjustedStartRow) + Math.abs(adjustedEndColumn - adjustedStartColumn) + 1;


    if(distance1 < selectedShip.length){
       toastUtil.toastError("Distance is shorter than ship length")
       return;
    }

  
    battlefield.placeShip(adjustedStartRow, adjustedStartColumn, adjustedEndRow, adjustedEndColumn, selectedShip);
  
    setPlacedShipsLength(prevLengths => [...prevLengths, selectedShip.length]);
    setStartCoordinate('')
    setEndCoordinate('');
    setSelectedShip(null);
  };

  const handleBattleClick = () => {
    if(placedShipsLength.length == 4){
      finishPlacementFase(battlefield);
      setPlacedShipsLength([])
    } else {
      toastUtil.toastError("place all ships")
    }
    ;
  };

  return (
    <div className="ship-placement-container">
  <div className="ship-selection">
    <h1 className="text-title">SELECT SHIP</h1>
    <ShipSelectionBoard onSelectShip={(ship) => setSelectedShip(ship)} />
  </div>
  <div className="ship-placement-form">
  <h1 className="text-title">SET COORDINATES</h1>
    <CoordinateInput
      label="Start Coordinate"
      value={startCoordinate}
      placeholder="A1"
      onChange={(value) => setStartCoordinate(value)}
    />
    <CoordinateInput
      label="End Coordinate"
      value={endCoordinate}
      placeholder="A2"
      onChange={(value) => setEndCoordinate(value)}
    />
    <button className="button-submit" type="submit" onClick={handleFormSubmit}>
      PLACE SHIP
    </button>
    <PlayerField battleField={battlefield.board} />
    <div className="button-container">
      <Button className="button-submit" onClick={handleBattleClick}>
        BATTLE!
      </Button>
    </div>
  </div>
</div>
  );
};

export default ShipPlacementLogic;