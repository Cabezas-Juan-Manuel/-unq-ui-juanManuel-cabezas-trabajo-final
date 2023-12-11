import { Ship } from "./ship";

export class Game {
    constructor() {
      this.attackedCoordinates = [];
    }
  
    attackPlayer(battlefield) {
      const validCoordinatesRange = battlefield.getValidCoordinatesRange();
  
      const startRow = validCoordinatesRange.startCoordinate.toUpperCase().charCodeAt(0) - 65 + 1;
      const startColumn = parseInt(validCoordinatesRange.startCoordinate.slice(1), 10);
      const endRow = validCoordinatesRange.endCoordinate.toUpperCase().charCodeAt(0) - 65 + 1;
      const endColumn = parseInt(validCoordinatesRange.endCoordinate.slice(1), 10);
  
      let randomRow = Math.floor(Math.random() * (endRow - startRow + 1)) + startRow;
      let randomColumn = Math.floor(Math.random() * (endColumn - startColumn + 1)) + startColumn;
  
      while ( this.attackedCoordinates.includes(`${randomRow}-${randomColumn}`)) {
        randomRow = Math.floor(Math.random() * (endRow - startRow + 1)) + startRow;
        randomColumn = Math.floor(Math.random() * (endColumn - startColumn + 1)) + startColumn;
      }
  
      this.attackedCoordinates.push(`${randomRow}-${randomColumn}`);
  
      const newBattlefield = battlefield.clone();
  
      newBattlefield.receiveHit(randomRow, randomColumn);
  
      return newBattlefield;
    }

    placeRandomShips(battlefield){
        let boat = new Ship(2);
        let submarine = new Ship(3);
        let crusier = new Ship(4);
        let carrier = new Ship(5);
  
        const shipsToPlace = [boat, submarine, crusier, carrier];
  
        shipsToPlace.forEach((ship) => {
            let placed = false;
  
            while (placed === false) {
                const validCoordinatesRange = battlefield.getValidCoordinatesRange();
  
                const ValidstartRow = validCoordinatesRange.startCoordinate.toUpperCase().charCodeAt(0) - 65 + 1;
                const ValidstartColumn = parseInt(validCoordinatesRange.startCoordinate.slice(1), 10);
                const ValidendRow = validCoordinatesRange.endCoordinate.toUpperCase().charCodeAt(0) - 65 + 1;
                const ValidendColumn = parseInt(validCoordinatesRange.endCoordinate.slice(1), 10);
  
                const randomStartRow = Math.floor(Math.random() * (ValidendRow - ValidstartRow + 1)) + ValidstartRow;
                const randomStartColumn = Math.floor(Math.random() * (ValidendColumn - ValidstartColumn + 1)) + ValidstartColumn;
  
       
                const randomOrientation = Math.floor(Math.random() * 2);
  
                let randomEndRow, randomEndColumn;
  
                if (randomOrientation === 0) {
                     randomEndRow = randomStartRow;
                    randomEndColumn = randomStartColumn + ship.length - 1;
                } else {
                  randomEndRow = randomStartRow + ship.length - 1;
                  randomEndColumn = randomStartColumn;
                }
    
                if (!battlefield.areCoordinatesOutOfRange(randomStartRow, randomStartColumn, randomEndRow, randomEndColumn) && 
                    !battlefield.areCellsOccupied(randomStartRow, randomStartColumn, randomEndRow, randomEndColumn)) {
                     battlefield.placeShip(
                        randomStartRow,
                        randomStartColumn,
                        randomEndRow,
                        randomEndColumn,
                        ship
                    );
                placed = true;
                }
            }
        });
        return battlefield
    };

    reset(){
        this.attackedCoordinates = [];
    }
}
