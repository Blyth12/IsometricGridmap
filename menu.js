let levelSelect = false
let difficulty = 0

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
  text("HELP", windowWidth * 0.493 , windowHeight * 0.92 + windowHeight * 0.035)

  fill(51, 51, 51)
  rect(windowWidth * 0.67 , windowHeight * 0.92, windowWidth * 0.3 , windowHeight * 0.06, 20)
  fill(255)
  text("EXIT", windowWidth * 0.82 , windowHeight * 0.92 + windowHeight * 0.035)

  if (levelSelect == true) {
    fill(38, 77, 115)
    rect(windowWidth * 0.2, windowHeight * 0.3, windowWidth * 0.6, windowHeight * 0.45, 10)
    fill(51, 51, 51)
    rect(windowWidth * 0.25, windowHeight * 0.425, windowWidth * 0.2, windowHeight * 0.2, 10)
    rect(windowWidth * 0.55, windowHeight * 0.425, windowWidth * 0.2, windowHeight * 0.2, 10)
    fill(255)
    textSize(50)
    text("EASY MAP", windowWidth * 0.258 , windowHeight * 0.54)
    text("HARD MAP", windowWidth * 0.555 , windowHeight * 0.54)
    textSize(12)
  }
}

function mouseClicked() {
  if (mouseX >= (windowWidth * 0.03) && mouseX <= (windowWidth * 0.03 + windowWidth * 0.3) && mouseY >= (windowHeight * 0.92) && mouseY <= (windowHeight * 0.92 + windowHeight * 0.06)) {  // writeup - code for button press detection
    console.log("Play")
    // window.location.href = 'game.html' // Redirect to game.html
    if (levelSelect == false) {levelSelect = true}
    else {levelSelect = false}
  }

  if (mouseX >= (windowWidth * 0.35) && mouseX <= (windowWidth * 0.35 + windowWidth * 0.3) && mouseY >= (windowHeight * 0.92) && mouseY <= (windowHeight * 0.92 + windowHeight * 0.06)) {  // writeup - code for button press detection
    console.log("Help")
    window.location.href = 'help.html'
  }

  if (mouseX >= (windowWidth * 0.67) && mouseX <= (windowWidth * 0.67 + windowWidth * 0.3) && mouseY >= (windowHeight * 0.92) && mouseY <= (windowHeight * 0.92 + windowHeight * 0.06)) {  // writeup - code for button press detection
    console.log("Settings")
    window.location.href = 'exit.html'
  }

  if (levelSelect == true) {
    if (mouseX >= (windowWidth * 0.25) && mouseX <= (windowWidth * 0.25 + windowWidth * 0.2) && mouseY >= (windowHeight * 0.425) && mouseY <= (windowHeight * 0.425 + windowHeight * 0.2)) {  // writeup - code for button press detection
      difficulty = 0
      localStorage.setItem("difficulty", difficulty)
      // console.log(localStorage.getItem("difficulty"))
      window.location.href = 'game.html' // Redirect to game.html
    }
    if (mouseX >= (windowWidth * 0.55) && mouseX <= (windowWidth * 0.55 + windowWidth * 0.2) && mouseY >= (windowHeight * 0.425) && mouseY <= (windowHeight * 0.425 + windowHeight * 0.2)) {  // writeup - code for button press detection
      difficulty = 1
      localStorage.setItem("difficulty", difficulty)
      // console.log(localStorage.getItem("difficulty"))
      window.location.href = 'game.html' // Redirect to game.html
    }
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