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
              className={`cell-base ${getCellStyle(cell, hiddenInfo)}`}
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
  let cellClasses = '';

  let isSunk = cell.ship && cell.shipInfo.isSunk();

  if (isSunk) {
    cellClasses += ' ship-sunk';
  } else if (cell.hit && cell.ship) {
    cellClasses += ' ship-hit';
  } else if (cell.ship && !hiddenInfo) {
    cellClasses += ' ship';
  } else if (cell.hit && !cell.ship) {
    cellClasses += ' water-hit';
  }

  return cellClasses.trim();
}

export default CombatPlayerField;



