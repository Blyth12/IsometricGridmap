// VARIABLES SETUP
//GAME
let tileOffsetC = 100 // Width of tile img (100)
let tileOffsetR2 = 65 // Height of tile img (65)
let tileOffsetR = 50 // Height of tile img (exluding side) (50)
let originX
let originY
let Xtiles = 20
let Ytiles = 20
let tileX
let tileY
let img
let tiles
let offX
let offY
let mX
let mY
let zoomLevel = 1
const minZoom = 0.5
const maxZoom = 3

//USER
let gameMode = 2 // 1: view, 2: build, 3: delete
let rotation = 1 // 1: NS, 2: EW, 3: SE, 4: NW
let newMode
let playerMoney = 1000



// PRE LOAD FUNCTIONS
function preload() {

  createTrackGrid() // Create array for track placement
  createBuildingGrid() // Create array for building placement
  setTrackValues()

  tiles = [
    loadImage("img/grass.png"), //0
    loadImage("img/water.png"), //1
    loadImage("img/beach.png"), //2
  ]

  tracks = [

    loadImage("img/trackNS.png"), //X
    loadImage("img/trackEW.png"), //1
    loadImage("img/trackNW.png"), //2
    loadImage("img/trackNS.png"), //3
    loadImage("img/trackSE.png")  //4

    //add one here to images
  ]

  stations = [
    loadImage("img/station/blue.png"),
  ]

  trains = [
    loadImage("img/train/train1hz.png"),
  ]

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER)

  let totalWidth = (Xtiles + Ytiles) * tileOffsetC / 2
  let totalHeight = (Xtiles + Ytiles - 1) * tileOffsetR

  originX = (width - totalWidth) / 2
  originY = height / 2 - (height * 0.05)

  console.log(totalWidth, totalHeight, width, height, originX, originY)
  beginGame()
}



//DRAW FUNCTIONS
// Draw background and initialise drawing tracks and tiles in embedded for loops
function draw() {
  background('turquoise');

  push()
  translate(width / 2, height / 2)
  scale(zoomLevel)
  translate(-width / 2, -height / 2)

  for (let gx = Xtiles - 1; gx >= 0; gx--) {
    for (let gy = 0; gy < Ytiles; gy++) {
      drawTile(gx, gy)
    }
  }
  
  for (let gx = Xtiles - 1; gx >= 0; gx--) {
    for (let gy = 0; gy < Ytiles; gy++) {
      checkTrack(gx, gy)
      drawTracks(gx, gy)
    }
  }

  for (let gx = Xtiles - 1; gx >= 0; gx--) {
    for (let gy = 0; gy < Ytiles; gy++) {
      drawBuildings(gx, gy)
    }
  }

  for (let gx = Xtiles - 1; gx >= 0; gx--) {
    for (let gy = 0; gy < Ytiles; gy++) {
      drawTrains(gx, gy)
    }
  }

  pop()
  drawUI()

}


//Draw UI elements + zoom
function drawUI() {
  textSize(64)
  fill(255)
  noStroke()
  textFont()
  text(tileX + " " + tileY, 20, 50)
  text(floor(mouseX) + " " + floor(mouseY), 20, 150) //Debug text
  text(gameMode + " " + rotation , 20, 250)
  text(elapsedTime , 20, 350)

  text("€" + playerMoney, 0.88 * windowWidth, 0.1 * windowHeight)

  fill(0)
  rect(20, windowHeight * 0.8, 210, 55, 20)
  fill(255)
  text("Build", 50, windowHeight * 0.8 + 50)

  fill(0)
  rect(20, windowHeight * 0.9, 210, 55, 20)
  fill(255)
  text("Delete", 35, windowHeight * 0.9 + 50)

  fill(0)
  rect(windowWidth * 0.95, windowHeight * 0.8, 50, 55, 20)
  fill(255)
  text("+", windowWidth * 0.95 + 5, windowHeight * 0.8 + 50)

  fill(0)
  rect(windowWidth * 0.95, windowHeight * 0.9, 50, 55, 20)
  fill(255)
  text("-", windowWidth * 0.95 + 15, windowHeight * 0.9 + 50)
}

function zoomIn() {
  zoomLevel = constrain(zoomLevel + 0.1, minZoom, maxZoom)
}

function zoomOut() {
  zoomLevel = constrain(zoomLevel - 0.1, minZoom, maxZoom)
}

function windowResized() {
  setup()
}




