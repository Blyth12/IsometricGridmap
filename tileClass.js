//PRESET TRACK VALUES DEFENITION


// 1--------2--------4
// |                 |
// |                 |
// |                 |
// 128               8
// |                 |
// |                 |
// |                 |
// 64-------32-------16

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

// 0-NW , 1-N , 2-NE , 3-E , 4-SE , 5-S , 6-SW , 7-W
const TRACKJUNCTION = {
  NS: { 
    0: TRACKSTRAIGHT.NS | TRACKDIR.NE, // Dir 1
    1: TRACKSTRAIGHT.NS | TRACKDIR.NW, // Dir 1
    2: TRACKSTRAIGHT.NS | TRACKDIR.SE, // Dir 5
    3: TRACKSTRAIGHT.NS | TRACKDIR.SW }, // Dir 5

  EW: { 
    0: TRACKSTRAIGHT.EW | TRACKDIR.NE, // Dir 7
    1: TRACKSTRAIGHT.EW | TRACKDIR.SE, // Dir 7
    2: TRACKSTRAIGHT.EW | TRACKDIR.NW, // Dir 3
    3: TRACKSTRAIGHT.EW | TRACKDIR.SW }, // Dir 3

  SWNE: {
    0: TRACKSTRAIGHT.SWNE | TRACKDIR.N, // Dir 2
    1: TRACKSTRAIGHT.SWNE | TRACKDIR.E, // Dir 2
    2: TRACKSTRAIGHT.SWNE | TRACKDIR.S, // Dir 6
    3: TRACKSTRAIGHT.SWNE | TRACKDIR.W }, // Dir 6

  NWSE: {
    0: TRACKSTRAIGHT.NWSE | TRACKDIR.N, // Dir 0
    1: TRACKSTRAIGHT.NWSE | TRACKDIR.W, // Dir 0
    2: TRACKSTRAIGHT.NWSE | TRACKDIR.S, // Dir 4
    3: TRACKSTRAIGHT.NWSE | TRACKDIR.E } // Dir 4
}

const TRACKCURVE = {
  N: {
    0: TRACKDIR.N | TRACKDIR.SE, // Left
    1: TRACKDIR.N | TRACKDIR.SW }, // Right

  S: {
    0: TRACKDIR.S | TRACKDIR.NW, // Left
    1: TRACKDIR.S | TRACKDIR.NE }, // Right

  E: {
    0: TRACKDIR.E | TRACKDIR.SW, // left
    1: TRACKDIR.E | TRACKDIR.NW }, // Right

  W: {
    0: TRACKDIR.W | TRACKDIR.NE, // Left
    1: TRACKDIR.W | TRACKDIR.SE }, // Right

  NE: {
    0: TRACKDIR.NE | TRACKDIR.S, // Left
    1: TRACKDIR.NE | TRACKDIR.W }, // Right

  SE: {
    0: TRACKDIR.SE | TRACKDIR.W, // Left
    1: TRACKDIR.SE | TRACKDIR.N }, // Right

  NW: {
    1: TRACKDIR.NW | TRACKDIR.S, // Left
    0: TRACKDIR.NW | TRACKDIR.E }, // Right

  SW: {
    0: TRACKDIR.SW | TRACKDIR.N, // Left
    1: TRACKDIR.SW | TRACKDIR.E } // Right
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
  // console.log(emptyCombinations)
  // console.log(straightCombinations)
  // console.log(junctionCombinations)
  console.log(curveCombinations)
  // console.log(crossroadCombinations)
}


//TRACK TILE CLASS


var trackGrid = [] //Global declaration

class Tile {
    constructor() {
        this.track = [] // Used to store multiple tracks in an array
        this.newBitmask = 0
        this.trackBitmask = 0
        this.trackType = 0 // 0: Half, 1: Straight, 2: Curve, 3: Junction, 4: Crossroad
        this.activeJunction = 1 // 0 straight 1 turn
        this.isCurved = false // Used to turn diagonals into curves
        this.obstructed = false // Used to show if the tile is obstructed (no tracks can be placed here)
        this.locked = false
        this.occupied = false // Train ontop
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
      for (let i = 0; i < this.track.length; i++) {
        if (this.track[i] == rotation) {
          console.log("Track there")
          return this.track !== 0;
        }
      }
    }
}

