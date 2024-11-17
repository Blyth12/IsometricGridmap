function setup() {
    createCanvas(windowWidth, windowHeight)
    bg = loadImage("img/logo.jpeg")
}
  
function draw() {
  image(bg , 0 , 0 , windowWidth , windowHeight * 0.89)

  fill(0)
  rect(0, windowHeight * 0.89, windowWidth , windowHeight * 0.01 , 0)
  fill(38, 77, 115)
  rect(0, windowHeight * 0.9, windowWidth , windowHeight * 0.1 , 0)


  fill(51, 51, 51)
  rect(windowWidth * 0.03 , windowHeight * 0.92, windowWidth * 0.3 , windowHeight * 0.06 , 20)
  fill(255)
  text("PLAY", windowWidth * 0.17 , windowHeight * 0.92 + windowHeight * 0.035)

  fill(51, 51, 51)
  rect(windowWidth * 0.35 , windowHeight * 0.92, windowWidth * 0.3 , windowHeight * 0.06, 20)
  fill(255)
  text("SETTINGS", windowWidth * 0.48 , windowHeight * 0.92 + windowHeight * 0.035)

  fill(51, 51, 51)
  rect(windowWidth * 0.67 , windowHeight * 0.92, windowWidth * 0.3 , windowHeight * 0.06, 20)
  fill(255)
  text("HELP", windowWidth * 0.82 , windowHeight * 0.92 + windowHeight * 0.035)
}

function mouseClicked() {
  if (mouseX >= (windowWidth * 0.03) && mouseX <= (windowWidth * 0.03 + windowWidth * 0.3) && mouseY >= (windowHeight * 0.92) && mouseY <= (windowHeight * 0.92 + windowHeight * 0.06)) {  // writeup - code for button press detection
    console.log("PLay")
    window.location.href = 'game.html' // Redirect to game.html
  }

  if (mouseX >= (windowWidth * 0.35) && mouseX <= (windowWidth * 0.35 + windowWidth * 0.3) && mouseY >= (windowHeight * 0.92) && mouseY <= (windowHeight * 0.92 + windowHeight * 0.06)) {  // writeup - code for button press detection
    console.log("Help")
  }

  if (mouseX >= (windowWidth * 0.67) && mouseX <= (windowWidth * 0.67 + windowWidth * 0.3) && mouseY >= (windowHeight * 0.92) && mouseY <= (windowHeight * 0.92 + windowHeight * 0.06)) {  // writeup - code for button press detection
    console.log("Settings")
  }
}
  
function keyPressed() {
  if (keyCode === ENTER) {
    window.location.href = 'game.html' // Redirect to game.html
  }
}

function windowResized() {
  setup()
}
  

//dont talk about menu until development log lol