//Tile drawing + hovering
function drawTile(gx, gy) {
  offX = gx * tileOffsetC / 2 + gy * tileOffsetC / 2 + originX // Calculates the offset by multiplying the coordinate by 60, 
  offY = gy * tileOffsetR / 2 - gx * tileOffsetR / 2 + originY

  if (gx == tileX && gy == tileY && (gameMode == 3 || gameMode == 1)) { // Used to tint the selected tile
    tint(180, 180, 40, 255)
  }
  else {
    noTint()
  }

  image(tiles[mapState[gy][gx]], offX + tileOffsetC / 2, offY + tileOffsetR)

  noTint()
}

function drawTrains(gx, gy) {
  offX = gx * tileOffsetC / 2 + gy * tileOffsetC / 2 + originX // Calculates the offset by multiplying the coordinate by 60, 
  offY = gy * tileOffsetR / 2 - gx * tileOffsetR / 2 + originY

  for (let i = 0; i < activeTrains.length; i++) {
    if (gx == activeTrains[i].x && gy == activeTrains[i].y) {
      image(trains[0], offX + tileOffsetC / 2, offY + tileOffsetR)
    }
  }
}

//Object and building drawing
function drawBuildings(gx, gy) {
  buildOffX = gx * tileOffsetC / 2 + gy * tileOffsetC / 2 + originX // Calculates the offset by multiplying the coordinate by 60, 
  buildOffY = gy * tileOffsetR / 2 - gx * tileOffsetR / 2 + originY

  if (buildingGrid[gy][gx] instanceof Station) {
    image(stations[0], buildOffX + tileOffsetC / 2, buildOffY + tileOffsetR - 50)
  }
}


//Track drawing
function calculateOffset(a, b, c, d, gx, gy, trackOffX1, trackOffY1) { //Used to calculate the offset to accurately preview / place the tracks with values from the switch statments

  trackOffX2 = (gx + a) * tileOffsetC / 2 + (gy + b) * tileOffsetC / 2 + originX // Calculation for the coordinates of the tile below the currently selected tile (gx, gy - 1)
  trackOffY2 = (gy + c) * tileOffsetR / 2 - (gx + d) * tileOffsetR / 2 + originY 
  midX = (trackOffX1 + trackOffX2) / 2 // Calculation of the midpoint between the two coordinates is calculated.
  midY = (trackOffY1 + trackOffY2) / 2
  return {midX, midY}
}

function drawAtCoordinates(gx, gy, midX, midY, currentTrack) { // Function used to draw tracks with correct rotation from switch statment

  // if (trackState[gy][gx] != 0) {
    image(tracks[currentTrack], midX + tileOffsetC / 2, midY + tileOffsetR)
  // }
}

function placementPreview(gx, gy, midX, midY) { // Function used to preview track placment with correct rotation from switch statment

  if (gameMode == 2 && gx == tileX && gy == tileY) {
    tint(200, 200, 0, 255)
    image(tracks[rotation], midX + tileOffsetC / 2, midY + tileOffsetR)
  }
}

function drawTracks(gx, gy) {
  let trackOffX1 = gx * tileOffsetC / 2 + gy * tileOffsetC / 2 + originX // Same calculations as offX in the above drawTile() function
  let trackOffY1 = gy * tileOffsetR / 2 - gx * tileOffsetR / 2 + originY
  let midX, midY

  if (gx == tileX && gy == tileY) { // If the current tile is the same as the one the mouse is hovered over, add tint to the tracks to show selection
    tint(180, 180, 40, 255)
  }
  else {
    noTint()
  }

  switch(rotation) { // Used to calculate and correctly display preview relative to the tile hovered over by the mouse
    case 1:
      ({ midX, midY } = calculateOffset(1, 0, 0, 1, gx, gy, trackOffX1, trackOffY1))
      placementPreview(gx, gy, midX, midY)
      break

    case 2:
      ({ midX, midY } = calculateOffset(2, 0, -1, -1, gx, gy, trackOffX1, trackOffY1))
      placementPreview(gx, gy, midX, midY)
      break

    case 3:
      ({ midX, midY } = calculateOffset(0, 1, 1, 0, gx, gy, trackOffX1, trackOffY1))
      placementPreview(gx, gy, midX, midY)
      break

    case 4:
      ({ midX, midY } = calculateOffset(0, 0, 3, 1, gx, gy, trackOffX1, trackOffY1))
      placementPreview(gx, gy, midX, midY)
      break
  }

  if (trackGrid[gy][gx].track.length != 0){
    for (let i = 0; i < trackGrid[gy][gx].track.length; i++) {
      let currentTrack = trackGrid[gy][gx].track[i]
      switch (currentTrack) { //Used to calculate and corretly display tracks relative to the tile they are on
        case 1:
          ({ midX, midY } = calculateOffset(1, 0, 0, 1, gx, gy, trackOffX1, trackOffY1))
          drawAtCoordinates(gx, gy, midX, midY, currentTrack)
          break

        case 2:
          ({ midX, midY } = calculateOffset(2, 0, -1, -1, gx, gy, trackOffX1, trackOffY1))
          drawAtCoordinates(gx, gy, midX, midY, currentTrack)
          break

        case 3:
          ({ midX, midY } = calculateOffset(0, 1, 1, 0, gx, gy, trackOffX1, trackOffY1))
          drawAtCoordinates(gx, gy, midX, midY, currentTrack)
          break

        case 4:
          ({ midX, midY } = calculateOffset(0, 0, 3, 1, gx, gy, trackOffX1, trackOffY1))
          drawAtCoordinates(gx, gy, midX, midY, currentTrack)
          break
      }
    }
  }

  noTint()
}  //add to log - tint function for tile visual selection

