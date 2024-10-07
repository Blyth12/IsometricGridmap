var trackGrid = [] //Global declaration

class Tile {
    constructor() {
        this.track = 0
        this.trackBitmask = 0
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