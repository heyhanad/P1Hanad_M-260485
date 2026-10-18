let stats = {
  health: 100,
  energy: 100,
  happiness: 100,
  hunger: 100
};
let petX = 400;
let petY = 500;
let petSize = 450;
let draggingPet = false;

let imgMonster
let imgBackground
let imgSword
let imgBed
let imgPizza
let imgTV
let tvVideo
let tvMusic

let TV_IMAGE_CROP = { x: 252, y: 205, width: 150, height: 285 };
let TV_WIDTH = 220;
let TV_HEIGHT = 418;
let TV_SCREEN_CROP = { x: 273, y: 227, width: 109, height: 88 };
let happinessButton;
let tvVisible = false;
let videoPlayingOnTV = false;
let petWasNearTV = false;

///

function preload() {
  imgMonster = loadImage('Monster.png'); // Monster energy = drinken
  imgBackground = loadImage('Background.png');// background
  imgSword = loadImage('minecraf diamond longSword p5.png');// THE DIAMONDLONGSWORDD  LOOL
  imgBed = loadImage('Bed.png');// Tuff bed
  imgPizza = loadImage('pizza.png');// i love pizza but not fries so put the fries in the bag lil bro
  imgTV = loadImage('minecraft TV.png');
  tvMusic = loadSound('2.06_-_Kaleo_-_Way_Down_We_Go_OST_Lucifer_(mp3.pm).mp3');
}

let foods = [];
let drinks = [];
let statNames = ["health", "energy", "happiness", "hunger"];

let Food;
let Drink;
let Sleep;

let stickX = 150;
let stickY = 700;
let draggingStick = false;
let hitTimer = 0;
let gameCanvas;
let gameScale = 1;
let gameWorldWidth = 800;
let bedX = 650;
let bedY = 650;
let bedVisible = false;
let petSleeping = false;

function setup() {
  gameCanvas = createCanvas(windowWidth, windowHeight);

  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  gameCanvas.style("display", "block");

  tvVideo = createVideo('11.1 — Timeline export of 10.1.mp4');
  tvVideo.hide();
  tvVideo.elt.playsInline = true;
  tvVideo.elt.muted = true;
  tvVideo.elt.onended = function () {
    videoPlayingOnTV = false;
    tvMusic.stop();
    setGameControlsVisible(true);
  };
  tvVideo.elt.onerror = function () {
    videoPlayingOnTV = false;
    tvMusic.stop();
    setGameControlsVisible(true);
    console.error("De video kon niet worden afgespeeld:", tvVideo.elt.error);
  };

  Food = createButton("FoodSpawn");
  Food.style("background-color", "orange");
  Food.mousePressed(FoodSpawn);

  Drink = createButton("Drinken");
  Drink.style("background-color", "lightblue");
  Drink.mousePressed(DrinkSpawn);

  Sleep = createButton("Slapen");
  Sleep.style("background-color", "lightgreen");
  Sleep.mousePressed(sleepPet);

  happinessButton = createButton("Happiness");
  happinessButton.style("background-color", "pink");
  happinessButton.mousePressed(spawnTVAndBoostHappiness);

  fitCanvasToWindow();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  fitCanvasToWindow();
}

function fitCanvasToWindow() {
  let previousWorldWidth = gameWorldWidth;
  gameScale = height / 800;
  gameWorldWidth = width / gameScale;
  petX += (gameWorldWidth - previousWorldWidth) / 2;
  bedX = constrain(650, petSize / 2, gameWorldWidth - petSize / 2);

  Food.position(width - 250 * gameScale, 20 * gameScale);
  Food.style("font-size", 25 * gameScale + "px");
  Drink.position(width - 500 * gameScale, 20 * gameScale);
  Drink.style("font-size", 25 * gameScale + "px");
  Sleep.position(width - 400 * gameScale, 20 * gameScale);
  Sleep.style("font-size", 25 * gameScale + "px");
  happinessButton.position(width - 650 * gameScale, 20 * gameScale);
  happinessButton.style("font-size", 25 * gameScale + "px");
}

