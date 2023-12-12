export class Ship {
  constructor(length) {
    this.length = length;
    this.coordinates = [];
    this.hit = Array(length).fill(false);
    this.sink = false;
  }

  isSunk() {
    return this.sink;
  }

  takeAHit(row, column) {
    const index = this.coordinates.findIndex(
      (coord) => coord.row === row && coord.column === column
    );

    if (index !== -1) {
      this.hit[index] = true;

      this.sink = this.hit.every((part) => part);

      return true;
    }

    return false;
  }

  getHitStatus() {
    return this.hit;
  }
}
