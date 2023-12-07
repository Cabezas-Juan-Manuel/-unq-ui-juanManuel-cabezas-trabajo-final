import React from 'react';
import './Styles/shipSelectionBoard.css';
import { Ship } from '../Objects/ship';

function ShipSelectionBoard() {
    const carrier = new Ship(5)
    const crusier = new Ship(4)
    const submarine = new Ship(3)
    const boat = new Ship(2)

    const onSelectShip = (ship) =>{

    }

  return (
    <>
      <div className='a'>
      <div  className = "ships-name-container">  
      <h4 className='ship-name'>CARRIER</h4>
      <h4 className='ship-name'>CRUSIER</h4>
      <h4 className='ship-name'>SUBMARINE</h4>
      <h4 className='ship-name'>BOAT</h4>
      </div> 
      <div className='ships-container'>
        
        <img src="../../public/carrier.jpg" alt="carrier image"  className='ship-image' />
        
        <img src="../../public/crusier.jpg" alt="crusier image" className='ship-image'/>
        
        <img src="../../public/submarine.jpg" alt="submarine image" className='ship-image'/>
        
        <img src="../../public/boat.jpg" alt="boat image"className='ship-image hover-cursor' /> 
      </div>  
      </div>
    </>
  );
}

export default ShipSelectionBoard;