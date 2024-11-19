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

let activeTrains = []

class Train {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.direction = 1 // 0-NW , 1-N , 2-NE , 3-E , 4-SE , 5-S , 6-SW , 7-W
        this.activeBitmask = 0
        this.activeTrackType = 0
        this.path = []
    }

    decideNextDirection() {
        this.activeTrackType = trackGrid[this.y][this.x].trackType
        switch (this.activeTrackType) {

            case 0: // Half
                this.direction = (this.direction + 4) % 8
                return this.direction
    
            case 1: // Straight
                return this.direction
    
            case 2: // Curve
            console.log("--Curve--")
                let curveType = trackGrid[this.y][this.x].trackBitmask
                console.log("Direction" + this.direction)
                console.log("Bitmask" + curveType)

                switch (this.direction) {

                    case 0:
                        if ((curveType & TRACKCURVE.SE[1]) == TRACKCURVE.SE[1]) {
                            this.direction = 1
                        }
                        if ((curveType & TRACKCURVE.SE[0]) == TRACKCURVE.SE[0]) {
                            this.direction = 7
                        }
                        return this.direction
                    
                    case 1:
                        if ((curveType & TRACKCURVE.S[1]) == TRACKCURVE.S[1]) {
                            this.direction = 2
                        }
                        if ((curveType & TRACKCURVE.S[0]) == TRACKCURVE.S[0]) {
                            this.direction = 0
                        }
                        return this.direction

                    case 2:
                        if ((curveType & TRACKCURVE.SW[1]) == TRACKCURVE.SW[1]) {
                            this.direction = 3
                        }
                        if ((curveType & TRACKCURVE.SW[0]) == TRACKCURVE.SW[0]) {
                            this.direction = 1
                        }
                        return this.direction

                    case 3:
                        if ((curveType & TRACKCURVE.W[1]) == TRACKCURVE.W[1]) {
                            this.direction = 4
                        }
                        if ((curveType & TRACKCURVE.W[0]) == TRACKCURVE.W[0]) {
                            this.direction = 2
                        }
                        return this.direction

                    case 4:
                        if ((curveType & TRACKCURVE.NW[1]) == TRACKCURVE.NW[1]) {
                            this.direction = 5
                        }
                        if ((curveType & TRACKCURVE.NW[0]) == TRACKCURVE.NW[0]) {
                            this.direction = 3
                        }
                        return this.direction

                    case 5:
                        if ((curveType & TRACKCURVE.N[1]) == TRACKCURVE.N[1]) {
                            this.direction = 6
                        }
                        if ((curveType & TRACKCURVE.N[0]) == TRACKCURVE.N[0]) {
                            this.direction = 4
                        }
                        return this.direction

                    case 6:
                        if ((curveType & TRACKCURVE.NE[1]) == TRACKCURVE.NE[1]) {
                            this.direction = 7
                        }
                        if ((curveType & TRACKCURVE.NE[0]) == TRACKCURVE.NE[0]) {
                            this.direction = 5
                        }
                        return this.direction

                    case 7:
                        if ((curveType & TRACKCURVE.E[1]) == TRACKCURVE.E[1]) {
                            this.direction = 0
                        }
                        if ((curveType & TRACKCURVE.E[0]) == TRACKCURVE.E[0]) {
                            this.direction = 6
                        }
                        return this.direction
                    
                }




    
            case 3: // Junction
    
            case 4: // Crossroad
                return this.direction
        }
    }

    move() {
        this.activeBitmask = trackGrid[this.y][this.x].trackBitmask
        let nextDirection = this.decideNextDirection()
        // console.log("bitmask " + this.activeBitmask)
        // console.log("direction " + checkDirection(this.activeBitmask , this.direction))
        // switch (checkDirection(this.activeBitmask , this.direction)) {
        switch (nextDirection) {
            case 0:
                this.x -= 1
                this.y -= 1
                break
            case 1:
                this.y -= 1
                break
            case 2:
                this.x += 1
                this.y -= 1
                break
            case 3:
                this.x += 1
                break
            case 4:
                this.x += 1
                this.y += 1
                break
            case 5:
                this.y += 1
                break
            case 6:
                this.x -= 1
                this.y += 1
                break
            case 7:
                this.x -= 1
                break
        }
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
    console.log("bitwise" + (activeBitmask & checkMask))
    return (activeBitmask & checkMask) // This performs the bitwise AND operation, where the two numbers binary values are compared to see if the current tile has any tracks in the direction of the trains direction
}



//check direction
// check 