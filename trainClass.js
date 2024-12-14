let nextDestination
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
    constructor(x, y, dir, origin, destination, ID) {
        this.trainID = ID
        this.x = x
        this.y = y
        this.direction = dir // 0-NW , 1-N , 2-NE , 3-E , 4-SE , 5-S , 6-SW , 7-W
        this.activeBitmask = 0
        this.activeTrackType = 0
        this.origin = origin
        this.destination = destination
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
            console.log("Dirtection" + this.direction + "Junction")
            let junctionType = trackGrid[this.y][this.x].trackBitmask
            let junctionToggle = trackGrid[this.y][this.x].activeJunction   

                // switch (this.direction) {
                    // case 0 || 4:
                        if ((junctionType & TRACKJUNCTION.NWSE[0]) == TRACKJUNCTION.NWSE[0]) { // DONE
                            console.log("NWSE0 "+TRACKJUNCTION.NWSE[0])
                            if (this.direction == 0) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 4) { if (junctionToggle == 1) {this.direction = 0} } // Turn around if junction is blocking
                            if (this.direction == 5 && junctionToggle == 1) { this.direction = 4 }
                            if (this.direction == 5 && junctionToggle == 0) { this.direction = 1 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.NWSE[1]) == TRACKJUNCTION.NWSE[1]) { // DONE
                            console.log("NWSE1 "+TRACKJUNCTION.NWSE[1])
                            if (this.direction == 0) { this.direction = this.direction -= junctionToggle}
                            if (this.direction == 4) { if (junctionToggle == 1) {this.direction = 0} } // Turn around if junction is blocking
                            if (this.direction == 3 && junctionToggle == 1) { this.direction = 4 }
                            if (this.direction == 3 && junctionToggle == 0) { this.direction = 7 }
                            if (this.direction == -1) {this.direction = 7}
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.NWSE[2]) == TRACKJUNCTION.NWSE[2]) { // DONE
                            console.log("NWSE2 "+TRACKJUNCTION.NWSE[2])
                            if (this.direction == 4) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 0) { if (junctionToggle == 1) {this.direction = 4} } // Turn around if junction is blocking
                            if (this.direction == 1 && junctionToggle == 1) { this.direction = 0 }
                            if (this.direction == 1 && junctionToggle == 0) { this.direction = 5 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.NWSE[3]) == TRACKJUNCTION.NWSE[3]) { // DONE
                            console.log("NWSE3 "+TRACKJUNCTION.NWSE[3])
                            if (this.direction == 4) { this.direction = this.direction -= junctionToggle }
                            if (this.direction == 0) { if (junctionToggle == 1) {this.direction = 4} } // Turn around if junction is blocking
                            if (this.direction == 7 && junctionToggle == 1) { this.direction = 0 }
                            if (this.direction == 7 && junctionToggle == 0) { this.direction = 3 }
                            return this.direction
                        }

                    // case 1 || 5 || 6 || 4 || 0 || 2:
                        console.log("Direction: " + this.direction) 
                        if ((junctionType & TRACKJUNCTION.NS[0]) == TRACKJUNCTION.NS[0]) { // WORKS
                            console.log("NS0 "+TRACKJUNCTION.NS[0])
                            if (this.direction == 1) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 5) { if (junctionToggle == 1) {this.direction = 1} } // Turn around if junction is blocking
                            if (this.direction == 6 && junctionToggle == 1) { this.direction = 5 }
                            if (this.direction == 6 && junctionToggle == 0) { this.direction = 2 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.NS[1]) == TRACKJUNCTION.NS[1]) { // WORKS
                            console.log("NS1 "+TRACKJUNCTION.NS[1])
                            if (this.direction == 1) { this.direction = this.direction -= junctionToggle }
                            if (this.direction == 5) { if (junctionToggle == 1) {this.direction = 1} } // Turn around if junction is blocking
                            if (this.direction == 4 && junctionToggle == 1) { this.direction = 5 }
                            if (this.direction == 4 && junctionToggle == 0) { this.direction = 0 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.NS[2]) == TRACKJUNCTION.NS[2]) { // WORKS
                            console.log("NS2 "+TRACKJUNCTION.NS[2])
                            if (this.direction == 5) { this.direction = this.direction -= junctionToggle }
                            if (this.direction == 1) { if (junctionToggle == 1) {this.direction = 5} } // Turn around if junction is blocking
                            if (this.direction == 0 && junctionToggle == 1) { this.direction = 1 }
                            if (this.direction == 0 && junctionToggle == 0) { this.direction = 4 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.NS[3]) == TRACKJUNCTION.NS[3]) { // WORKS
                            console.log("NS3 "+TRACKJUNCTION.NS[3])
                            if (this.direction == 5) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 1) { if (junctionToggle == 1) {this.direction = 5} } // Turn around if junction is blocking
                            if (this.direction == 2 && junctionToggle == 1) { this.direction = 1 }
                            if (this.direction == 2 && junctionToggle == 0) { this.direction = 6 }
                            return this.direction
                        }

                    // case 2 || 6:
                        if ((junctionType & TRACKJUNCTION.SWNE[0]) == TRACKJUNCTION.SWNE[0]) { // DONE
                            console.log("SWNE0 "+TRACKJUNCTION.SWNE[0])
                            if (this.direction == 2) { this.direction = this.direction -= junctionToggle }
                            if (this.direction == 6) { if (junctionToggle == 1) {this.direction = 2} } // Turn around if junction is blocking
                            if (this.direction == 5 && junctionToggle == 1) { this.direction = 6 }
                            if (this.direction == 5 && junctionToggle == 0) { this.direction = 1 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.SWNE[1]) == TRACKJUNCTION.SWNE[1]) { // DONE
                            console.log("SWNE1 "+TRACKJUNCTION.SWNE[1])
                            if (this.direction == 2) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 6) { if (junctionToggle == 1) {this.direction = 2} } // Turn around if junction is blocking
                            if (this.direction == 7 && junctionToggle == 1) { this.direction = 6 }
                            if (this.direction == 7 && junctionToggle == 0) { this.direction = 3 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.SWNE[2]) == TRACKJUNCTION.SWNE[2]) { // DONE
                            console.log("SWNE2 "+TRACKJUNCTION.SWNE[2])
                            if (this.direction == 6) { this.direction = this.direction -= junctionToggle }
                            if (this.direction == 2) { if (junctionToggle == 1) {this.direction = 6} } // Turn around if junction is blocking
                            if (this.direction == 1 && junctionToggle == 1) { this.direction = 2 }
                            if (this.direction == 1 && junctionToggle == 0) { this.direction = 5 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.SWNE[3]) == TRACKJUNCTION.SWNE[3]) { // DONE
                            console.log("SWNE3 "+TRACKJUNCTION.SWNE[3])
                            if (this.direction == 6) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 2) { if (junctionToggle == 1) {this.direction = 6} } // Turn around if junction is blocking
                            if (this.direction == 3 && junctionToggle == 1) { this.direction = 2 }
                            if (this.direction == 3 && junctionToggle == 0) { this.direction = 7 }
                            return this.direction
                        }

                    // case 3 || 7:
                        if ((junctionType & TRACKJUNCTION.EW[0]) == TRACKJUNCTION.EW[0]) { //DONE
                            console.log("EW0 "+TRACKJUNCTION.EW[0])
                            if (this.direction == 3) { this.direction = this.direction -= junctionToggle }
                            if (this.direction == 7) { if (junctionToggle == 1) {this.direction = 3} } // Turn around if junction is blocking
                            if (this.direction == 6 && junctionToggle == 0) { this.direction = 2 }
                            if (this.direction == 6 && junctionToggle == 1) { this.direction = 7 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.EW[1]) == TRACKJUNCTION.EW[1]) { // DONE
                            console.log("EW1 "+TRACKJUNCTION.EW[1])
                            if (this.direction == 3) { this.direction = this.direction += junctionToggle }
                            if (this.direction == 7) { if (junctionToggle == 1) {this.direction = 3} } // Turn around if junction is blocking
                            if (this.direction == 0 && junctionToggle == 0) { this.direction = 4 }
                            if (this.direction == 0 && junctionToggle == 1) { this.direction = 7 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.EW[2]) == TRACKJUNCTION.EW[2]) { // DONE
                            console.log("EW2 "+TRACKJUNCTION.EW[2])
                            if (this.direction == 7) { this.direction = (this.direction += junctionToggle) % 8 }
                            if (this.direction == 3) { if (junctionToggle == 1) {this.direction = 7} } // Turn around if junction is blocking
                            if (this.direction == 4 && junctionToggle == 0) { this.direction = 0 }
                            if (this.direction == 4 && junctionToggle == 1) { this.direction = 3 }
                            return this.direction
                        }
                        if ((junctionType & TRACKJUNCTION.EW[3]) == TRACKJUNCTION.EW[3]) { // DONE
                            console.log("EW3 "+TRACKJUNCTION.EW[3])
                            if (this.direction == 7) { this.direction = (this.direction -= junctionToggle) % 8 }
                            if (this.direction == 3) { if (junctionToggle == 1) {this.direction = 3} } // Turn around if junction is blocking
                            if (this.direction == 2 && junctionToggle == 0) { this.direction = 6 }
                            if (this.direction == 2 && junctionToggle == 1) { this.direction = 3 }
                            return this.direction
                        }
                // }
    
            case 4: // Crossroad
                return this.direction
        }
    }

    move() {
        this.checkCollision()
        this.activeBitmask = trackGrid[this.y][this.x].trackBitmask
        let nextDirection = this.decideNextDirection()
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
        this.checkStationArrival()
    }

    checkStationArrival() {
        let originStation = false
        if (buildingGrid[this.y][this.x] instanceof Station) { // Station detector
            if (this.origin == buildingGrid[this.y][this.x].stationID) { // Origin station
                originStation = true
            }
            if (this.destination == buildingGrid[this.y][this.x].stationID) { // Destination station
                playerMoney += 1000 
                removeTrain(this.trainID)
                clearedTrains += 1
            }
            else { // Wrong station
                if (originStation == false) {
                    playerMoney -= 1000
                    removeTrain(this.trainID)
                }
            }
        }
    }

    checkCollision() { //WIP
        for (let i = 0; i < activeTrains.length; i++) {
            // console.log(activeTrains[i].x + ":" + activeTrains[i].y + " - " + this.x + ":" + this.y)
            if (activeTrains[i].trainID != this.trainID && activeTrains[i].x == this.x && activeTrains[i].y == this.y ) {
                playerMoney -= 1000
                let train1 = this.trainID
                let train2 = activeTrains[i].trainID
                collisionDamage(train1, train2, this.x, this.y)
            }
        }
    }
}

