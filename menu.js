function setup() {
    createCanvas(windowWidth, windowHeight)
}
  
function draw() {
  background(0)
  fill(255)
  textAlign(CENTER, CENTER)
  textSize(50)
  text('Game Menu', width / 2, height / 3)

  textSize(30);
  text('Press ENTER to Start', width / 2, height / 2)
}
  
function keyPressed() {
  if (keyCode === ENTER) {
    window.location.href = 'game.html' // Redirect to game.html
  }
}

function windowResized() {
  setup()
}
  