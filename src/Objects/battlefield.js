export class BattleField {
  constructor(rows, columns) {
    this.board = [];

    for (let i = 0; i < rows; i++) {
      const row = [];

      for (let j = 0; j < columns; j++) {
        row.push({
          coordinates: `${String.fromCharCode(65 + i)}${j + 1}`,
          hit: false,
          ship: false,
        });
      }

      this.board.push(row);
    }
  }

  areCoordinatesOutOfRange(adjustedStartRow, adjustedStartColumn, adjustedEndRow, adjustedEndColumn){
    const numRows = this.board.length;
    const numColumns = this.board[0].length;

        return(
      adjustedStartRow < 0 ||
      adjustedStartRow >= numRows ||
      adjustedStartColumn < 0 ||
      adjustedStartColumn >= numColumns ||
      adjustedEndRow < 0 ||
      adjustedEndRow >= numRows ||
      adjustedEndColumn < 0 ||
      adjustedEndColumn >= numColumns
    );
  }

  isCellOccupied(row, column) {
    return this.board[row][column].ship;
  }

  areCellsOccupied(adjustedStartRow, adjustedStartColumn, adjustedEndRow, adjustedEndColumn){
    for (let row = adjustedStartRow; row <= adjustedEndRow; row++) {
      for (let column = adjustedStartColumn; column <= adjustedEndColumn; column++) {
        if (this.isCellOccupied(row, column)) {
          return true;
        } 
      }
    }
  } 

  placeShip(startRow, startColumn, endRow, endColumn, ship) {
    const length = ship.length;
  
    for (let i = 0; i < length; i++) {
      let row = startRow;
      let column = startColumn;
  
      // Calculate the current position based on orientation and iteration
      if (startRow === endRow) {
        // Horizontal placement
        column += i;
      } else if (startColumn === endColumn) {
        // Vertical placement
        row += i;
      }
  
      if (
        row >= 0 && row < this.board.length &&
        column >= 0 && column < this.board[0].length
      ) {
        this.board[row][column].ship = true;
        this.board[row][column].shipInfo = ship; // Save ship information in the cell
        let shipCoordinates = this.board[row][column].coordinates;
        ship.coordinates.push({ coordinates: shipCoordinates, hit: false });
        console.log(`Ship placed at coordinates: ${this.board[row][column].coordinates}`);
      } else {
        console.log('Coordinates outside the range of the board.');
      }
    }
  }

  receiveHit(row, column) {
    if (
      row >= 0 && row < this.board.length &&
      column >= 0 && column < this.board[0].length
    ) {
      if (this.board[row][column].ship) {
        console.log(`¡Barco alcanzado en la coordenada: ${this.board[row][column].coordinates}!`);
      } else {
        console.log(`Agua en la coordenada: ${this.board[row][column].coordinates}`);
      }

      this.board[row][column].hit = true;
    } else {
      console.log('Coordenadas fuera del rango del tablero.');
    }
  }

  getValidCoordinatesRange() {
    const numRows = this.board.length;
    const numColumns = this.board[0].length;

    const startCoordinate = this.board[0][0].coordinates;
    const endCoordinate = this.board[numRows - 1][numColumns - 1].coordinates;

    return {
      startCoordinate,
      endCoordinate,
    };
  }
}