let aantal = 40;

let vorm = [];
let x = [];
let y = [];
let grootte = [];
let snelX = [];
let snelY = [];
let r = [];
let g = [];
let b = [];

function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);
  angleMode(DEGREES);
  maakKunst();
}

function maakKunst() {
  for (let i = 0; i < aantal; i++) {
    vorm[i] = floor(random(4));
    x[i] = random(width);
    y[i] = random(height);
    grootte[i] = random(20, 80);
    snelX[i] = random(-3, 3);
    snelY[i] = random(-3, 3);
    r[i] = random(255);
    g[i] = random(255);
    b[i] = random(255);
  }
}

function draw() {
  background(20, 20, 30, 40);

  let lijnY = 0;
  stroke(255, 25);
  while (true) {
    line(0, lijnY, width, lijnY);
    lijnY = lijnY + 50;
    if (lijnY > height) {
      break;
    }
  }

  for (let i = 0; i < aantal; i++) {
    if (dist(mouseX, mouseY, x[i], y[i]) > 150) {
      continue;
    }
    stroke(255, 80);
    line(mouseX, mouseY, x[i], y[i]);
  }

  noStroke();
  for (let i = 0; i < aantal; i++) {
    x[i] = x[i] + snelX[i];
    y[i] = y[i] + snelY[i];

    if (x[i] < 0 || x[i] > width) {
      snelX[i] = snelX[i] * -1;
    }
    if (y[i] < 0 || y[i] > height) {
      snelY[i] = snelY[i] * -1;
    }

    let s = grootte[i];
    if (dist(mouseX, mouseY, x[i], y[i]) < 100) {
      s = s * 1.5;
    }

    fill(r[i], g[i], b[i], 200);

    if (vorm[i] == 0) {
      rect(x[i], y[i], s, s);
    } else if (vorm[i] == 1) {
      ellipse(x[i], y[i], s, s);
    } else if (vorm[i] == 2) {
      beginShape();
      vertex(x[i], y[i] - s / 2);
      vertex(x[i] + s / 2, y[i] + s / 2);
      vertex(x[i] - s / 2, y[i] + s / 2);
      endShape(CLOSE);
    } else {
      beginShape();
      for (let hoek = 0; hoek < 360; hoek = hoek + 60) {
        vertex(x[i] + cos(hoek) * s / 2, y[i] + sin(hoek) * s / 2);
      }
      endShape(CLOSE);
    }
  }
}

function keyPressed() {
  if (keyCode == BACKSPACE) {
    maakKunst();
    return false;
  }
}