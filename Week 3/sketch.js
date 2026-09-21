let gameState = "start";



async function setup() {
  createCanvas(800, 800);
  font = await loadFont('/assets/inconsolata.otf');
}

function mousePressed() {
  if (gameState == "start") {
    gameState = "spel";
  }
}


function draw() {
  background(220);

  fill("Red");
  rect(1, 0, 500, 900)

  fill("Blue");
  rect(380, 0, 500, 900)

  fill("Black");
  square(200, 100, 360, 20)

  fill("grey")
  square(205, 110, 90, 30); // vak 1 links boven
  square(322, 110, 90, 30);// vak 2 boven midden
  square(446, 110, 90, 30);// vak 3 boven rechts
  square(440, 240, 90, 30);// vak 4 // midden rechts
  square(205, 240, 90, 30);// vak 5 midden links
  square(320, 240, 90, 30);// vak 6 midden 
  square(320, 350, 90, 30); // vak 7 midden onder
  square(205, 350, 90, 30);// vak 8 links onder
  square(440, 350, 90, 30);// vak 9 rechts onder

  fill("cyan")
  circle(mouseX, mouseY, 50);

  if (gameState == "start") {
    textSize(85)
    fill("Blue")
    text("click", 120, 230, 90,)
    fill("white")
    text("to", 350, 230, 90,)
    fill("Red")
    text("start!", 480, 230, 90,)
  }
}
