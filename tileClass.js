var trackGrid = [] //Global declaration

class Tile {
    constructor() {
        this.track = 0
        this.trackBitmask = 0
        this.trackOutgoingBitmask = 0
        this.trackIncomingBitmask = 0
        this.isCurved = false //Used to turn diagonals into curves
        // this.rotation = 0
    }

    placeTrack(trackBitmask) {
        this.trackBitmask = trackBitmask
        trackState[tileY][tileX] = rotation + 1
    }

    removeTrack() {
        this.track = 0
        trackState[tileY][tileX] = 0
    }

    hasTrack() {
        return this.track !== 0;
    }

    // checkConnection(otherTile, direction) {
    //     if (!otherTile.hasTrack()) return false

    //     switch (direction)


    // }

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

function buildTrack() {
    if(!trackGrid[tileY][tileX].hasTrack()) {
      let trackBitmask
      switch (rotation){
        case 0:
          trackBitmask = 8
          break
  
        case 1:
          trackBitmask = 16
          break
  
        case 2:
          trackBitmask = 32
          break;
    
        case 3:
          trackBitmask = 64
          break
      }
      trackGrid[tileY][tileX].placeTrack(trackBitmask, tileY, tileX, rotation)
    }
}
  
function deleteTrack() {
    if (trackState[tileY][tileX] != 0) {
      trackState[tileY][tileX] = 0
      playerMoney -= 50
    }
}

