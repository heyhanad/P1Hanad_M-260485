

function setup() {
  createCanvas(380, 350);
}

function draw() {
  background(220);
  let kleuren = ["red", "green", "blue", "purple", "yellow"];
  /////////////// 0 ////// 1////// 2////// 3////////// 4

  // nummers
  fill(0);
  text("1", 20, 15);
  text("2", 20, 100);
  text("3", 20, 190);
  text("4", 20, 250);
  text("5", 120, 15);
  text("6", 120, 100);
  text("7", 120, 200);
  text("8", 120, 280);
  text("9", 240, 15);

  //1.
  for (let i = 0; i < 5; i++) {
    fill(kleuren[i]);
    text(kleuren[i], 30, 15 + i * 15);
  }


  //2.
  kleuren.shift();
  kleuren.push("red");
  for (let i = 0; i < kleuren.length; i++) {
    fill(kleuren[i]);
    text(kleuren[i], 30, 100 + i * 15);
  }

  kleuren = ["red", "green", "blue", "purple", "yellow"];
  kleuren.splice(2, 3)
  kleuren.push("yellow")
  for (let i = 0; i < kleuren.length; i++) {
    fill(kleuren[i]);
    text(kleuren[i], 30, 190 + i * 15);
  }
  Cijfers = [240, 10, 30, 60, 244];
  Cijfers.splice(0)
  Cijfers.push(240, 10, 30, 60, 244)

  for (let i = 0; i < Cijfers.length; i = i + 1) {
    fill(Cijfers[i]);
    text(Cijfers[i], 30, 250 + i * 15);
  }

  //let randomCijfers = [60, 40, 10, 20, 67868, 2];
  let randomCijfers = [200, 200];
  let antwoord = 0;
  for (let i = 0; i < randomCijfers.length; i = i + 1) {
    let cijfer = randomCijfers[i];
    antwoord = antwoord + cijfer;
  }

  push();
  textSize(32);
  fill(0);
  text(antwoord, 130, 15, 90);
  pop();


  // let randomCijfers1 = [2 * 2, "x"];
  // let antwoord1 = 0;
  // for (let i = 0; i < randomCijfers1.length; i = i + 1) {
  //   let cijfer1 = randomCijfers1[i];
  //   antwoord1 = antwoord1 + cijfer1;
  // }

  let woord = "GabriEl van der Kooij ee"
  let teller = 0; // Hoeveel e's er in het woord zitten
  for (let i = 0; i < woord.length; i++) {
    let letter = woord[i];
    if (letter == "e" || letter == "E") {
      teller = teller + 1;
    }
  }

  textSize(32);
  fill(0);
  text(teller + "x", 133, 100);

  textSize(12);


  kleuren5 = ["blue", "green", "purple", "red", "yellow"];
  for (let i = 0; i < 5; i++) {
    fill(kleuren5[i]);
    text(kleuren5[i], 13 + 120, 200 + i * 15);

  }





  for (let i = 0; i < 5; i++) {
    rect(90 + i * 30, 300, 40, 40);

    if (i == 0) {
      fill(48, 18, 110);
    } else {
      fill("white");
    }


  }





}



// Een item uit de array halen
//console.log(appel[3]); //

// Een nieuw item toevoegen
// appel.push("appel is red");

// Alle iptems in de array bekijken
// for (let i = 0; i < appel; i++) {
// console.log(appel[i]);
// }

// Arrays gebruiken om cirkels te tekenen

// for (let i = 0; i < xPunten.length; i++) {
// ellipse(80 + xPunten[i], yPunten[i], 50, 22);
// fill("cyan")

// met deed daar 80 + xPunt zo dat ik de x positie kon op schuife
