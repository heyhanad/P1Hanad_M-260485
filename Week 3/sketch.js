let gameStart = "start"; // een variable voor spel start
let vak1X = 205;
let vak1Y = 110;
let vak2X = 322
let vak2Y = 110
let vak3X = 446
let vak3Y = 110
let vak4X = 440
let vak4Y = 240
let vak5X = 320
let vak5Y = 240
let vak6X = 205
let vak6Y = 240
let vak7X = 320
let vak7Y = 350
let vak8X = 205
let vak8Y = 350
let vak9X = 440
let vak9Y = 350


let vakSize = 90;
let vakRadius = 30;

let vak1 = 0;
let vak2 = 0;
let vak3 = 0;
let vak4 = 0;
let vak5 = 0;
let vak6 = 0;
let vak7 = 0;
let vak8 = 0;
let vak9 = 0;


let speler = 2;
let winnaar = 0; // nieuw: houdt bij wie er gewonnen heeft



async function setup() {
  createCanvas(800, 800);
  font = await loadFont('/assets/inconsolata.otf');
  //  dit is de font
}



function draw() {
  background(220);

  fill("Red");
  rect(1, 0, 500, 900)// dit is de roden linker achtergrond

  fill("Blue");
  rect(380, 0, 500, 900) // dit is de blauw rechte achtergrond

  fill("Black");
  square(200, 100, 360, 20) // dit is het square waar de spel op wordt gespeeld

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
    fill("grey");
  }
  else if (vak7 == 1) {
    fill("blue");
  }
  else if (vak7 == 2) {
    fill("red");
  }
  square(vak7X, vak7Y, vakSize, vakRadius); // vak 7 midden onder

  if (vak8 == 0) {
    fill("grey");
  }
  else if (vak8 == 1) {
    fill("blue");
  }
  else if (vak8 == 2) {
    fill("red");
  }
  square(vak8X, vak8Y, vakSize, vakRadius);// vak 8 links onder

  if (vak9 == 0) {
    fill("grey");
  }
  else if (vak9 == 1) {
    fill("blue");
  }
  else if (vak9 == 2) {
    fill("red");
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

  if (gameStart == "einde") {
    textSize(60);
    if (winnaar == 1) {
      fill("blue");
      text("Blauw wint!", 150, 500);
    } else if (winnaar == 2) {
      fill("red");
      text("Rood wint!", 150, 500);
    }
  } // dit laat de winnaar zien
}


function checkWin() {
  if (vak1 != 0 && vak1 == vak2 && vak2 == vak3) return vak1;
  if (vak6 != 0 && vak6 == vak5 && vak5 == vak4) return vak6;
  if (vak8 != 0 && vak8 == vak7 && vak7 == vak9) return vak8;

  if (vak1 != 0 && vak1 == vak6 && vak6 == vak8) return vak1;
  if (vak2 != 0 && vak2 == vak5 && vak5 == vak7) return vak2;
  if (vak3 != 0 && vak3 == vak4 && vak4 == vak9) return vak3;

  if (vak1 != 0 && vak1 == vak5 && vak5 == vak9) return vak1;
  if (vak3 != 0 && vak3 == vak5 && vak5 == vak8) return vak3;

  return 0; // check win hij checkt hier wie heeft gewonnen als je 3 vakken de zelfde kleur zijn.
}


function mousePressed() {

  if (gameStart == "start") {
    gameStart = "spel";
    return; // stop hier, zodat je niet gelijk ook een vak aanklikt
  }

  if (gameStart == "einde") {
    return;
  }

  if (mouseX > vak1X && mouseX < vak1X + vakSize) {
    if (mouseY > vak1Y && mouseY < vak1Y + vakSize) {
      if (vak1 == 0) {
        vak1 = speler;

        speler = speler + 1;

        if (speler > 2) {
          speler = 1
        }
      }
    }
  }

  if (mouseX > vak2X && mouseX < vak2X + vakSize) {
    if (mouseY > vak2Y && mouseY < vak2Y + vakSize) {
      if (vak2 == 0) {
        vak2 = speler;

        speler = speler + 1;

        if (speler > 2) {
          speler = 1
        }
      }
    }
  }

  if (mouseX > vak3X && mouseX < vak3X + vakSize) {
    if (mouseY > vak3Y && mouseY < vak3Y + vakSize) {
      if (vak3 == 0) {
        vak3 = speler;

        speler = speler + 1;

        if (speler > 2) {
          speler = 1
        }
      }
    }
  }

  if (mouseX > vak4X && mouseX < vak4X + vakSize) {
    if (mouseY > vak4Y && mouseY < vak3Y + vakSize) {
      if (vak3 == 0) {
        vak3 = speler;

        speler = speler + 1;

        if (speler > 2) {
          speler = 1
        }
      }
    }
  }

  if (mouseX > vak4X && mouseX < vak4X + vakSize) {
    if (mouseY > vak4Y && mouseY < vak4Y + vakSize) {
      if (vak4 == 0) {
        vak4 = speler;

        speler = speler + 1;

        if (speler > 2) {
          speler = 1
        }
      }
    }
  }

  if (mouseX > vak4X && mouseX < vak4X + vakSize) {
    if (mouseY > vak4Y && mouseY < vak4Y + vakSize) {
      if (vak4 == 0) {
        vak4 = speler;

        speler = speler + 1;

        if (speler > 2) {
          speler = 1
        }
      }
    }
  }

  if (mouseX > vak5X && mouseX < vak5X + vakSize) {
    if (mouseY > vak5Y && mouseY < vak5Y + vakSize) {
      if (vak5 == 0) {
        vak5 = speler;

        speler = speler + 1;

        if (speler > 2) {
          speler = 1
        }
      }
    }
  }

  if (mouseX > vak6X && mouseX < vak6X + vakSize) {
    if (mouseY > vak6Y && mouseY < vak6Y + vakSize) {
      if (vak6 == 0) {
        vak6 = speler;

        speler = speler + 1;

        if (speler > 2) {
          speler = 1
        }
      }
    }
  }

  if (mouseX > vak7X && mouseX < vak7X + vakSize) {
    if (mouseY > vak7Y && mouseY < vak7Y + vakSize) {
      if (vak7 == 0) {
        vak7 = speler;

        speler = speler + 1;

        if (speler > 2) {
          speler = 1
        }
      }
    }
  }

  if (mouseX > vak8X && mouseX < vak8X + vakSize) {
    if (mouseY > vak8Y && mouseY < vak8Y + vakSize) {
      if (vak8 == 0) {
        vak8 = speler;

        speler = speler + 1;

        if (speler > 2) {
          speler = 1
        }
      }
    }
  }

  if (mouseX > vak9X && mouseX < vak9X + vakSize) {
    if (mouseY > vak9Y && mouseY < vak9Y + vakSize) {
      if (vak9 == 0) {
        vak9 = speler;

        speler = speler + 1;

        if (speler > 2) {
          speler = 1
        }
      }
    }
  }

  winnaar = checkWin();
  if (winnaar != 0) {
    gameStart = "einde";
  }
}