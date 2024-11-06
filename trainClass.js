class Pathfinding {
    constructor(map) {
        this.map = map
    }   

    findPath(start, end) {
        //ALGORITHM HERE - RESEARCH A* ALGORITHM
    }
}

let activeTrains = []

class Train {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.direction = 1 // 0 - North, 1 - East, 2 - South, 3 - West
        this.activeBitmask = 0
        this.path = []
        this.Pathfinding = new Pathfinding(map)
    }

    move() {
        this.activeBitmask = trackGrid[this.x][this.y].trackBitmask
        console.log("Bitmask " + this.activeBitmask)
    }
}


function spawnTrain() {
    activeTrains.push(new Train(10, 10))
}

function removeTrain() {

}

function moveTrains() {
    for (let i = 0; i < activeTrains.length; i++) {
        activeTrains[i].move()
      }
}