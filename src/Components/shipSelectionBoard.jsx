import React from "react";
import "./Styles/shipSelectionBoard.css";
import { Ship } from "../Objects/ship";

function ShipSelectionBoard({ onSelectShip }) {
  const carrier = new Ship(5);
  const crusier = new Ship(4);
  const submarine = new Ship(3);
  const boat = new Ship(2);

  return (
    <>
      <div className="board-container">  
      <div className="ship-container" onClick={() => onSelectShip(carrier)}>
          <img src="../../public/carrier.jpg" alt="carrier image" className="ship-image" />
          <div className="ship-details">
           <h4 className="ship-name">CARRIER</h4>
          <p className="ship-length">Length: 5</p>
          </div>
      </div>
      <div className="ship-container" onClick={() => onSelectShip(crusier)}>
          <img src="../../public/crusier.jpg" alt="crusier image" className="ship-image" />
          <div className="ship-details">
           <h4 className="ship-name">CRUSIER</h4>
          <p className="ship-length">Length: 4</p>
          </div>
      </div>
      <div className="ship-container" onClick={() => onSelectShip(submarine)}>
          <img src="../../public/submarine.jpg" alt="submarine image" className="ship-image" />
          <div className="ship-details">
          <h4 className="ship-name">SUBMARINE</h4>
          <p className="ship-length">Length: 3</p>
          </div>
      </div>
      <div className="ship-container" onClick={() => onSelectShip(boat)}>
          <img src="../../public/boat.jpg" alt="boat image" className="ship-image" />
          <div className="ship-details">
          <h4 className="ship-name">BOAT</h4>
          <p className="ship-length">Length: 2</p>
          </div>
      </div>
      </div>
    </>
  );
}

export default ShipSelectionBoard;
