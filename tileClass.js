var trackGrid = [] //Global declaration

class Tile {
    constructor() {
        this.track = [] // Used to store multiple tracks in an array
        this.trackBitmask = 0
        // this.trackOutgoingBitmask = 0
        // this.trackIncomingBitmask = 0
        this.isCurved = false //Used to turn diagonals into curves
        // this.rotation = 0
    }

    addTrack(rotation) {
      this.track.push(rotation)
    }

    removeTrack() {
        this.track = 0
        trackState[tileY][tileX] = 0
    }

    hasTrack() {
        return this.track !== 0;
    }

    checkDoublePlacement() {

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

function calculateBitmask(tileY, tileX, multiplier) {
  console.log(multiplier)
  let trackRotation = trackGrid[tileY][tileX].track
  console.log(trackRotation)
  switch (trackRotation){
    case 1:
      trackGrid[tileY][tileX].trackBitmask += multiplier * 8
      trackGrid[tileY][tileX + 1].trackBitmask += multiplier * 128
      break

    case 2:
      trackGrid[tileY][tileX].trackBitmask += multiplier * 16
      trackGrid[tileY + 1][tileX + 1].trackBitmask += multiplier * 1
      break

    case 3:
      trackGrid[tileY][tileX].trackBitmask += multiplier * 32
      trackGrid[tileY + 1][tileX].trackBitmask += multiplier * 2
      break;

    case 4:
      trackGrid[tileY][tileX].trackBitmask += multiplier * 64
      trackGrid[tileY + 1][tileX - 1].trackBitmask += multiplier * 4
      break
  }
}

function buildTrack() {
  // if(!trackGrid[tileY][tileX].hasTrack()) {
    trackGrid[tileY][tileX].addTrack(rotation)
    // trackState[tileY][tileX] = rotation
    // trackGrid[tileY][tileX].track = rotation
    calculateBitmask(tileY, tileX, 1)
    playerMoney -= 100
  // }
}
  
function deleteTrack() {
    if (trackState[tileY][tileX] != 0) {
      calculateBitmask(tileY, tileX, -1)
      // trackState[tileY][tileX] = 0
      trackGrid[tileY][tileX].track = 0
      playerMoney -= 50
    }
}

