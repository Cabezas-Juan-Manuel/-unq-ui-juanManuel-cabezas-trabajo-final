export class BattleField {
  constructor(rows, columns, user) {
    this.user = user;
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
    this.user.fleet.push(ship)
    
    for (let i = 0; i < length; i++) {
      let row = startRow;
      let column = startColumn;
  
      if (startRow === endRow) {
        column += i;
      } else if (startColumn === endColumn) {
        row += i;
      }
  
      if (
        row >= 0 && row < this.board.length &&
        column >= 0 && column < this.board[0].length
      ) {
        this.board[row][column].ship = true;
        this.board[row][column].shipInfo = ship; 
        let shipCoordinates = { row, column };
        ship.coordinates.push(shipCoordinates);
      } else {
        console.log('  Coordinates outside the range of the board.');
      }
    }
  
  }

  receiveHit(row, column) {
    if (
      row >= 0 && row < this.board.length &&
      column >= 0 && column < this.board[0].length
    ) {
      if (this.board[row][column].ship) {
        let ship  = this.board[row][column].shipInfo
        console.log(`le pega a barco en: ${this.board[row][column].coordinates}`);
        ship.takeAHit(row, column) 
        if(ship.isSunk()){
          this.user.shipSunk(ship)
        }
      } else {
        console.log(`Agua en la coordenada: ${this.board[row][column].coordinates}`);
      }
      
      this.board[row][column].hit = true;   
  
      return this;
    } else {
      console.log('Coordenadas fuera del rango del tablero.');
    
      return this;
    }
  }

  getValidCoordinatesRange() {
    const numRows = this.board.length - 1;
    const numColumns = this.board[0].length - 1;

    const startCoordinate = this.board[0][0].coordinates;
    const endCoordinate = this.board[numRows - 1][numColumns - 1].coordinates;

    return {
      startCoordinate,
      endCoordinate,
    };
  }

  clone() {
    const clonedBattleField = new BattleField(0, 0);
  
    clonedBattleField.board = this.board.map(row => row.map(cell => ({ ...cell })));

    clonedBattleField.user = this.user;

  
    return clonedBattleField;
  }

  isCellClicked(row, column){
    return this.board[row][column].hit
  }
}