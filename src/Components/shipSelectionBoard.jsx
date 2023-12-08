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
      <div className="a">
        <div className="ships-name-container">
          <h4 className="ship-name">CARRIER(5)</h4>
          <h4 className="ship-name">CRUISER(4)</h4>
          <h4 className="ship-name">SUBMARINE(3)</h4>
          <h4 className="ship-name">BOAT(2)</h4>
        </div>
        <div className="ships-container">
          <img src="../../public/carrier.jpg" alt="carrier image" className="ship-image" onClick={() => onSelectShip(carrier)} />
          <img src="../../public/crusier.jpg" alt="cruiser image" className="ship-image" onClick={() => onSelectShip(crusier)} />
          <img src="../../public/submarine.jpg" alt="submarine image" className="ship-image" onClick={() => onSelectShip(submarine)} />
          <img src="../../public/boat.jpg" alt="boat image" className="ship-image hover-cursor" onClick={() => onSelectShip(boat)} />
        </div>
      </div>
    </>
  );
}

export default ShipSelectionBoard;