function debug() {
  console.log(trackGrid[tileY][tileX])
  console.log(trackGrid[tileY][tileX].track)
  console.log(trackGrid[tileY][tileX].track.length)
}



//USER INPUT FUNCTIONS
//Keybinds
function keyPressed() {
  if (key === "=") {
    zoomIn()
  }
  if (key === "-") {
    zoomOut()
  }
  if (key === "1") {
    changeMode(1)
  }
  if (key === "2") {
    changeMode(2)
  }
  if (key === "3") {
    changeMode(3)
  }
  if (key === "e" && gameMode == 2){
    rotateTrack(0)
  }
  if (key === "q" && gameMode == 2){
    rotateTrack(1)
  }
  if (key === "q" && gameMode == 1){
    console.log(trackGrid)
  }
  if (key === "w" && gameMode == 1){
    createRandomStation()
  }
  if (key === "e" && gameMode == 1){
    console.log(buildingGrid)
  }
  if (key === "r" && gameMode == 1){
    spawnTrain(10,10)
  }
  if (key === "t" && gameMode == 1){
    console.log(activeTrains)
  }
}



//Mouse coordinate calculations on mouse moved
function mouseMoved() {
  let aMX = (mouseX - width / 2) / zoomLevel + width / 2
  let aMY = (mouseY - height / 2) / zoomLevel + height / 2

  mX = aMX - tileOffsetC / 2 - originX
  mY = aMY - tileOffsetR / 2 - originY

  tileX = floor(mX / tileOffsetC - mY / tileOffsetR) + 1
  tileY = floor(mX / tileOffsetC + mY / tileOffsetR)
}


//Varying functions for when mouse is clicked depending on the selected mode
function mouseClicked() {
  if (gameMode == 1) { //For controlling junctions
    debug()
  }

  if (gameMode == 3) {
    deleteTrack()
  }

  if (gameMode == 2) {
    buildTrack()
  }

  if (mouseX >= 20 && mouseX <= 20 + 210 && mouseY >= windowHeight * 0.8 && mouseY <= windowHeight * 0.8 + 55) {  // writeup - code for button press detection
    changeMode(2)
  }

  if (mouseX >= 20 && mouseX <= 20 + 210 && mouseY >= windowHeight * 0.9 && mouseY <= windowHeight * 0.9 + 55) {  // writeup - code for button press detection
    changeMode(3)
  }
}

function rotateTrack(a) {
  if (a == 0) {
    if (rotation < 4){
      rotation += 1
    }
    else{
      rotation = 1
    }
  }
  
  if (a == 1) {
    if (rotation > 1){
      rotation -= 1
    }
    else{
      rotation = 4
    }
  }
}

function changeMode(newMode) {
  gameMode = newMode
}

//https://www.istockphoto.com/vector/railway-kit-gm1450125259-487130540
//write build mode + trCK PLACMENT ALGORITHMS
//https://kenney.nl/assets/train-kit

let elapsedTime = 0

function tick() {
  elapsedTime += 1
}

function beginGame() {
  setInterval(tick, 1000)
  setInterval(createRandomStation, 10000)
  setInterval(moveTrains, 1000)
}








