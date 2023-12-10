import React, { useState, useEffect } from 'react';
import './Styles/combatPlayerField.css';

function CombatPlayerField({ battleField, hiddenInfo, field }) {
  const [currentField, setCurrentField] = useState(field);

  useEffect(() => {
    setCurrentField(field);
  }, [field]);

  const handleCellClick = (rowIndex, columnIndex) => {
    const accurateRowIndex = rowIndex + 1;
    const accurateColumnIndex = columnIndex + 1;
    
    currentField.receiveHit(accurateRowIndex, accurateColumnIndex);
    console.log(`Celda clickeada en fila ${rowIndex}, columna ${columnIndex}`);
  };

  return (
    <div className="battle-field">
      {currentField.board.slice(1).map((row, rowIndex) => (
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

  if (cell.ship && !hiddenInfo) {
    cellStyle += 'ship';
  }

  if (cell.hit && cell.ship) {
    cellStyle += 'Shiphit ';
  }
  if(cell.hit && !cell.ship){
    cellStyle += 'Waterhit ';
  }

  return cellStyle.trim(); 
}

export default CombatPlayerField;


