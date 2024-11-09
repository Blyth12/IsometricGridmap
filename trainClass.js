// 1--------2--------4
// |                 |
// |                 |
// |                 |
// 128               8
// |                 |
// |                 |
// |                 |
// 64-------32-------16

const DIRECTIONS = {  // Each directions bitmask consant
    N: 2,
    NE: 4,
    E: 8,
    SE: 16,
    S: 32,
    SW: 64,
    W: 128,
    NW: 1
}

const DIRECTIONS_CHECK = { // Every directions values. This means that north could be any combinations of bitmasks for N , NE and NW, same for every other direction.
    0: DIRECTIONS.N | DIRECTIONS.NE | DIRECTIONS.NW, // N : 2 | 8 | 1 = 11
    1: DIRECTIONS.E | DIRECTIONS.NE | DIRECTIONS.SE, // S : 4 | 8 | 16 = 28
    2: DIRECTIONS.S | DIRECTIONS.SE | DIRECTIONS.SW, // E : 32 | 16 | 64 = 112
    3: DIRECTIONS.W | DIRECTIONS.NW | DIRECTIONS.SW  // W : 128 | 1 | 64 = 193
}


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
        checkDirection(this.activeBitmask , this.direction)
        // switch (this.direction) {
        //     case 0: // North heading - Possible bitmasks, 1 , 2 , 4 , 

        //         switch (this.activeBitmask) {
        //             case 1:
        //                 this.activeBitmask
        //         }

        //         break

        //     case 1:
        //         break

        //     case 2:
        //         break

        //     case 3:
        //         break

        // }
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

function checkDirection(activeBitmask, direction) { // Used to check if there is a path in the direction the train is travelling
    let checkMask = DIRECTIONS_CHECK[direction] // Get the bitmask values for the trains direction
    console.log(activeBitmask & checkMask)
    return (activeBitmask & checkMask) != 0 // This performs the bitwise AND operation, where the two numbers binary values are compared to see if the current tile has any tracks in the direction of the trains direction
}