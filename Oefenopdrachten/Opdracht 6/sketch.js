
// mijn variable table data.

function setup() {
  createCanvas(380, 350);
}

function draw() {
  background(220);
  let text1 = ["red", "green", "blue", "purple", "yellow"]

  // nummers 1 t/m 8
  text("1", 20, 15);
  text("2", 20, 100);
  text("3", 20, 190);
  text("4", 20, 250);
  text("5", 120, 15);
  text("6", 120, 100);
  text("7", 120, 280);
  text("8", 120, 280);
  text("9", 240, 15);

  // hier begint mijn voorloop index

  for (let index = 0; index < 6; index++) {
    fill(text1[index])
    text(text1[index], 30, 15 + index * 15);

  }



}



// Een item uit de array halen
//console.log(appel[3]); //

// Een nieuw item toevoegen
// appel.push("appel is red");

// Alle items in de array bekijken
// for (let i = 0; i < appel; i++) {
// console.log(appel[i]);
// }

// Arrays gebruiken om cirkels te tekenen

// for (let i = 0; i < xPunten.length; i++) {
// ellipse(80 + xPunten[i], yPunten[i], 50, 22);
// fill("cyan")

// met deed daar 80 + xPunt zo dat ik de x positie kon op schuife
