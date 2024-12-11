function setup() {
    createCanvas(windowWidth, windowHeight)
    background(38, 77, 115);
}

function draw() {
    fill(51, 51, 51)
    rect(windowWidth * 0.3, windowHeight * 0.1, windowWidth * 0.4, windowHeight * 0.06, 10)
    fill(255)
    text("HELP", windowWidth * 0.49, windowHeight * 0.1 + windowHeight * 0.035)

    fill(51, 51, 51)
    rect(windowWidth * 0.2, windowHeight * 0.3, windowWidth * 0.6, windowHeight * 0.45, 10)
    fill(255)
    text("=== HOW TO PLAY ===", windowWidth * 0.461, windowHeight * 0.3 + windowHeight * 0.035)
    text("You will start the game with two stations, where you will have a grace period to construct a link between the two intial stations", windowWidth * 0.21, windowHeight * 0.3 + (windowHeight * 0.035 * 2))
    text("After this grace period, trains will begin to spawn. Send them to the station that is the same colour as the train to gain money!", windowWidth * 0.21, windowHeight * 0.3 + (windowHeight * 0.035 * 3))
    text("If you send the train to the wrong station, you will loose money.", windowWidth * 0.21, windowHeight * 0.3 + (windowHeight * 0.035 * 4))
    text("Make sure to build your network in the best way possible to avoid collions, as these will cost you heavilly and destroy tracks!", windowWidth * 0.21, windowHeight * 0.3 + (windowHeight * 0.035 * 5))
    text("Over time more trains and stations will spawn. Try to keep up by expanding your network and clearing any obstacles in your way.", windowWidth * 0.21, windowHeight * 0.3 + (windowHeight * 0.035 * 6))
    text("Sucsesfully route 25 trains to win!", windowWidth * 0.21, windowHeight * 0.3 + (windowHeight * 0.035 * 7))
    text("-KEYBINDS-", windowWidth * 0.21, windowHeight * 0.3 + (windowHeight * 0.035 * 8))
    text("Q/E - Rotate track", windowWidth * 0.21, windowHeight * 0.3 + (windowHeight * 0.035 * 9))
    text("1/2/3 - Change mode", windowWidth * 0.21, windowHeight * 0.3 + (windowHeight * 0.035 * 10))
    text("-/+ - Zoom in/out", windowWidth * 0.21, windowHeight * 0.3 + (windowHeight * 0.035 * 11))




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