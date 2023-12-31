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
        
        const index = this.fleet.findIndex((s) => s.length === lengthToRemove);
        if (index !== -1) {
          
          this.fleet.splice(index, 1);  
        }
        if(this.fleet.length === 0){
            this.isOutOfCombat = true
        }

      }

      reset(){
        this.fleet = [];
        this.isOutOfCombat = false;
      }
}