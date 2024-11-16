// 1--------2--------4
// |                 |
// |                 |
// |                 |
// 128               8
// |                 |
// |                 |
// |                 |
// 64-------32-------16

var trackGrid = [] //Global declaration

const TRACKDIR = {
  N: 2,
  NE: 4,
  E: 8,
  SE: 16,
  S: 32,
  SW: 64,
  W: 128,
  NW: 1
}

const TRACKSTRAIGHT = {
  NS: TRACKDIR.N | TRACKDIR.S,          // 2 | 32 = 34
  EW: TRACKDIR.E | TRACKDIR.W,          // 8 | 128 = 136
  SWNE: TRACKDIR.SW | TRACKDIR.NE,      // 64 | 4 = 68
  NWSE: TRACKDIR.NW | TRACKDIR.SE       // 1 | 16 = 17
}

const TRACKCROSSROAD = {
  0: TRACKSTRAIGHT.NS | TRACKSTRAIGHT.EW,
  1: TRACKSTRAIGHT.SWNE | TRACKSTRAIGHT.NWSE
}

const TRACKJUNCTION = {
  NS: { 
    NE: TRACKSTRAIGHT.NS | TRACKDIR.NE,
    NW: TRACKSTRAIGHT.NS | TRACKDIR.NW,
    SE: TRACKSTRAIGHT.NS | TRACKDIR.SE,
    SW: TRACKSTRAIGHT.NS | TRACKDIR.SW },

  EW: { 
    NE: TRACKSTRAIGHT.EW | TRACKDIR.NE,
    NW: TRACKSTRAIGHT.EW | TRACKDIR.NW,
    SE: TRACKSTRAIGHT.EW | TRACKDIR.SE,
    SW: TRACKSTRAIGHT.EW | TRACKDIR.SW },

  SWNE: {
    N: TRACKSTRAIGHT.SWNE | TRACKDIR.N,
    S: TRACKSTRAIGHT.SWNE | TRACKDIR.S,
    E: TRACKSTRAIGHT.SWNE | TRACKDIR.E,
    W: TRACKSTRAIGHT.SWNE | TRACKDIR.W },

  NWSE: {
    N: TRACKSTRAIGHT.NWSE | TRACKDIR.N,
    S: TRACKSTRAIGHT.NWSE | TRACKDIR.S,
    E: TRACKSTRAIGHT.NWSE | TRACKDIR.E,
    W: TRACKSTRAIGHT.NWSE | TRACKDIR.W }
}

const TRACKCURVE = {
  N: {
    0: TRACKDIR.N | TRACKDIR.SW,
    1: TRACKDIR.N | TRACKDIR.SE },

  S: {
    0: TRACKDIR.S | TRACKDIR.NW,
    1: TRACKDIR.S | TRACKDIR.NE },

  E: {
    0: TRACKDIR.E | TRACKDIR.NW,
    1: TRACKDIR.E | TRACKDIR.SW },

  W: {
    0: TRACKDIR.W | TRACKDIR.NE,
    1: TRACKDIR.W | TRACKDIR.SE },

  NE: {
    0: TRACKDIR.NE | TRACKDIR.S,
    1: TRACKDIR.NE | TRACKDIR.W },

  SE: {
    0: TRACKDIR.SE | TRACKDIR.N,
    1: TRACKDIR.SE | TRACKDIR.W },

  NW: {
    0: TRACKDIR.NW | TRACKDIR.S,
    1: TRACKDIR.NW | TRACKDIR.E },

  SW: {
    0: TRACKDIR.SW | TRACKDIR.N,
    1: TRACKDIR.SW | TRACKDIR.E }
}

let allCombinations = []
let emptyCombinations = []
let straightCombinations = []
let curveCombinations = []
let junctionCombinations = [] // Require a straight conbination to be created
let crossroadCombinations = []

function setTrackValues() {
  for (const emptyDirection in TRACKDIR) {
    emptyCombinations.push(TRACKDIR[emptyDirection])
    allCombinations.push(TRACKDIR[emptyDirection])
  }

  for (const straightDirection in TRACKSTRAIGHT) {
    straightCombinations.push(TRACKSTRAIGHT[straightDirection])
    allCombinations.push(TRACKSTRAIGHT[straightDirection])
  }

  for (const crossroadDirection in TRACKCROSSROAD) {
    crossroadCombinations.push(TRACKCROSSROAD[crossroadDirection])
    allCombinations.push(TRACKCROSSROAD[crossroadDirection])
  }

  for (const junctionType in TRACKJUNCTION) {
    for (const junctionDirection in TRACKJUNCTION[junctionType]) {
      junctionCombinations.push(TRACKJUNCTION[junctionType][junctionDirection])
      allCombinations.push(TRACKJUNCTION[junctionType][junctionDirection])
    }
  }

  for (const curveType in TRACKCURVE) {
    for (const curveDirection in TRACKCURVE[curveType]) {
      curveCombinations.push(TRACKCURVE[curveType][curveDirection])
      allCombinations.push(TRACKCURVE[curveType][curveDirection])
    }
  }
  console.log(emptyCombinations)
  console.log(straightCombinations)
  console.log(junctionCombinations)
  console.log(curveCombinations)
  console.log(crossroadCombinations)
}

