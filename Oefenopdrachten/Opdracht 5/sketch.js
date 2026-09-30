// opdracht 3
let rechtX = 90;
let rechtY = 30;

let mX = 380
let mY = 200
let mSize = 180
let m2Size = 155

let hX = 30
let hY = 90
let rectSize = 10
let rectRadius = 30
// opdracht 4
// deze vab hoort bij opdracht 2

function setup() {
  createCanvas(800, 400);
}

function draw() {
  strokeWeight(1);
  background(220);
  // opdracht 1
  fill("white")
  for (let i = 0; i < 10; i++) {

    text("1", 20, 60)
    textSize(18)
    rect(i * 38, 0, 40, 40);

    if (i == 5) {
      fill("blue");
    }
    else {
      fill("white");
    }


  }
  // opdracht 2
  for (let r = 0; r < 5; r++) {
    fill((255 / 4) * r)
    text("2", 20, 280)

    rect(30, 90 + r * 30, 40, 40);
  }
  // opdracht 3
  let som3 = rechtX;
  text("3", 80, 50);               // buiten de loop dan wordt hij maar 1x getekend

  for (let b = 0; b < 4; b++) {
    fill(0, (255 / 4) * b + 90, 0); // kleur

    let breedte = 50;              // hier blijft de breedte gelijk
    rect(som3, 50, breedte, 25);

    som3 = som3 + breedte;         // volgend rechthoek begint waar deze eindigt
  }

  /// opdracht 4
  let som = 120;
  for (let h = 0; h < 4; h++) {
    fill(0, 0, 255 - (225 / 4 * h)); // kleur

    text("4", 115, 280)  // hulp gekregen van lars hier.

    let breedte = 50 + h * 20;
    rect(som, 300, breedte, 50 + h * 20);


    som = som + breedte;
    console.log(som);


  }

  for (let c = 0; c < 4; c++) {
    strokeWeight(c * 2)
    fill(255, 255, 255);

    circle(401 + c * 65, 50, 30);

    text("6", 640, 60)

  }

  strokeWeight(1)

  for (let m = 0; m < 3; m++) {
    fill("red")
    circle(mX, mY, mSize - m * 50)
    fill("white")
    circle(mX, mY, m2Size - m * 50)
    text("5", 260, 200)
  }

  fill("blue");
  circle(380, 200, 30);


  for (let f = 0; f < 11; f++) {
    fill(255 - (f % 2 === 0) * 55);
    text("7", 600, 160)


    // hulp gekregen van Lars.
    let downMargin = 0;
    if (f > 6) {
      downMargin = 40;
    }

    rect(508 - 6, 90 + f * 29, 20 + f * 20 - ((f - 6) * downMargin), 30 - 2);
  }
}
