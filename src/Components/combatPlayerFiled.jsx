import React, { useState, useEffect } from 'react';
import './Styles/combatPlayerField.css';

function CombatPlayerField({ battleField, hiddenInfo, onCellClick, player }) {
  let isSamePlayer = player.numberOfUser == battleField.user.numberOfUser;

  const handleCellClick = (rowIndex, columnIndex) => {
    if (!isSamePlayer) {
      onCellClick(rowIndex, columnIndex);
    }
  };


  return (
    <div className="battle-field">
      {battleField.board.slice(1).map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.slice(1).map((cell, columnIndex) => (
            <div
              key={cell.coordinates}
              className={`cell ${getCellStyle(cell, hiddenInfo)}`}
              onClick={() => handleCellClick(rowIndex, columnIndex)}
              style={{ pointerEvents: isSamePlayer ? 'none' : 'auto' }}
            >
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function getCellStyle(cell, hiddenInfo) {
  let cellStyle = '';
  let isSunk = cell.ship && cell.shipInfo.isSunk()
  if(isSunk){
    console.log(isSunk)
    cellStyle += 'Shipsunk';
  } else if (cell.hit && cell.ship) {
    cellStyle += 'Shiphit';
  } else if (cell.ship && !hiddenInfo) {
    cellStyle += 'ship';
  } else if (cell.hit && !cell.ship) {
    cellStyle += 'Waterhit';
  }
  return cellStyle.trim();
}

export default CombatPlayerField;



