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

  placeShip(startRow, startColumn, orientation, ship) {
    const length = ship.length;

    for (let i = 0; i < length; i++) {
      let row = startRow;
      let column = startColumn;

      if (orientation === 'horizontal') {
        column += i;
      } else if (orientation === 'vertical') {
        row += i;
      }

      if (
        row >= 0 && row < this.board.length &&
        column >= 0 && column < this.board[0].length &&
        row > 0 && column > 0
      ) {
        this.board[row][column].ship = true;
        this.board[row][column].shipInfo = ship; // Guardar información del barco en la celda
        let shipCoordinates = this.board[row][column].coordinates
        ship.coordinates.push({coordinates: shipCoordinates, hit: false});
        console.log(`Barco colocado en la coordenada: ${this.board[row][column].coordinates}`);
      } else {
        console.log('Coordenadas fuera del rango del tablero o en la primera fila/columna.');
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
}