let dayC, nightC, sunriseC;
let totalDayTime = 500;
let verkeerslicht = 0;
let autoX = 100;
let autoBlueX = 400;
let wolkX = 70;

const STOP_LINE = 540;
const QUEUE_GAP = 160; // ruimte tussen wachtende autos auto is 140 breed)


function setup() {
  createCanvas(800, 600);
  noStroke();

  dayC = color(150, 220, 255);
  nightC = color(0, 0, 50);
  sunriseC = color(220, 150, 200);
}

function draw() {
  verkeerslicht = floor(frameCount / 120) % 3;

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

  // Bergen
  fill("grey");
  triangle(0, 360, 360, 360, 160, 100);
  triangle(360, 360, 720, 360, 520, 100);

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

  // Wolk
  wolkX = wolkX + 1;
  if (wolkX > width + 100) {
    wolkX = -100;
  }

  fill("white");
  circle(wolkX, 90, 50);
  circle(wolkX + 35, 90, 65);
  circle(wolkX + 70, 90, 50);
  rect(wolkX, 90, 70, 30);

  // Auto's: snapshot van de posities NU, zodat beide auto's dezelfde
  // "wie staat er voorop"-beslissing gebruiken (geen volgorde-afhankelijkheid).
  let redPrev = autoX;
  let bluePrev = autoBlueX;

  autoX = updateCar(redPrev, bluePrev, verkeerslicht);
  autoBlueX = updateCar(bluePrev, redPrev, verkeerslicht);

  auto(autoX, 450, "red");
  auto(autoBlueX, 450, "blue");

  // Stoplicht
  fill("grey");
  rect(710, 390, 10, 90);
  rect(680, 300, 70, 120);

  fill(verkeerslicht == 0 ? "red" : "darkred");
  circle(715, 320, 30);

  fill(verkeerslicht == 1 ? "orange" : "darkorange");
  circle(715, 360, 30);

  fill(verkeerslicht == 2 ? "green" : "darkgreen");
  circle(715, 400, 30);

  // Tijdbalk
  fill(0);
  rect(0, 0, width, 30);

  fill(255);
  textAlign(CENTER, CENTER);
  text(floor(time * 1000) / 1000, width / 2, 15);
}

// Beweegt één auto en zorgt dat hij achter een auto die vóór hem staat
// wacht, in plaats van er bovenop te rijden.
function updateCar(x, otherX, light) {
  // Wie rijdt er voorop? Degene met de grootste x (verder de weg op).
  let stopX = x >= otherX ? STOP_LINE : STOP_LINE - QUEUE_GAP;

  if (light == 2) {
    x += 3;
  } else if (x < stopX) {
    x += 3;
    if (x > stopX) x = stopX;
  }

  if (x > width + 140) {
    x = -140;
  }

  return x;
}

function auto(x, y, kleur) {
  fill(kleur);
  rect(x, y, 140, 30);
  rect(x + 30, y - 25, 80, 25);

  fill("black");
  square(x + 15, y + 20, 30);
  square(x + 95, y + 20, 30);
}