function draw() {
  if (videoPlayingOnTV) {
    background(0);
    if (tvVideo.elt.readyState >= 2) {
      let videoAspect = tvVideo.elt.videoWidth / tvVideo.elt.videoHeight;
      let canvasAspect = width / height;
      let videoWidth = width;
      let videoHeight = height;

      if (videoAspect > canvasAspect) {
        videoHeight = videoWidth / videoAspect;
      } else {
        videoWidth = videoHeight * videoAspect;
      }

      image(
        tvVideo,
        (width - videoWidth) / 2,
        (height - videoHeight) / 2,
        videoWidth,
        videoHeight
      );
    }
    return;
  }

  background(220);
  image(imgBackground, 0, 0, width, height);

  push();
  scale(gameScale);

  if (tvVisible) {
    let tvPosition = getTVPosition();
    image(
      imgTV,
      tvPosition.x,
      tvPosition.y,
      TV_WIDTH,
      TV_HEIGHT,
      TV_IMAGE_CROP.x,
      TV_IMAGE_CROP.y,
      TV_IMAGE_CROP.width,
      TV_IMAGE_CROP.height
    );

    let petNearTV = isPetNearTV();
    if (petNearTV && !petWasNearTV) {
      playVideoOnTV();
    }
    petWasNearTV = petNearTV;
  }

  stats.hunger -= 0.05;
  stats.energy -= 0.01;

  if (stats.hunger <= 0) {
    stats.health -= 0.05;
    stats.happiness -= 0.05;

    stats.energy -= 0.05;
  }

  petSleeping = bedVisible && dist(petX, petY, bedX, bedY) < 90;
  if (petSleeping) {
    stats.energy += 0.2;
  }

  for (let statIndex = 0; statIndex < statNames.length; statIndex++) {
    let statName = statNames[statIndex];
    stats[statName] = constrain(stats[statName], 0, 100);
  }

  // pet
  fill("Cyan");
  circle(petX, petY, petSize);

  if (bedVisible) {
    image(imgBed, bedX - 100, bedY - 70, 200, 140);
  }

  textSize(30)
  fill('black')
  text("HogRiderBOYY999", petX - 140, petY)

  if (petSleeping) {
    textSize(20);
    fill("white");
    text("Slaapt - energie herstelt", bedX - 105, bedY + 95);
  }

  // Eten en drinken tekenen
  for (let foodIndex = 0; foodIndex < foods.length; foodIndex++) {
    let food = foods[foodIndex];
    if (food) {
      image(imgPizza, food.x - 32, food.y - 32, 64, 64);
    }
  }
  for (let drinkIndex = 0; drinkIndex < drinks.length; drinkIndex++) {
    let drink = drinks[drinkIndex];
    if (drink) {
      image(imgMonster, drink.x - 22, drink.y - 35, 44, 70);
    }
  }

  // het zwaard
  image(imgSword, stickX - 50, stickY - 50, 100, 100);

  // slaan
  if (hitTimer > 0) {
    hitTimer = hitTimer - 1;
  }
  if (draggingStick == true && dist(stickX, stickY, petX, petY) < petSize / 2 && hitTimer == 0) {
    stats.health -= 10;
    hitTimer = 30;
  }

  // de bars
  noStroke(); // geen dunne rand om de blokjes

  // health
  // icons heb eerste zwarrt er onder gezet en dan rood
  fill(0);
  rect(32, 31, 12, 8);
  rect(48, 31, 12, 8);
  rect(28, 35, 36, 12);
  rect(32, 43, 28, 8);
  rect(36, 47, 20, 8);
  rect(40, 51, 12, 8);
  fill(220, 60, 40);
  rect(34, 33, 8, 4);
  rect(50, 33, 8, 4);
  rect(30, 37, 32, 8);
  rect(34, 45, 24, 4);
  rect(38, 49, 16, 4);
  rect(42, 53, 8, 4);
  // balk
  fill(225, 215, 205); // lichte buitenrand
  rect(92, 22, 316, 46, 6);
  fill(0); // zwarte rand
  rect(97, 27, 306, 36, 3);
  fill(60); // lege balk
  rect(100, 30, 300, 30);
  fill(200, 50, 40); // rode vulling
  rect(100, 30, stats.health * 3, 30);
  fill(255, 110, 100); // lichte streep
  rect(100, 33, stats.health * 3, 5);
  fill(160, 10, 0); // donkere streep
  rect(100, 55, stats.health * 3, 5);

  // energy
  // icoonse: bliksem
  fill(0);
  rect(44, 89, 16, 8);
  rect(40, 93, 16, 8);
  rect(36, 97, 24, 8);
  rect(40, 101, 16, 8);
  rect(36, 105, 16, 8);
  rect(36, 109, 12, 8);
  rect(32, 113, 12, 8);
  fill(130, 200, 50);
  rect(46, 91, 12, 4);
  rect(42, 95, 12, 4);
  rect(38, 99, 20, 4);
  rect(42, 103, 12, 4);
  rect(38, 107, 12, 4);
  rect(38, 111, 8, 4);
  rect(34, 115, 8, 4);
  // Rect balks
  fill(225, 215, 205);
  rect(92, 82, 316, 46, 6);
  fill(0);
  rect(97, 87, 306, 36, 3);
  fill(60);
  rect(100, 90, 300, 30);
  fill(130, 200, 50);
  rect(100, 90, stats.energy * 3, 30);
  fill(190, 255, 110);
  rect(100, 93, stats.energy * 3, 5);
  fill(90, 160, 10);
  rect(100, 115, stats.energy * 3, 5);

  // happy UI
  // icon: smile
  fill(0);
  rect(36, 147, 20, 8);
  rect(32, 151, 28, 8);
  rect(28, 155, 36, 20);
  rect(32, 171, 28, 8);
  rect(36, 175, 20, 8);
  fill(255, 200, 40);
  rect(38, 149, 16, 4);
  rect(34, 153, 24, 4);
  rect(30, 157, 32, 16);
  rect(34, 173, 24, 4);
  rect(38, 177, 16, 4);
  fill(0); // gezichtje
  rect(38, 161, 4, 4); // linker oog
  rect(50, 161, 4, 4); // rechter oog
  rect(34, 165, 4, 4); // mond links
  rect(54, 165, 4, 4); // mond rechts
  rect(38, 169, 16, 4); // mond onder
  // balk
  fill(225, 215, 205);
  rect(92, 142, 316, 46, 6);
  fill(0);
  rect(97, 147, 306, 36, 3);
  fill(60);
  rect(100, 150, 300, 30);
  fill(255, 200, 40);
  rect(100, 150, stats.happiness * 3, 30);
  fill(255, 255, 100);
  rect(100, 153, stats.happiness * 3, 5);
  fill(215, 160, 0);
  rect(100, 175, stats.happiness * 3, 5);

  // hunger blauw
  // icons eten oranje bolletje
  fill(0);
  rect(36, 207, 20, 8);
  rect(32, 211, 28, 8);
  rect(28, 215, 36, 20);
  rect(32, 231, 28, 8);
  rect(36, 235, 20, 8);
  fill(255, 150, 30);
  rect(38, 209, 16, 4);
  rect(34, 213, 24, 4);
  rect(30, 217, 32, 16);
  rect(34, 233, 24, 4);
  rect(38, 237, 16, 4);
  fill(255, 230, 150); // glansje
  rect(38, 217, 4, 4);
  // balk
  fill(225, 215, 205);
  rect(92, 202, 316, 46, 6);
  fill(0);
  rect(97, 207, 306, 36, 3);
  fill(60);
  rect(100, 210, 300, 30);
  fill(80, 150, 220);
  rect(100, 210, stats.hunger * 3, 30);
  fill(140, 210, 255);
  rect(100, 213, stats.hunger * 3, 5);
  fill(40, 110, 180);
  rect(100, 235, stats.hunger * 3, 5);

  stroke(0); // randen weer aanzetten voor de rest van de game
  pop();
}

