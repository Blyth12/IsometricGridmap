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
let clearedTrains = 0
let playerMoney = 10000

let colours = ["red", "orange", "green", "blue", "violet"]

// PRE LOAD FUNCTIONS
function preload() {
  setMap()
  createTrackGrid() // Create array for track placement
  createBuildingGrid() // Create array for building placement
  setTrackValues()
  createObstacles()

  tiles = [
    loadImage("img/grass.png"), //0
    loadImage("img/water.png"), //1
    loadImage("img/beach.png"), //2
  ]

  obstacles = [
    loadImage("img/grass.png"), //X
    loadImage("img/obstacle/obstacle1.png"),
    loadImage("img/obstacle/obstacle2.png"),
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
    loadImage("img/station/white.png"),
  ]

  trains = [
    loadImage("img/train/train.png"),
  ]

  junctionArrow = [
    loadImage("img/arrow.png")
  ]

  beginGame()
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER)

  let totalWidth = (Xtiles + Ytiles) * tileOffsetC / 2
  let totalHeight = (Xtiles + Ytiles - 1) * tileOffsetR

  originX = (width - totalWidth) / 2
  originY = height / 2 - (height * 0.05) - 70

  console.log(totalWidth, totalHeight, width, height, originX, originY)
}

function createObstacles() {
  for (let obstacleGx = 1; obstacleGx < Xtiles -2 ; obstacleGx++) {
    for (let obstacleGy = 1; obstacleGy < Ytiles -2 ; obstacleGy++) {
      let obstacleChance = Math.floor(Math.random() * 20)
      if (obstacleChance == 1 && trackGrid[obstacleGy][obstacleGx].trackBitmask == 0 && !(buildingGrid[obstacleGy][obstacleGx] instanceof Station) && mapState[obstacleGy][obstacleGx] == 0) {
        let obstacleNumber = Math.floor(Math.random() * 2) + 1
        mapObstacles[obstacleGy][obstacleGx] = obstacleNumber
      }
    }
  }
}

function deleteObstacle() {
  console.log(mapObstacles[tileY][tileX])
  switch (mapObstacles[tileY][tileX]){
    case 1:
        playerMoney -= 5000
        mapObstacles[tileY][tileX] = 0
        break
    case 2:
        playerMoney -= 1000
        mapObstacles[tileY][tileX] = 0
        break
  }
}

//DRAW FUNCTIONS
// Draw background and initialise drawing tracks and tiles in embedded for loops
function draw() {
  background('turquoise')

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
      junctionSwitch(gx, gy)
      drawJunctionArrow(gx, gy)
    }
  }

  for (let gx = Xtiles - 1; gx >= 0; gx--) {
    for (let gy = 0; gy < Ytiles; gy++) {
      drawTrains(gx, gy)
      drawBuildings(gx, gy)
      drawObstacle(gx, gy)
      obstacleHover(gx, gy)
    }
  }

  pop()
  drawUI()

}


