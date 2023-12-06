import React from 'react';
import './Styles/playerField.css';

function PlayerField({ battleField }) {
  return (
    <div className="battle-field">
      {battleField.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, columnIndex) => (
            <div key={cell.coordinates} className={`cell ${cell.ship ? 'ship' : ''}`}>
              {rowIndex > 0 && columnIndex === 0 ? String.fromCharCode(64 + rowIndex) : null }
              {rowIndex === 0 && columnIndex > 0 ? columnIndex  : null }
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default PlayerField;