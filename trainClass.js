class Pathfinding {
    constructor(map) {
        this.map = map
    }

    findPath(start, end) {
        //ALGORITHM HERE - RESEARCH A* ALGORITHM
    }
}

class Train {
    constructor(x, y, map) {
        this.x = x
        this.y = y
        this.map = map
        this.path = []
        this.Pathfinding = new Pathfinding(map)
    }

}