function checkTrack(gx , gy) {
  let trackFound = false
  for(let i = 0; i < allCombinations.length; i++){
    if (allCombinations[i] == trackGrid[gy][gx].trackBitmask) {

      for(let i = 0; i < emptyCombinations.length; i++) {
        if (emptyCombinations[i] == trackGrid[gy][gx].trackBitmask) {
          trackGrid[gy][gx].trackType = 0
          trackFound = true
          break
          // console.log("EMpty")
        }
      }

      for(let i = 0; i < straightCombinations.length; i++) {
        if (straightCombinations[i] == trackGrid[gy][gx].trackBitmask) {
          trackGrid[gy][gx].trackType = 1
          trackFound = true
          break
          // console.log("Straight")
        }
      }

      for(let i = 0; i < curveCombinations.length; i++) {
        if (curveCombinations[i] == trackGrid[gy][gx].trackBitmask) {
          trackGrid[gy][gx].trackType = 2
          trackFound = true
          break
          // console.log("Curve")
        }
      }

      for(let i = 0; i < junctionCombinations.length; i++) {
        if (junctionCombinations[i] == trackGrid[gy][gx].trackBitmask) {
          trackGrid[gy][gx].trackType = 3
          trackGrid[gy][gx].locked = true
          trackFound = true
          break
          // console.log("Junction")
        }
      }

      for(let i = 0; i < crossroadCombinations.length; i++) {
        if (crossroadCombinations[i] == trackGrid[gy][gx].trackBitmask) {
          trackGrid[gy][gx].trackType = 4
          trackGrid[gy][gx].locked = true
          trackFound = true
          break
          // console.log("crossroad")
        }
      }
    }
  }
  if (trackFound == false) {
    trackGrid[gy][gx].trackType = 0
  }
  trackFound = false
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
  console.log(trackRotation + "TRACKROTATION")
  switch (trackRotation){
    case 1:
      trackGrid[tileY][tileX].trackBitmask += multiplier * 8
      trackGrid[tileY][tileX + 1].trackBitmask += multiplier * 128
      // trackGrid[tileY][tileX].checkTrack()
      break

    case 2:
      trackGrid[tileY][tileX].trackBitmask += multiplier * 16
      trackGrid[tileY + 1][tileX + 1].trackBitmask += multiplier * 1
      // trackGrid[tileY][tileX].checkTrack()
      break

    case 3:
      trackGrid[tileY][tileX].trackBitmask += multiplier * 32
      trackGrid[tileY + 1][tileX].trackBitmask += multiplier * 2
      // trackGrid[tileY][tileX].checkTrack()
      break

    case 4:
      trackGrid[tileY][tileX].trackBitmask += multiplier * 64
      trackGrid[tileY + 1][tileX - 1].trackBitmask += multiplier * 4
      // trackGrid[tileY][tileX].checkTrack()
      break
  }
}

function buildTrack() {
  if((!trackGrid[tileY][tileX].hasTrackThere(rotation)) && (trackGrid[tileY][tileX].locked == false) && (mapState[tileY][tileX] == 0) && (mapObstacles[tileY][tileX] == 0)) {
    trackGrid[tileY][tileX].addTrack(rotation)
    calculateBitmask(tileY, tileX, 1)
    playerMoney -= 100
  }
}

function spawnTrack(Y , X , R) {
  if(!trackGrid[Y][X].hasTrackThere(R)) {
    trackGrid[Y][X].addTrack(R)
    calculateBitmask(Y, X, 1)
  }
}

function despawnTrack(x , y) {
  if(trackGrid[y][x].trackBitmask != 0) {
    calculateBitmask(y, x, -1)
    trackGrid[y][x].removeTrack()
  }
}
  
function deleteTrack() {
  if(trackGrid[tileY][tileX].trackBitmask != 0) {
    calculateBitmask(tileY, tileX, -1)
    trackGrid[tileY][tileX].removeTrack()
    playerMoney -= 50
  }
}

