let dayC, nightC, sunriseC;
let totalDayTime = 300;

function setup() {
  createCanvas(800, 600);
  noStroke();
  dayC = color(150, 220, 255);
  nightC = color(0, 0, 50);
  sunriseC = color(220, 150, 200);
}

function draw() {
  let angle = (TWO_PI * frameCount) / totalDayTime;
  let time = cos(angle);

  // Lucht
  let c;
  if (time < 0) {
    c = lerpColor(sunriseC, nightC, map(time, 0, -1, 0, 1));
  } else {
    c = lerpColor(sunriseC, dayC, time);
  }
  background(c);

  // Zon en maan
  let horizon = 360;
  let sunX = width / 2 + sin(angle) * 450;
  let sunY = horizon - cos(angle) * 260;
  let moonX = width / 2 - sin(angle) * 450;
  let moonY = horizon + cos(angle) * 260;

  fill("yellow");
  circle(sunX, sunY, 60);
  fill(200);
  circle(moonX, moonY, 60);

  // Gras
  fill("green");
  rect(0, 360, width, 40);

  // Weg
  fill("grey");
  rect(0, 400, width, 200);

  // Witte strepen
  fill("white");
  for (let x = 1; x < width; x += 100) {
    rect(x, 512, 90, 20);
  }

  // Stoplicht
  fill("grey");
  rect(710, 390, 10, 90);
  rect(680, 300, 70, 120);

  fill("red");
  circle(715, 320, 30);
  fill("orange");
  circle(715, 360, 30);
  fill("green");
  circle(715, 400, 30);

  // Auto's
  auto(100, 450, "red");
  auto(400, 450, "blue");

  // Tijdbalk
  fill(0);
  rect(0, 0, width, 30);
  fill(255);
  textAlign(CENTER, CENTER);
  text(floor(time * 1000) / 1000, width / 2, 15);
}

function auto(x, y, kleur) {
  // onderkant
  fill(kleur);
  rect(x, y, 140, 30);

  // dak
  rect(x + 30, y - 25, 80, 25);

  // wielen
  fill("black");
  square(x + 15, y + 20, 30);
  square(x + 95, y + 20, 30);
}