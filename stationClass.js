var buildingGrid = []

class Station {
    constructor(rotation, x, y) {
        this.rotation = rotation
        this.x = x
        this.y = y
        this.timer = 0
        this.colour = 0
    }

    createStation() {

    }

    stationTimer() {

    }

    spawnTrain() {
        
    }

}

function createRandomStation() {
    let face = Math.floor(Math.random() * 4)
    // console.log(face)
    let coordinate
    switch (face) {
        case 0:
            coordinate = Math.floor(Math.random() * 20)
            buildingGrid[coordinate][0] = new Station(0 , coordinate , 0)
            break
        case 1:
            coordinate = Math.floor(Math.random() * 20)
            buildingGrid[19][coordinate] = new Station(1 , 19 , coordinate)
            break
        case 2:
            coordinate = Math.floor(Math.random() * 20)
            buildingGrid[coordinate][19] = new Station(2 , coordinate , 19)
            break
        case 3:
            coordinate = Math.floor(Math.random() * 20)
            buildingGrid[0][coordinate] = new Station(3 , 0 , coordinate)
            break
    }
}

function createBuildingGrid() {
    buildingGrid = []
    for (let tGx = Xtiles - 1; tGx >= 0; tGx--) {
        let row = []
        for (let tGy = 0; tGy < Ytiles; tGy++) {
            row.push([])
        }
        buildingGrid.push(row)
    }
}