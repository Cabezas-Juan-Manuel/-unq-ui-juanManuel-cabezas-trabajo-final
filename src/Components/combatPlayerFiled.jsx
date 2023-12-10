import React, { useState, useEffect } from 'react';
import './Styles/combatPlayerField.css';

function CombatPlayerField({ battleField, hiddenInfo, onCellClick}) {
  

  const handleCellClick = (rowIndex, columnIndex) => {
    
    onCellClick(rowIndex, columnIndex);
  };
  console.log(battleField)

  return (
    <div className="battle-field">
      {battleField.slice(1).map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.slice(1).map((cell, columnIndex) => (
            <div
              key={cell.coordinates}
              className={`cell ${getCellStyle(cell, hiddenInfo)}`}
              onClick={() => handleCellClick(rowIndex, columnIndex)}
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


