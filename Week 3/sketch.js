let gameStart = "start"; // een variable voor spel start
let vak1X = 205;
let vak1Y = 110;
let vak2X = 322
let vak2Y = 110
let vak3X = 446
let vak3Y = 110


let vakSize = 90;
let vakRadius = 30;

let vak1 = 0;
let vak2 = 0;
let vak3 = 0;

let speler = 2;



async function setup() {
  createCanvas(800, 800);
  font = await loadFont('/assets/inconsolata.otf');
  //  dit is de font
}

function mousePressed() {
  if (gameStart == "start") {
    gameStart = "spel";
  }  // game start wannaeeer ik op mijn muis click
}


function draw() {
  background(220);

  fill("Red");
  rect(1, 0, 500, 900)// dit is de roden linker achtergrond

  fill("Blue");
  rect(380, 0, 500, 900) // dit is de blauw rechte achtergrond

  fill("Black");
  square(200, 100, 360, 20) // dit is het square waar de spel op wordt gespeeld

  fill("grey")
  square(440, 240, 90, 30);// vak 4 // midden rechts
  square(205, 240, 90, 30);// vak 5 midden links
  square(320, 240, 90, 30);// vak 6 midden 
  square(320, 350, 90, 30); // vak 7 midden onder
  square(205, 350, 90, 30);// vak 8 links onder
  square(440, 350, 90, 30);// vak 9 rechts onder
  // dit zijn de vakken die ik heb gemaakt en,
  // die ik ook later nodig heb om te zien waar elke vak is


  if (vak1 == 0) {
    fill("grey");
  }
  else if (vak1 == 1) {
    fill("blue");
  }
  else if (vak1 == 2) {
    fill("red");
  }
  square(vak1X, vak1Y, vakSize, vakRadius);// vak 1 links boven

  if (vak2 == 0) {
    fill("grey");
  }
  else if (vak2 == 1) {
    fill("blue");
  }
  else if (vak2 == 2) {
    fill("red");
  }
  square(vak2X, vak2Y, vakSize, vakRadius);// vak 2 boven midden

  if (vak3 == 0) {
    fill("grey");
  }
  else if (vak3 == 1) {
    fill("blue");
  }
  else if (vak3 == 2) {
    fill("red");
  }
  square(vak3X, vak3Y, vakSize, vakRadius);// vak 3 boven rechts

  fill("cyan")
  circle(mouseX, mouseY, 50);
  // dit is die grappige blauw circle om te zien waar je mouse is

  if (gameStart == "start") {
    textSize(85)
    fill("Blue")
    text("click", 120, 230, 90,)
    fill("white")
    text("to", 350, 230, 90,)
    fill("Red")
    text("start!", 480, 230, 90,)
  }  // dit zijn de leters voor de font / gameStart
}


function mousePressed() {

  if (mouseX > vak1X && mouseX < vak1X + vakSize) {
    if (mouseY > vak1Y && mouseY < vak1Y + vakSize) {
      vak1 = speler;

      speler = speler + 1;

      if (speler > 2) {
        speler = 1
      }

    }
  }

  if (mouseX > vak2X && mouseX < vak2X + vakSize) {
    if (mouseY > vak2Y && mouseY < vak2Y + vakSize) {
      vak2 = speler;

      speler = speler + 1;

      if (speler > 2) {
        speler = 1
      }

    }
  }

  if (mouseX > vak3X && mouseX < vak3X + vakSize) {
    if (mouseY > vak3Y && mouseY < vak3Y + vakSize) {
      vak3 = speler;

      speler = speler + 1;

      if (speler > 2) {
        speler = 1
      }

    }
  }

}