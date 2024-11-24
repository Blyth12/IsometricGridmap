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
    constructor(x, y, dir) {
        this.x = x
        this.y = y
        this.direction = dir // 0-NW , 1-N , 2-NE , 3-E , 4-SE , 5-S , 6-SW , 7-W
        this.activeBitmask = 0
        this.activeTrackType = 0
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
            console.log("Junction")
            let junctionType = trackGrid[this.y][this.x].trackBitmask
            let junctionToggle = trackGrid[this.y][this.x].activeJunction   

                // switch (this.direction) {
                    // case 0 || 4:
                        if ((junctionType & TRACKJUNCTION.NWSE[0]) == TRACKJUNCTION.NWSE[0]) {
                            console.log("NWSE0 "+TRACKJUNCTION.NWSE[0])
                            if (this.direction == 0) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 4) { if (junctionToggle == 1) {this.direction = 4} } // Turn around if junction is blocking
                            if (this.direction == 5) { this.direction = 4 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.NWSE[1]) == TRACKJUNCTION.NWSE[1]) {
                            console.log("NWSE1 "+TRACKJUNCTION.NWSE[1])
                            if (this.direction == 0) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 4) { if (junctionToggle == 1) {this.direction = 4} } // Turn around if junction is blocking
                            if (this.direction == 3) { this.direction = 4 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.NWSE[2]) == TRACKJUNCTION.NWSE[2]) {
                            console.log("NWSE2 "+TRACKJUNCTION.NWSE[2])
                            if (this.direction == 4) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 0) { if (junctionToggle == 1) {this.direction = 0} } // Turn around if junction is blocking
                            if (this.direction == 7) { this.direction = 0 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.NWSE[3]) == TRACKJUNCTION.NWSE[3]) {
                            console.log("NWSE3 "+TRACKJUNCTION.NWSE[3])
                            if (this.direction == 4) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 0) { if (junctionToggle == 1) {this.direction = 0} } // Turn around if junction is blocking
                            if (this.direction == 1) { this.direction = 0 }
                            return this.direction
                        }

                    // case 1 || 5 || 6 || 4 || 0 || 2:
                        console.log("Direction: " + this.direction)
                        if ((junctionType & TRACKJUNCTION.NS[0]) == TRACKJUNCTION.NS[0]) {
                            console.log("NS0 "+TRACKJUNCTION.NS[0])
                            if (this.direction == 1) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 5) { if (junctionToggle == 1) {this.direction = 1} } // Turn around if junction is blocking
                            if (this.direction == 6) { this.direction = 5 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.NS[1]) == TRACKJUNCTION.NS[1]) {
                            console.log("NS1 "+TRACKJUNCTION.NS[1])
                            if (this.direction == 1) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 5) { if (junctionToggle == 1) {this.direction = 1} } // Turn around if junction is blocking
                            if (this.direction == 4) { this.direction = 5 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.NS[2]) == TRACKJUNCTION.NS[2]) {
                            console.log("NS2 "+TRACKJUNCTION.NS[2])
                            if (this.direction == 5) { this.direction = this.direction -= junctionToggle }
                            if (this.direction == 1) { if (junctionToggle == 1) {this.direction = 5} } // Turn around if junction is blocking
                            if (this.direction == 0) { this.direction = 1 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.NS[3]) == TRACKJUNCTION.NS[3]) {
                            console.log("NS3 "+TRACKJUNCTION.NS[3])
                            if (this.direction == 5) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 1) { if (junctionToggle == 1) {this.direction = 5} } // Turn around if junction is blocking
                            if (this.direction == 2) { this.direction = 1 }
                            return this.direction
                        }

                    // case 2 || 6:
                        if ((junctionType & TRACKJUNCTION.SWNE[0]) == TRACKJUNCTION.SWNE[0]) {
                            console.log("SWNE0 "+TRACKJUNCTION.SWNE[0])
                            if (this.direction == 2) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 6) { if (junctionToggle == 1) {this.direction = 2} } // Turn around if junction is blocking
                            if (this.direction == 7) { this.direction = 6 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.SWNE[1]) == TRACKJUNCTION.SWNE[1]) {
                            console.log("SWNE1 "+TRACKJUNCTION.SWNE[1])
                            if (this.direction == 2) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 6) { if (junctionToggle == 1) {this.direction = 2} } // Turn around if junction is blocking
                            if (this.direction == 5) { this.direction = 6 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.SWNE[2]) == TRACKJUNCTION.SWNE[2]) {
                            console.log("SWNE2 "+TRACKJUNCTION.SWNE[2])
                            if (this.direction == 6) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 2) { if (junctionToggle == 1) {this.direction = 6} } // Turn around if junction is blocking
                            if (this.direction == 1) { this.direction = 2 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.SWNE[3]) == TRACKJUNCTION.SWNE[3]) {
                            console.log("SWNE3 "+TRACKJUNCTION.SWNE[3])
                            if (this.direction == 6) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 2) { if (junctionToggle == 1) {this.direction = 6} } // Turn around if junction is blocking
                            if (this.direction == 3) { this.direction = 2 }
                            return this.direction
                        }

                    // case 3 || 7:
                        if ((junctionType & TRACKJUNCTION.EW[0]) == TRACKJUNCTION.EW[0]) {
                            console.log("EW0 "+TRACKJUNCTION.EW[0])
                            if (this.direction == 3) { this.direction = this.direction -= junctionToggle }
                            if (this.direction == 7) { if (junctionToggle == 1) {this.direction = 7} } // Turn around if junction is blocking
                            if (this.direction == 6) { this.direction = 7 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.EW[1]) == TRACKJUNCTION.EW[1]) {
                            console.log("EW1 "+TRACKJUNCTION.EW[1])
                            if (this.direction == 3) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 7) { if (junctionToggle == 1) {this.direction = 7} } // Turn around if junction is blocking
                            if (this.direction == 0) { this.direction = 7 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.EW[2]) == TRACKJUNCTION.EW[2]) {
                            console.log("EW2 "+TRACKJUNCTION.EW[2])
                            if (this.direction == 7) { this.direction = (this.direction += junctionToggle) % 8 }
                            if (this.direction == 3) { if (junctionToggle == 1) {this.direction = 3} } // Turn around if junction is blocking
                            if (this.direction == 4) { this.direction = 3 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.EW[3]) == TRACKJUNCTION.EW[3]) {
                            console.log("EW3 "+TRACKJUNCTION.EW[3])
                            if (this.direction == 7) { this.direction = (this.direction += junctionToggle) % 8 }
                            if (this.direction == 3) { if (junctionToggle == 1) {this.direction = 3} } // Turn around if junction is blocking
                            if (this.direction == 2) { this.direction = 3 }
                            return this.direction
                        }
                // }
    
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
            case -1:
                break
            case 0:
                if(this.x != 0) {this.x -= 1} // if statments prevent the train going off the map!
                if(this.y != 0) {this.y -= 1}
                break
            case 1:
                if(this.y != 0) {this.y -= 1}
                break
            case 2:
                if(this.x != 19) {this.x += 1}
                if(this.y != 0) {this.y -= 1}
                break
            case 3:
                if(this.x != 19) {this.x += 1}
                break
            case 4:
                if(this.x != 19) {this.x += 1}
                if(this.y != 19) {this.y += 1}
                break
            case 5:
                if(this.y != 19) {this.y += 1}
                break
            case 6:
                if(this.x != 0) {this.x -= 1}
                if(this.y != 19) {this.y += 1}
                break
            case 7:
                if(this.x != 0) {this.x -= 1}
                break
        }
    }
}


function spawnTrain(x, y, dir) {
    activeTrains.push(new Train(x, y, dir))
}

function removeTrain() {

}

function moveTrains() {
    for (let i = 0; i < activeTrains.length; i++) {
        activeTrains[i].move()
      }
}

// function checkDirection(activeBitmask, direction) { // Used to check if there is a path in the direction the train is travelling
//     let checkMask = DIRECTIONS_CHECK[direction] // Get the bitmask values for the trains direction
//     console.log("bitwise" + (activeBitmask & checkMask))
//     return (activeBitmask & checkMask) // This performs the bitwise AND operation, where the two numbers binary values are compared to see if the current tile has any tracks in the direction of the trains direction
// }



//check direction
// check 