function mousePressed() { // dist betekent the punten tussen de waardes? dus je hebt x, en dan heb je y,
  let gameMouseX = mouseX / gameScale;
  let gameMouseY = mouseY / gameScale;

  if (dist(gameMouseX, gameMouseY, stickX, stickY) < 55) {
    draggingStick = true;
    return;// gaat weer terug naar het begin van de code 
  }

  if (dist(gameMouseX, gameMouseY, petX, petY) < petSize / 2) {
    draggingPet = true;
  }
}

function mouseDragged() {
  let gameMouseX = mouseX / gameScale;
  let gameMouseY = mouseY / gameScale;

  // de stick laten meebewegen
  if (draggingStick == true) {
    stickX = gameMouseX;
    stickY = gameMouseY;
  }

  if (draggingPet == true) { // hier heb ik constrain gebruikt constrain is eigenlijk het controleerd of je waarde niet te hoog is voor de maximaal dus je hebt 6700, 0, 100 6700 is te hoog dus hij pakt de 100
    // ik gebruikt de constrain ook voor mijn slap rect tool dus als hij dicht bij is bij een object dat hij het uitvoerd in de canvas
    petX = constrain(gameMouseX, petSize / 2, gameWorldWidth - petSize / 2);
    petY = constrain(gameMouseY, petSize / 2, 800 - petSize / 2); // de constrain controleerd of
    // mijn muis dicht bij is bij mijn pet zo ja dan kan ik de pet draggen

    // Eten opeten (alleen als je de pet sleept)
    for (let index = 0; index < foods.length; index++) {
      let food = foods[index];
      if (food && dist(petX, petY, food.x, food.y) < petSize / 2 + 35) {
        foods[index] = null;
        stats.hunger += 20;
        stats.happiness += 5;
        stats.health += 20;
      }
    }
    // Drinken (alleen als je de pet sleept)
    for (let index = 0; index < drinks.length; index++) {
      let drink = drinks[index];
      if (drink && dist(petX, petY, drink.x, drink.y) < petSize / 2 + 25) {
        drinks[index] = null;
        stats.energy += 20;
        stats.happiness += 5;
      }
    }

    if (isPetNearTV()) {
      playVideoOnTV();
    }
  }
}

