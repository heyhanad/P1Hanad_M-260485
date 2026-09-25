let gameStart = "start"; // een variable voor spel start
// dit zijn de varb voor de x/y vakken
let vak1X = 205;
let vak1Y = 110;
let vak2X = 322;
let vak2Y = 110;
let vak3X = 446;
let vak3Y = 110;
let vak4X = 440;
let vak4Y = 240;
let vak5X = 205;
let vak5Y = 240;
let vak6X = 320;
let vak6Y = 240;
let vak7X = 320;
let vak7Y = 350;
let vak8X = 205;
let vak8Y = 350;
let vak9X = 440;
let vak9Y = 350;



let vakSize = 90;
let vakRadius = 30;
// vaken
let vak1 = 0;
let vak2 = 0;
let vak3 = 0;
let vak4 = 0;
let vak5 = 0;
let vak6 = 0;
let vak7 = 0;
let vak8 = 0;
let vak9 = 0;

// speler 1 heeft blauw / speler 2 heeft rood
let speler = 2;



async function setup() {
  createCanvas(800, 800);
  font = await loadFont('/assets/inconsolata.otf');
  //  dit is de font = text
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

  if (vak4 == 0) {
    fill("grey");
  }
  else if (vak4 == 1) {
    fill("blue");
  }
  else if (vak4 == 2) {
    fill("red");
  }
  square(vak4X, vak4Y, vakSize, vakRadius);// vak 4 // midden rechts

  if (vak5 == 0) {
    fill("grey");
  }
  else if (vak5 == 1) {
    fill("blue");
  }
  else if (vak5 == 2) {
    fill("red");
  }
  square(vak5X, vak5Y, vakSize, vakRadius);// vak 5 midden links

  if (vak6 == 0) {
    fill("grey");
  }
  else if (vak6 == 1) {
    fill("blue");
  }
  else if (vak6 == 2) {
    fill("red");
  }
  square(vak6X, vak6Y, vakSize, vakRadius);// vak 6 midden 

  if (vak7 == 0) {
    fill("grey")
  }
  else if (vak7 == 1) {
    fill("blue")
  }
  else if (vak7 == 2) {
    fill("red")
  }
  square(vak7X, vak7Y, vakSize, vakRadius); // vak 7 midden onder

  if (vak8 == 0) {
    fill("grey")
  }
  else if (vak8 == 1) {
    fill("blue")
  }
  else if (vak8 == 2) {
    fill("red")
  }
  square(vak8X, vak8Y, vakSize, vakRadius);// vak 8 links onder


  if (vak9 == 0) {
    fill("grey")
  }
  else if (vak9 == 1) {
    fill("blue")
  }
  else if (vak9 == 2) {
    fill("red")
  }
  square(vak9X, vak9Y, vakSize, vakRadius);// vak 9 rechts onder

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

  if (mouseX > vak1X && mouseX < vak1X + vakSize && vak1 == 0) {
    if (mouseY > vak1Y && mouseY < vak1Y + vakSize) {
      vak1 = speler;

      speler = speler + 1;

      if (speler > 2) {
        speler = 1
      }

    }
  }

  if (mouseX > vak2X && mouseX < vak2X + vakSize && vak2 == 0) {
    if (mouseY > vak2Y && mouseY < vak2Y + vakSize) {
      vak2 = speler;

      speler = speler + 1;

      if (speler > 2) {
        speler = 1
      }

    }
  }

  if (mouseX > vak3X && mouseX < vak3X + vakSize && vak3 == 0) {
    if (mouseY > vak3Y && mouseY < vak3Y + vakSize) {
      vak3 = speler;

      speler = speler + 1;

      if (speler > 2) {
        speler = 1
      }

    }
  }

  if (mouseX > vak4X && mouseX < vak4X + vakSize && vak4 == 0) {
    if (mouseY > vak4Y && mouseY < vak4Y + vakSize) {
      vak4 = speler;

      speler = speler + 1;

      if (speler > 2) {
        speler = 1
      }

    }
  }

  if (mouseX > vak5X && mouseX < vak5X + vakSize && vak5 == 0) {
    if (mouseY > vak5Y && mouseY < vak5Y + vakSize) {
      vak5 = speler;

      speler = speler + 1;

      if (speler > 2) {
        speler = 1
      }

    }
  }

  if (mouseX > vak6X && mouseX < vak6X + vakSize && vak6 == 0) {
    if (mouseY > vak6Y && mouseY < vak6Y + vakSize) {
      vak6 = speler;

      speler = speler + 1;

      if (speler > 2) {
        speler = 1
      }

    }
  }

  if (mouseX > vak7X && mouseX < vak7X + vakSize && vak7 == 0) {
    if (mouseY > vak7Y && mouseY < vak7Y + vakSize) {
      vak7 = speler;

      speler = speler + 1;

      if (speler > 2) {
        speler = 1
      }

    }
  }


  if (mouseX > vak8X && mouseX < vak8X + vakSize && vak8 == 0) {
    if (mouseY > vak8Y && mouseY < vak8Y + vakSize) {
      vak8 = speler;

      speler = speler + 1;

      if (speler > 2) {
        speler = 1
      }

    }
  }

  if (mouseX > vak9X && mouseX < vak9X + vakSize && vak9 == 0) {
    if (mouseY > vak9Y && mouseY < vak9Y + vakSize) {
      vak9 = speler;

      speler = speler + 1;

      if (speler > 2) {
        speler = 1
      }

    }
  }

  if (vak1 == 1 && vak2 == 1 && vak3 == 1) {
     fill("white")
    text("BLUE WINS!", 350, 230, 90)
  }
  
}