//Draw UI elements + zoom.
function drawUI() {
  textSize(50)
  fill(255)
  noStroke()
  textFont()
  text(tileX + " " + tileY, 20, 50)
  text(floor(mouseX) + " " + floor(mouseY), 20, 150) //Debug text
  text(gameMode + " " + rotation , 20, 250)

  fill (0)
  rect(0, windowHeight * 0.89, windowWidth , windowHeight * 0.01 , 0)
  fill(38, 77, 115)
  rect(0, windowHeight * 0.9, windowWidth , windowHeight * 0.1 , 0)
  fill(255)

  stroke(0)
  fill(51, 51, 51)
  rect(windowWidth * 0.87 , windowHeight * 0.92, windowWidth * 0.1 , windowHeight * 0.06 , 20)
  fill(255)
  text("€" + playerMoney, 0.875 * windowWidth, 0.97 * windowHeight)

  stroke(0)
  fill(51, 51, 51)
  rect(windowWidth * 0.8 , windowHeight * 0.92, windowWidth * 0.05 , windowHeight * 0.06 , 20)
  fill(255)
  text(elapsedTime , 0.81 * windowWidth, 0.97 * windowHeight)

  stroke(0)
  fill(51, 51, 51)
  rect(windowWidth * 0.64 , windowHeight * 0.92, windowWidth * 0.14 , windowHeight * 0.06 , 20)
  fill(255)
  text(clearedTrains + "/25 trains" , 0.65 * windowWidth, 0.97 * windowHeight)

  stroke(0)
  fill(51, 51, 51)
  if (gameMode == 1) {
    fill("green")
  }
  rect(windowWidth * 0.03 , windowHeight * 0.92, windowWidth * 0.15 , windowHeight * 0.06 , 20)
  fill(255)
  text("MANAGE", windowWidth * 0.05 , windowHeight * 0.92 + windowHeight * 0.05)


  fill(51, 51, 51)
  if (gameMode == 2) {
    fill("green")
  }
  rect(windowWidth * 0.20 , windowHeight * 0.92, windowWidth * 0.15 , windowHeight * 0.06, 20)
  fill(255)
  text("BUILD", windowWidth * 0.235 , windowHeight * 0.92 + windowHeight * 0.05)


  fill(51, 51, 51)
  if (gameMode == 3) {
    fill("green")
  }
  rect(windowWidth * 0.37 , windowHeight * 0.92, windowWidth * 0.15 , windowHeight * 0.06, 20)
  fill(255)
  text("DELETE", windowWidth * 0.395 , windowHeight * 0.92 + windowHeight * 0.05)
  noStroke()

  // fill(0)
  // rect(windowWidth * 0.95, windowHeight * 0.8, 50, 55, 20)
  // fill(255)
  // text("+", windowWidth * 0.95 + 5, windowHeight * 0.8 + 50)

  // fill(0)
  // rect(windowWidth * 0.95, windowHeight * 0.9, 50, 55, 20)
  // fill(255)
  // text("-", windowWidth * 0.95 + 15, windowHeight * 0.9 + 50)
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

function drawObstacle(gx, gy) {
  offX = gx * tileOffsetC / 2 + gy * tileOffsetC / 2 + originX // Calculates the offset by multiplying the coordinate by 60, 
  offY = gy * tileOffsetR / 2 - gx * tileOffsetR / 2 + originY
  if (mapObstacles[gy][gx] != 0) {
    image(obstacles[mapObstacles[gy][gx]], offX + tileOffsetC / 2, offY + tileOffsetR - 50)
  }
}

function obstacleHover(gx, gy) {
  if (gameMode == 3 && gx == tileX && gy == tileY) {
    switch (mapObstacles[tileY][tileX]) {
      case 0:
        break
      case 1:
        push()
        textSize(20)
        fill("red")
        text("€5000" , mouseX , mouseY)
        pop()
        break
      case 2:
        push()
        textSize(20)
        fill("red")
        text("€1000" , mouseX , mouseY)
        pop()
    }
  }
}


//Tile drawing + hovering
function drawTile(gx, gy) {
  offX = gx * tileOffsetC / 2 + gy * tileOffsetC / 2 + originX // Calculates the offset by multiplying the coordinate by 60, 
  offY = gy * tileOffsetR / 2 - gx * tileOffsetR / 2 + originY

  if (gx == tileX && gy == tileY && (gameMode == 3)) { // Used to tint the selected tile
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
      push()
      let centerX = (offX + tileOffsetC / 2) - 5
      let centerY = (offY + tileOffsetR) - 8
      translate(centerX , centerY) // Sets origin to the tile the train is on to rotate properly
      angleMode(DEGREES)
      imageMode(CENTER)
      switch(activeTrains[i].direction) {
        case 0:
          rotate(270)
          break
        case 1:
          rotate(305)
          break
        case 2:
          rotate(0)
          break
        case 3:
          rotate(60)
          break
        case 4:
          rotate(90)
          break
        case 5:
          rotate(105)
          break
        case 6:
          rotate(180)
          break
        case 7:
          rotate(240)
          break
      }

      tint(colours[activeTrains[i].destination])
      image(trains[0], 0, 0)
      pop() // Push pop stops other things being affected by rotate.
    }
  }
}

