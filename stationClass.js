var buildingGrid = []
let stationCount = 0

class Station {
    constructor(rotation, x, y, colour) {
        this.rotation = rotation
        this.x = x
        this.y = y
        this.timer = 0
        this.colour = colour
        this.stationID = colour
    }

    createStation() {

    }

    stationTimer() {
        let min = 5
        let max = 10
        let randomTime = Math.floor(Math.random() * (max - min + 1) + min)
        console.log("RANDOMTIME " + randomTime)
        setInterval(this.spawnTrain() , randomTime * 1000)
        
    }

    spawnTrain() {
        spawnTrain(this.y , this.x , this.rotation, this.stationID)
    }

}

function createRandomStation() {
    if (stationCount <= 4) {
        let face = Math.floor(Math.random() * 4)
        let coordinate
        switch (face) {
            case 0:
                coordinate = Math.floor(Math.random() * 16) + 2
                if(!(buildingGrid[coordinate + 1][0] instanceof Station) && !(buildingGrid[coordinate - 1][0] instanceof Station)) {
                    buildingGrid[coordinate][0] = new Station(3 , coordinate , 0 , stationCount)
                    buildingGrid[coordinate][0].stationTimer()
                    spawnTrack(coordinate , 0 , 1)
                    stationCount += 1
                    break
                }
                break
            case 1:
                coordinate = Math.floor(Math.random() * 16) + 2
                if(!(buildingGrid[19][coordinate + 1] instanceof Station) && !(buildingGrid[19][coordinate - 1] instanceof Station)) {
                    buildingGrid[19][coordinate] = new Station(5 , 19 , coordinate , stationCount)
                    buildingGrid[19][coordinate].stationTimer()
                    spawnTrack(18 , coordinate , 3)
                    stationCount += 1
                    break
                }
                createRandomStation()
                break

            case 2:
                coordinate = Math.floor(Math.random() * 16) + 2
                if(!(buildingGrid[coordinate + 1][19] instanceof Station) && !(buildingGrid[coordinate - 1][19] instanceof Station)) {
                    buildingGrid[coordinate][19] = new Station(7 , coordinate , 19 , stationCount)
                    buildingGrid[coordinate][19].stationTimer()
                    spawnTrack(coordinate , 18 , 1)
                    stationCount += 1
                    break
                }
                createRandomStation()
                break

            case 3:
                coordinate = Math.floor(Math.random() * 16) + 2
                if(!(buildingGrid[0][coordinate + 1] instanceof Station) && !(buildingGrid[0][coordinate - 1] instanceof Station)) {
                    buildingGrid[0][coordinate] = new Station(1 , 0 , coordinate , stationCount)
                    buildingGrid[0][coordinate].stationTimer()
                    spawnTrack(0 , coordinate , 3)
                    stationCount += 1
                    break
                }
                createRandomStation()
                break
        }
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