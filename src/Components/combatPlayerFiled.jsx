import React from 'react';
import './Styles/playerField.css';

function CombatPlayerField({ battleField, hiddenInfo }) {
  return (
    <div className="battle-field">
      {battleField.slice(1).map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.slice(1).map((cell, columnIndex) => (
            <div key={cell.coordinates} className={`cell ${cell.ship ? 'ship' : ''}`}>
              {/* Omitir las líneas que muestran las coordenadas */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CombatPlayerField;