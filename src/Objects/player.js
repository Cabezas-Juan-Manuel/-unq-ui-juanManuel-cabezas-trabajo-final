export class Player {
    constructor(nickname, numberOfUser) {
      this.nickname = nickname;
      this.numberOfUser = numberOfUser;
      this.fleet = [];
      this.isOutOfCombat = false
    }

    addShip(ship){
        this.fleet.push(ship)
    }

    shipSunk(ship) {
        const lengthToRemove = ship.length;
        
        // Find the index of the ship with the same length in the fleet
        const index = this.fleet.findIndex((s) => s.length === lengthToRemove);
        if (index !== -1) {
          console.log(1)
        
          this.fleet.splice(index, 1);  
        }
        if(this.fleet.length == 0){
            this.isOutOfCombat = true
        }

      }
}