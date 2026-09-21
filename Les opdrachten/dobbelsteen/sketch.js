let RandomNumber = 1;

function keyPressed() {
  if (key === 'c') {
    RandomNumber = floor(random(1, 7));
  }
}

function setup() {
  createCanvas(710, 400);
}

function draw() {
  background(220);

  //dobbelsteen
  fill("White");
  square(200, 70, 200, 20);

  fill("Black");

  if (RandomNumber == 1) {
    circle(300, 170, 50);
  }

  if (RandomNumber == 2) {
    circle(240, 110, 50);
    circle(360, 230, 50);
  }

  if (RandomNumber == 3) {
    circle(300, 170, 50);
    circle(240, 110, 50);
    circle(360, 230, 50);
  }

  if (RandomNumber == 4) {
    circle(240, 110, 50);
    circle(240, 230, 50);
    circle(360, 230, 50);
    circle(360, 110, 50);
  }

  if (RandomNumber == 5) {
    circle(360, 110, 50);
    circle(300, 170, 50);
    circle(360, 230, 50);
    circle(240, 230, 50);
    circle(240, 110, 50);
  }

  if (RandomNumber == 6) {
    circle(240, 170, 50);
    circle(240, 110, 50);
    circle(360, 230, 50);
    circle(360, 170, 50);
    circle(360, 110, 50);
    circle(240, 230, 50);
  }
}