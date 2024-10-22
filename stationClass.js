class Station {
    constructor() {
        this.rotation = 0
        this.timer = 0
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
    console.log(face)
    switch (face) {
        case 0:
            coordinate = Math.floor(Math.random() * 20)
            new Station
        case 1:
            coordinate = Math.floor(Math.random() * 20)
            new Station
        case 2:
            coordinate = Math.floor(Math.random() * 20)
            new Station
        case 3:
            coordinate = Math.floor(Math.random() * 20)
            new Station
    }
}