//Object and building drawing
function drawBuildings(gx, gy) {
  buildOffX = gx * tileOffsetC / 2 + gy * tileOffsetC / 2 + originX // Calculates the offset by multiplying the coordinate by 60, 
  buildOffY = gy * tileOffsetR / 2 - gx * tileOffsetR / 2 + originY

  if (buildingGrid[gy][gx] instanceof Station) {
    push()
    tint(colours[buildingGrid[gy][gx].colour])
    image(stations[0], buildOffX + tileOffsetC / 2, buildOffY + tileOffsetR - 50)
    pop()
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
  image(tracks[currentTrack], midX + tileOffsetC / 2, midY + tileOffsetR)
}

function placementPreview(gx, gy, midX, midY) { // Function used to preview track placment with correct rotation from switch statment

  if (gameMode == 2 && gx == tileX && gy == tileY) {
    tint(200, 200, 0, 255)
    image(tracks[rotation], midX + tileOffsetC / 2, midY + tileOffsetR)
  }
}

function drawJunctionArrow(gx, gy) {
  if (trackGrid[gy][gx].trackType == 3){
    let x = gx * tileOffsetC / 2 + gy * tileOffsetC / 2 + originX + 50
    let y = gy * tileOffsetR / 2 - gx * tileOffsetR / 2 + originY + 42.5
    let junctionArrowType = trackGrid[gy][gx].trackBitmask
    push()
    translate(x , y)
    imageMode(CENTER)
    // console.log(junctionArrowType)
    if ((junctionArrowType & TRACKJUNCTION.NWSE[0]) == TRACKJUNCTION.NWSE[0]) {
      if (trackGrid[gy][gx].activeJunction == 1) {rotate(315)}
      else {rotate(270)}
    }

    if ((junctionArrowType & TRACKJUNCTION.NWSE[1]) == TRACKJUNCTION.NWSE[1]) {
      if (trackGrid[gy][gx].activeJunction == 1) {rotate(225)}
      else {rotate(270)}
    }

    if ((junctionArrowType & TRACKJUNCTION.NWSE[2]) == TRACKJUNCTION.NWSE[2]) {
      if (trackGrid[gy][gx].activeJunction == 1) {rotate(135)}
      else {rotate(90)}
    }

    if ((junctionArrowType & TRACKJUNCTION.NWSE[3]) == TRACKJUNCTION.NWSE[3]) {
      if (trackGrid[gy][gx].activeJunction == 1) {rotate(45)}
      else {rotate(90)}
    }

    if ((junctionArrowType & TRACKJUNCTION.NS[0]) == TRACKJUNCTION.NS[0]) {
      if (trackGrid[gy][gx].activeJunction == 1) {rotate(0)}
      else {rotate(305)}
    }

    if ((junctionArrowType & TRACKJUNCTION.NS[1]) == TRACKJUNCTION.NS[1]) {
      if (trackGrid[gy][gx].activeJunction == 1) {rotate(270)}
      else {rotate(305)}
    }

    if ((junctionArrowType & TRACKJUNCTION.NS[2]) == TRACKJUNCTION.NS[2]) {
      if (trackGrid[gy][gx].activeJunction == 1) {rotate(90)}
      else {rotate(125)}
    }

    if ((junctionArrowType & TRACKJUNCTION.NS[3]) == TRACKJUNCTION.NS[3]) {
      if (trackGrid[gy][gx].activeJunction == 1) {rotate(180)}
      else {rotate(125)}
    }

    if ((junctionArrowType & TRACKJUNCTION.SWNE[0]) == TRACKJUNCTION.SWNE[0]) {
      if (trackGrid[gy][gx].activeJunction == 1) {rotate(315)}
      else {rotate(0)}
    }

    if ((junctionArrowType & TRACKJUNCTION.SWNE[1]) == TRACKJUNCTION.SWNE[1]) {
      if (trackGrid[gy][gx].activeJunction == 1) {rotate(45)}
      else {rotate(0)}
    }

    if ((junctionArrowType & TRACKJUNCTION.SWNE[2]) == TRACKJUNCTION.SWNE[2]) {
      if (trackGrid[gy][gx].activeJunction == 1) {rotate(125)}
      else {rotate(180)}
    }

    if ((junctionArrowType & TRACKJUNCTION.SWNE[3]) == TRACKJUNCTION.SWNE[3]) {
      if (trackGrid[gy][gx].activeJunction == 1) {rotate(235)}
      else {rotate(180)}
    }

    if ((junctionArrowType & TRACKJUNCTION.EW[0]) == TRACKJUNCTION.EW[0]) {
      if (trackGrid[gy][gx].activeJunction == 1) {rotate(0)}
      else {rotate(55)}
    }

    if ((junctionArrowType & TRACKJUNCTION.EW[1]) == TRACKJUNCTION.EW[1]) {
      if (trackGrid[gy][gx].activeJunction == 1) {rotate(90)}
      else {rotate(55)}
    }

    if ((junctionArrowType & TRACKJUNCTION.EW[2]) == TRACKJUNCTION.EW[2]) {
      if (trackGrid[gy][gx].activeJunction == 1) {rotate(270)}
      else {rotate(235)}
    }

    if ((junctionArrowType & TRACKJUNCTION.EW[3]) == TRACKJUNCTION.EW[3]) {
      if (trackGrid[gy][gx].activeJunction == 1) {rotate(180)}
      else {rotate(235)}
    }
    tint("white")
    image(junctionArrow[0], 0, 0)
    pop()
  }
}

function junctionSwitch(gx, gy) { //  Draw junction switch
  if (gameMode == 1 && trackGrid[gy][gx].trackType == 3) {
    let x = gx * tileOffsetC / 2 + gy * tileOffsetC / 2 + originX + 50
    let y = gy * tileOffsetR / 2 - gx * tileOffsetR / 2 + originY + 42.5  
    stroke(0)
    noFill()
    noStroke()
    fill(100, 255, 150, 150)
    let radX = tileOffsetC / 3
    let radY = tileOffsetR / 3
    ellipse(x , y , radX * 2, radY * 2) //Elipse centre x y
    text(trackGrid[gy][gx].activeJunction ,x , y)
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

function changeJunction() {
  if (trackGrid[tileY][tileX].trackType == 3) {
    trackGrid[tileY][tileX].activeJunction = (trackGrid[tileY][tileX].activeJunction + 1) % 2
  }
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
    console.log("Rotate e")
    rotateTrack(0)
  }
  if (key === "q" && gameMode == 2){
    console.log("Rotate q")
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

  if(mouseY < windowHeight * 0.9) {
    if (gameMode == 1) { //For controlling junctions
      debug()
      changeJunction()
    }

    if (gameMode == 3 && playerMoney >= 50) {
      deleteTrack()
      deleteObstacle()
    }

    if (gameMode == 2 && playerMoney >= 100) {
      buildTrack()
    }
  }

  if ((mouseX >= windowWidth * 0.03 && mouseX <= windowWidth * 0.03 + windowWidth * 0.15) && (mouseY >= windowHeight * 0.92 && mouseY <= windowHeight * 0.92 + windowHeight * 0.06)) {  // writeup - code for button press detection
    changeMode(1)
  }

  if ((mouseX >= windowWidth * 0.20 && mouseX <= windowWidth * 0.20 + windowWidth * 0.15) && (mouseY >= windowHeight * 0.92 && mouseY <= windowHeight * 0.92 + windowHeight * 0.06)) {  // writeup - code for button press detection
    changeMode(2)
  }

  if ((mouseX >= windowWidth * 0.37 && mouseX <= windowWidth * 0.37 + windowWidth * 0.15) && (mouseY >= windowHeight * 0.92 && mouseY <= windowHeight * 0.92 + windowHeight * 0.06)) {  // writeup - code for button press detection
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

let elapsedTime = 0

function tick() {
  elapsedTime += 1
}

function monitorGame() {
  if (playerMoney <= 0) {
    console.log("LOOSER")
    window.location.href = 'index.html'
  }
  if (clearedTrains >= 25) {
    console.log("WINNER")
    window.location.href = 'index.html'
  }
}

function setMap() {
  let difficulty = localStorage.getItem("difficulty")
  console.log(difficulty + "DIFFICULTY")
  if (difficulty == null) {
    difficulty = 0
  }

  if (difficulty == 0) {
    mapState = [
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 2, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 2, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ]
  }

  if (difficulty == 1) {
    mapState = [
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 2, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 2, 2, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ]
  }
}

function beginGame() {
  createRandomStation()
  createRandomStation()
  setInterval(monitorGame, 100)
  setInterval(tick, 1000)
  setInterval(createRandomStation, 60000)
  setInterval(moveTrains, 1000)
  setInterval(checkTrainSpawns, 1000) 
}








