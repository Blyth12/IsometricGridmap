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
  // console.log(multiplier)
  let latest = trackGrid[tileY][tileX].track.length - 1
  let trackRotation = trackGrid[tileY][tileX].track[latest]
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
  if(!trackGrid[tileY][tileX].hasTrackThere(rotation)) {
    trackGrid[tileY][tileX].addTrack(rotation)
    calculateBitmask(tileY, tileX, 1)
    playerMoney -= 100
  }
}
  
function deleteTrack() {
      calculateBitmask(tileY, tileX, -1)
      trackGrid[tileY][tileX].removeTrack()
      playerMoney -= 50
}

