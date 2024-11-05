class Pathfinding {
    constructor(map) {
        this.map = map
    }

    findPath(start, end) {
        //ALGORITHM HERE - RESEARCH A* ALGORITHM
    }
}

let trains = []

class Train {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.path = []
        this.Pathfinding = new Pathfinding(map)
    }

}


function spawnTrain() {
    trains.push(new Train(0, 0))
}