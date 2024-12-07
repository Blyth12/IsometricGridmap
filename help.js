function setup() {
    createCanvas(windowWidth, windowHeight)
    background('navy');
}

function draw() {
    fill(200)
    rect(windowWidth * 0.3, windowHeight * 0.1, windowWidth * 0.4, windowHeight * 0.06, 10)
    fill(0)
    text("HELP", windowWidth * 0.49, windowHeight * 0.1 + windowHeight * 0.035)

    fill(200)
    rect(windowWidth * 0.2, windowHeight * 0.3, windowWidth * 0.6, windowHeight * 0.45, 10)
    fill(0)
    text("=== HOW TO PLAY ===", windowWidth * 0.461, windowHeight * 0.3 + windowHeight * 0.035)

    fill(0)
    rect(0, windowHeight * 0.89, windowWidth, windowHeight * 0.01, 0)
    fill(38, 77, 115)
    rect(0, windowHeight * 0.9, windowWidth, windowHeight * 0.1, 0)

    fill(51, 51, 51)
    rect(windowWidth * 0.1, windowHeight * 0.92, windowWidth * 0.8, windowHeight * 0.06, 20)
    fill(255)
    text("BACK TO MENU", windowWidth * 0.475, windowHeight * 0.92 + windowHeight * 0.035)
}

function mouseClicked() {

    if (mouseX >= (windowWidth * 0.1) && mouseX <= (windowWidth * 0.1 + windowWidth * 0.8) && mouseY >= (windowHeight * 0.92) && mouseY <= (windowHeight * 0.92 + windowHeight * 0.06)) {  // writeup - code for button press detection
        console.log("Settings")
        window.location.href = 'index.html'
    }
}


function windowResized() {
    setup()
}