function removeTrain(a) {
    let delete1
    for (let i = 0; i < activeTrains.length; i++) {
        console.log(activeTrains[i])
        if (activeTrains[i].trainID == a) {
            delete1 = i
        }
    }
    if (delete1 !== undefined) {
        activeTrains.splice(delete1, 1)
    }
}

function collisionDamage(a, b, x, y) {
    let delete2, delete3
    for (let i = 0; i < activeTrains.length; i++) {
        console.log(activeTrains[i])
        if (activeTrains[i].trainID == a) {
            delete2 = i
        }
        if (activeTrains[i].trainID == b) {
            delete3 = i
        }
    }

    if (delete2 !== undefined && delete3 !== undefined) {
        if (delete2 > delete3) {
            activeTrains.splice(delete2, 1)
            activeTrains.splice(delete3, 1)
        } else {
            activeTrains.splice(delete3, 1)
            activeTrains.splice(delete2, 1)
        }
    }
    despawnTrack(x , y)
}

function decideDestination() {
    nextDestination = Math.floor(Math.random() * stationCount)
    return nextDestination
}


function spawnTrain(x, y, dir, origin) {
    decideDestination(origin)
    console.log("Dest:"+nextDestination +" "+ "Origin:"+origin)
    if (nextDestination == origin){
        if (origin != 0) {
            let random = Math.floor(Math.random() * 1)
            if (random == 0) {nextDestination -= 1}
            if (random == 1) {nextDestination += 1}
        }
        else {
            nextDestination += 1
        }
    }
    console.log(nextDestination + "DEST")
    let ID = activeTrains.length
    activeTrains.push(new Train(x, y, dir, origin, nextDestination, ID))
}

function moveTrains() {
    for (let i = 0; i < activeTrains.length; i++) {
        activeTrains[i].move()
      }
}