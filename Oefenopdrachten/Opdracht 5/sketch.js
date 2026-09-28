// opdracht 3
let rechtX = 90;
let rechtY = 30;

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
    text("2", 20, 90)

    rect(30, 90 + r * 30, 40, 40)
  }
  // opdracht 3
  for (let b = 0; b < 4; b++) {
    fill(0, (225 / 4) * b + 90, 0)
    text("3", 80, 50)

    rect(rechtX + b * rechtY, 50, 50, 25)
  }

  /// opdracht 4
  for (let h = 0; h < 4; h++) {
    fill(0, 0, 255 - (225 / 4 * h));
    text("4", 115, 110)

    rect(120 + h * hX, 120, 50, 50 + h * 20);
  }

  for (let c = 0; c < 4; c++) {
    strokeWeight(c * 2)
    fill(255, 255, 255);
    
    circle(401 + c * 65, 50, 30);
    
  }
}
