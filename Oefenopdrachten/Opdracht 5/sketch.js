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

    rect(30, 90 + r * 30, 40, 40)
  }
  // opdracht 3
  for (let b = 0; b < 4; b++) {
    fill(0, (225 / 4) * b + 90, 0)

    rect(rechtX + b * rechtY, 50, 50, 25)
  }

  /// opdracht 4
  for (let h = 0; h < 4; h++) {
    fill(5, 93, 245, (225 / 4) * h + 45,)
    
    rect(120 + h * hX, 120,50, 50 + h * 20);
  }


}