function mouseReleased() {
  draggingPet = false;

  // de stick loslaten
  draggingStick = false;
}

function getTVPosition() {
  let tvX = (gameWorldWidth - TV_WIDTH) / 2;
  if (tvX < 0) {
    tvX = 0;
  }

  return {
    x: tvX,
    y: 0
  };
}

function getTVScreenBounds() {
  let tvPosition = getTVPosition();

  return {
    x: tvPosition.x + (TV_SCREEN_CROP.x - TV_IMAGE_CROP.x) * TV_WIDTH / TV_IMAGE_CROP.width,
    y: tvPosition.y + (TV_SCREEN_CROP.y - TV_IMAGE_CROP.y) * TV_HEIGHT / TV_IMAGE_CROP.height,
    width: TV_SCREEN_CROP.width * TV_WIDTH / TV_IMAGE_CROP.width,
    height: TV_SCREEN_CROP.height * TV_HEIGHT / TV_IMAGE_CROP.height
  };
}

function isPetNearTV() {
  if (!tvVisible) {
    return false;
  }

  let screen = getTVScreenBounds();
  let screenCenterX = screen.x + screen.width / 2;
  let screenCenterY = screen.y + screen.height / 2;
  return dist(petX, petY, screenCenterX, screenCenterY) < petSize / 2 + 70;
}

function spawnTVAndBoostHappiness() {
  stats.happiness = constrain(stats.happiness + 20, 0, 100);

  if (!tvVisible) {
    tvVisible = true;
    petWasNearTV = false;
  }

  if (isPetNearTV()) {
    playVideoOnTV();
  }
}

function playVideoOnTV() {
  if (videoPlayingOnTV) {
    return;
  }

  if (tvVideo.elt.readyState >= 1) {
    tvVideo.elt.currentTime = 0;
  }

  videoPlayingOnTV = true;
  petWasNearTV = isPetNearTV();
  setGameControlsVisible(false);
  tvMusic.stop();
  tvMusic.play();
  tvVideo.elt.play();
}

function setGameControlsVisible(visible) {
  if (visible) {
    Food.show();
    Drink.show();
    Sleep.show();
    happinessButton.show();
  } else {
    Food.hide();
    Drink.hide();
    Sleep.hide();
    happinessButton.hide();
  }
}

function FoodSpawn() {
  foods.push({
    x: random(30, gameWorldWidth - 30),
    y: random(280, 800 - 30)
  });
}

function DrinkSpawn() {
  drinks.push({
    x: random(30, gameWorldWidth - 30),
    y: random(280, 800 - 30)
  });
}

function sleepPet() {
  bedVisible = !bedVisible;
  if (!bedVisible) {
    petSleeping = false;
  }
}
