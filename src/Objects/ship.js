export class Ship {
  constructor(length) {
    this.length = length;
    this.coordinates = []; // Array to store the ship's coordinates with hit status
    this.hit = Array(length).fill(false); // Initialize hit status for each part of the ship
    this.sink = false; // Initialize sink status
  }

  isSunk() {
    return this.sink;
  }

  takeAHit(row, column) {
    const index =  this.coordinates.findIndex(coord => coord.row === row && coord.column === column);
    console.log(this.coordinates)
    console.log(row, column)
    console.log(index)

    if (index !== -1) {
      // If the ship is hit at the specified coordinates
      this.hit[index] = true;
    

      // Check if the ship is sunk
      this.sink = this.hit.every(part => part);

      console.log(this.sink)

      return true; // Hit successful
    }

    return false; // Hit missed
  }

  // Add a method to get the hit status of each part of the ship
  getHitStatus() {
    return this.hit;
  }
}