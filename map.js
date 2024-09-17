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
let gameMode = "build" // view, build, delete
let playerMoney = 1000
const minZoom = 0.5
const maxZoom = 3

function preload() {
  tiles = [
    loadImage("img/grass.png"), //0
    loadImage("img/water.png"), //1
    loadImage("img/beach.png"), //2
    //tracks
    loadImage("img/trackonly.png") //3
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
  background('cyan');

  push()
  translate(width / 2, height / 2)
  scale(zoomLevel)
  translate(-width / 2, -height / 2)

  for (let gx = Xtiles - 1; gx >= 0; gx--) {
    for (let gy = 0; gy < Ytiles; gy++) {
      drawTile(gx, gy)
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

  fill(0)
  rect(20, windowHeight * 0.8, 210, 55, 20)
  fill(255)
  text("Build", 50, windowHeight * 0.8 + 50)

  fill(0)
  rect(20, windowHeight * 0.9, 210, 55, 20)
  fill(255)
  text("Delete", 35, windowHeight * 0.9 + 50)

  fill(0)
  rect(windowWidth * 0.95 , windowHeight * 0.8, 50, 55, 20)
  fill(255)
  text("+", windowWidth * 0.95 + 5 , windowHeight * 0.8 + 50)

  fill(0)
  rect(windowWidth * 0.95 , windowHeight * 0.9, 50, 55, 20)
  fill(255)
  text("-", windowWidth * 0.95 + 15 , windowHeight * 0.9 + 50)
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

  if (gx == tileX && gy == tileY){
    tint(180, 180, 40, 255)
  }
  else{
    noTint()
  }

  image(tiles[map[gy][gx]], offX + tileOffsetC / 2, offY + tileOffsetR)

  noTint()
}

function drawTracks(gx, gy) {
  // offX = gx * tileOffsetC / 2 + gy * tileOffsetC / 2 + originX
  // offY = gy * tileOffsetR / 2 - gx * tileOffsetR / 2 + originY

  if (gx == tileX && gy == tileY){
    tint(180, 180, 40, 255)
  }
  else{
    noTint()
  }

  if (tracks[gy][gx] == 1) {
    image(tiles[3], offX + tileOffsetC / 2, offY + tileOffsetR)
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
  if (gameMode == "view"){
    if (map[tileY][tileX] == 2) {
      map[tileY][tileX] = 0
    }
    else {
      map[tileY][tileX] += 1
    }
  }

  if (gameMode == "build"){
    if (tracks[tileY][tileX] == 1) {
      tracks[tileY][tileX] = 0
    }
    else {
      tracks[tileY][tileX] = 1
    }
  }

  if (mouseX >= 20 && mouseX <= 20 + 210 && mouseY >= windowHeight * 0.8 && mouseY <= windowHeight * 0.8 + 55 ) {  // writeup - code for button press detection
    zoomIn()
  }

  function buildTrack() {
    if (gameMode = build) {
      
    }
  }
  //https://www.istockphoto.com/vector/railway-kit-gm1450125259-487130540
  //write build mode + trCK PLACMENT ALGORITHMS
}