class Tile {
    constructor() {
        this.track = [] // Used to store multiple tracks in an array
        this.newBitmask = 0
        this.trackBitmask = 0
        this.trackType = 0 // 0: Half, 1: Straight, 2: Curve, 3: Junction, 4: Crossroad
        this.isCurved = false // Used to turn diagonals into curves
        this.obstructed = false // Used to show if the tile is obstructed (no tracks can be placed here)
        this.locked = false
    }

    addTrack(rotation) {
      this.track.push(rotation)
      console.log(TRACKCURVE)
    }

    removeTrack() {
      this.locked = false
      this.track = []
    }

    hasTrackThere(rotation) {
      for (let i = 0; i < trackGrid[tileY][tileX].track.length; i++) {
        if (trackGrid[tileY][tileX].track[i] == rotation) {
          console.log("Track there")
          return this.track !== 0;
        }
      }
    }

    checkTrack() {
      for(let i = 0; i < allCombinations.length; i++){
        if (allCombinations[i] == this.trackBitmask && this.locked == false) {

          for(let i = 0; i < emptyCombinations.length; i++) {
            if (emptyCombinations[i] == this.trackBitmask) {
              this.trackType = 0
              console.log("EMpty")
            }
          }

          for(let i = 0; i < straightCombinations.length; i++) {
            if (straightCombinations[i] == this.trackBitmask) {
              this.trackType = 1
              console.log("Straight")
            }
          }

          for(let i = 0; i < curveCombinations.length; i++) {
            if (curveCombinations[i] == this.trackBitmask) {
              this.trackType = 2
              console.log("Curve")
            }
          }

          for(let i = 0; i < junctionCombinations.length; i++) {
            if (junctionCombinations[i] == this.trackBitmask) {
              this.trackType = 3
              this.locked = true
              console.log("Junction")
            }
          }

          for(let i = 0; i < crossroadCombinations.length; i++) {
            if (crossroadCombinations[i] == this.trackBitmask) {
              this.trackType = 4
              this.locked = true
              console.log("crossroad")
            }
          }



        
        }
      }
    }

}

function createTrackGrid() {
    trackGrid = []
    for (let tGx = Xtiles - 1; tGx >= 0; tGx--) {
        let row = []
        for (let tGy = 0; tGy < Ytiles; tGy++) {
            row.push(new Tile())
        }
        trackGrid.push(row)
    }
}

function calculateBitmask(tileY, tileX, multiplier) { // This will calculate the tile bitmask value for any tracks placed / removed. See the bottom of the file for a diagram of the bitmask.
  let latest = trackGrid[tileY][tileX].track.length - 1
  let trackRotation = trackGrid[tileY][tileX].track[latest]
  console.log(trackRotation)
  switch (trackRotation){
    case 1:
      trackGrid[tileY][tileX].trackBitmask += multiplier * 8
      trackGrid[tileY][tileX + 1].trackBitmask += multiplier * 128
      trackGrid[tileY][tileX].checkTrack()
      break

    case 2:
      trackGrid[tileY][tileX].trackBitmask += multiplier * 16
      trackGrid[tileY + 1][tileX + 1].trackBitmask += multiplier * 1
      trackGrid[tileY][tileX].checkTrack()
      break

    case 3:
      trackGrid[tileY][tileX].trackBitmask += multiplier * 32
      trackGrid[tileY + 1][tileX].trackBitmask += multiplier * 2
      trackGrid[tileY][tileX].checkTrack()
      break

    case 4:
      trackGrid[tileY][tileX].trackBitmask += multiplier * 64
      trackGrid[tileY + 1][tileX - 1].trackBitmask += multiplier * 4
      trackGrid[tileY][tileX].checkTrack()
      break
  }
}

function buildTrack() {
  if(!trackGrid[tileY][tileX].hasTrackThere(rotation)) {
    trackGrid[tileY][tileX].addTrack(rotation)
    calculateBitmask(tileY, tileX, 1)
    playerMoney -= 100
  }
}

function spawnTrack(Y , X , R) {
  if(!trackGrid[Y][X].hasTrackThere(R)) {
    trackGrid[Y][X].addTrack(R)
    calculateBitmask(Y, X, 1)
    playerMoney -= 100
  }
}
  
function deleteTrack() {
      calculateBitmask(tileY, tileX, -1)
      trackGrid[tileY][tileX].removeTrack()
      playerMoney -= 50
}


// 1--------2--------4
// |                 |
// |                 |
// |                 |
// 128               8
// |                 |
// |                 |
// |                 |
// 64-------32-------16

