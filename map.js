//MAP
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
let rotation = 0 // 0: NS, 1: EW, 2: 
let newMode
let playerMoney = 1000

function preload() {
  tiles = [
    loadImage("img/grass.png"), //0
    loadImage("img/water.png"), //1
    loadImage("img/beach.png"), //2
  ]

  tracks = [
    loadImage("img/trackNS.png"),
    loadImage("img/trackNS.png"), //0
    loadImage("img/trackEW.png"), // 1
    loadImage("img/trackSE.png") //2

    //add one here to images
  ]

  // 0 - Light green
  // 1 - Blue
  // 2 - Yellow
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER)

  let totalWidth = (Xtiles + Ytiles) * tileOffsetC / 2
  let totalHeight = (Xtiles + Ytiles - 1) * tileOffsetR

  originX = (width - totalWidth) / 2
  originY = height / 2 - (height * 0.05)

  console.log(totalWidth, totalHeight, width, height, originX, originY)
}

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
      drawTracks(gx, gy)
    }
  }

  pop()
  drawUI()

}

function drawUI() {
  textSize(64)
  fill(255)
  noStroke()
  textFont()
  text(tileX + " " + tileY, 20, 50)
  text(floor(mouseX) + " " + floor(mouseY), 20, 150)
  text(gameMode + " " + rotation , 20, 250)

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

function drawTile(gx, gy) {
  offX = gx * tileOffsetC / 2 + gy * tileOffsetC / 2 + originX
  offY = gy * tileOffsetR / 2 - gx * tileOffsetR / 2 + originY

  if (gx == tileX && gy == tileY && gameMode == 3) {
    tint(180, 180, 40, 255)
  }
  else {
    noTint()
  }

  image(tiles[mapState[gy][gx]], offX + tileOffsetC / 2, offY + tileOffsetR)

  noTint()
}

function drawTracks(gx, gy) {
  let trackOffX1 = gx * tileOffsetC / 2 + gy * tileOffsetC / 2 + originX
  let trackOffY1 = gy * tileOffsetR / 2 - gx * tileOffsetR / 2 + originY

  let trackOffX2 = gx * tileOffsetC / 2 + (gy - 1) * tileOffsetC / 2 + originX
  let trackOffY2 = (gy - 1) * tileOffsetR / 2 - gx * tileOffsetR / 2 + originY

  let midX = (trackOffX1 + trackOffX2) / 2
  let midY = (trackOffY1 + trackOffY2) / 2

  if (gx == tileX && gy == tileY) {
    tint(180, 180, 40, 255)
  }
  else {
    noTint()
  }

  if (gameMode == 2 && gx == tileX && gy == tileY) {
    tint(200, 200, 0, 255)
    image(tracks[rotation + 1], midX + tileOffsetC / 2, midY + tileOffsetR)
  }

  if (trackState[gy][gx] != 0) {
    image(tracks[trackState[gy][gx]], midX + tileOffsetC / 2, midY + tileOffsetR)
  }

  noTint()
}

//add to log - tint function for tile visual selection

function keyPressed() {
  if (key === "=") {
    zoomIn()
  }
  if (key === "-") {
    zoomOut()
  }
  if (key === "1") {
    changeMode(2)
  }
  if (key === "2") {
    changeMode(3)
  }
  if (key === "e" && gameMode == 2){
    rotateTrack()
  }
  if (key === "q" && gameMode == 2){
    rotateTrack()
  }
}

function mouseMoved() {
  let aMX = (mouseX - width / 2) / zoomLevel + width / 2
  let aMY = (mouseY - height / 2) / zoomLevel + height / 2

  mX = aMX - tileOffsetC / 2 - originX
  mY = aMY - tileOffsetR / 2 - originY

  tileX = floor(mX / tileOffsetC - mY / tileOffsetR) + 1
  tileY = floor(mX / tileOffsetC + mY / tileOffsetR)
}

function mouseClicked() {
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

function rotateTrack() {
  if (rotation < 2){
    rotation += 1
  }
  else{
    rotation = 0
  }
}

function buildTrack() {
  if (trackState[tileY][tileX] == 0) {
    trackState[tileY][tileX] = 1 + rotation
    playerMoney -= 100
  }
}

function deleteTrack() {
  if (trackState[tileY][tileX] != 0) {
    trackState[tileY][tileX] = 0
    playerMoney -= 50
  }
}

function trackLogic() {
  for (let gx = Xtiles - 1; gx >= 0; gx--) {
    for (let gy = 0; gy < Ytiles; gy++) {
      if (trackState[gy][gx] != 0) {
        console.log("Hi")
      }
    }
  }
}

function changeMode(newMode) {
  gameMode = newMode
}
//https://www.istockphoto.com/vector/railway-kit-gm1450125259-487130540
//write build mode + trCK PLACMENT ALGORITHMS
//https://kenney.nl/assets/train-kit

function beginGame() {
  
}






