import React, { useState, useEffect } from 'react';
import './Styles/combatPlayerField.css';

function CombatPlayerField({ battleField, hiddenInfo, onCellClick, player }) {
  console.log(player)
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
              // Deshabilitar clic y hover si es el jugador uno
              style={{ pointerEvents: isSamePlayer ? 'none' : 'auto' }}
            >
              {/* Omitir las líneas que muestran las coordenadas */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function getCellStyle(cell, hiddenInfo) {
  let cellStyle = '';

  if (cell.hit && cell.ship) {
    cellStyle += 'Shiphit';
  } else if (cell.ship && !hiddenInfo) {
    cellStyle += 'ship';
  } else if (cell.hit && !cell.ship) {
    cellStyle += 'Waterhit';
  }

  return cellStyle.trim();
}

export default CombatPlayerField;



