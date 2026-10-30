// varbs stats   /// Hanad was here
let stats = {
  health: 100,
  energy: 20,
  happiness: 50,
  thirst: 100,
  studeren: 0
};
// Bewaar de plek en grootte van het huisdier.
let petX = 400;
let petY = 500;
let petSize = 200;
let draggingPet = false;

// Bewaart de plaatjes en het geluid van de game.
let imgMonster
let roomBackgrounds = [];
let currentRoomIndex = 0;
let imgSword
let imgBed
let imgPizza
let imgTV
let imgBook
let imgPet
let imgFoodIcon
let tvVideo
let tvMusic
let Timer
let counter

// Bewaart de maten van de tv en het deel dat zichtbaar is.
let TV_IMAGE_CROP = { x: 252, y: 205, width: 150, height: 285 };
let TV_WIDTH = 220;
let TV_HEIGHT = 418;
let TV_SCREEN_CROP = { x: 273, y: 227, width: 109, height: 88 };
let happinessButton;
let nextRoomButton;
let saveButton;
let loadButton;
// Bewaar of de tv aan staat en of het huisdier dichtbij was.
let tvVisible = false;
let videoPlayingOnTV = false;
let petWasNearTV = false;

// Laadt alle plaatjes en het geluid voor de game begint.
function preload() {
  imgMonster = loadImage('Monster.png'); // Laad het plaatje van het drankje.
  roomBackgrounds = [
    loadImage('Living room.png'),
    loadImage('kitchen room.png'),
    loadImage('sleep room.png'),
  ];
  imgSword = loadImage('minecraf diamond longSword p5.png'); // Laad het zwaard.
  imgBed = loadImage('Bed.png'); // Laad het bed.
  imgPizza = loadImage('pizza.png'); // Laad het eten.
  imgTV = loadImage('minecraft TV.png'); // Laad de tv.
  imgPet = loadImage('Biemo .png'); // Laad het huisdier.
  imgFoodIcon = loadImage('FoodHungry.png'); // Laad het pizza-icoon.
  // Laad de muziek voor de video.
  imgBook = loadImage("Book.png");
  tvMusic = loadSound('Mordecai Vs Rigby! audio.mp3'); // Laad de muziek.
}

// Bewaart de plekken van het eten de drankjes en de boeken.
let foods = [];
let drinks = [];
let books = [];
// Bewaar de namen van de waarden van het huisdier.
let statNames = ["health", "energy", "happiness", "thirst", "studeren"];

// Bewaart de knoppen van de game.
let Food;
let Drink;
let Sleep;

// Bewaar de plekken en standen van het zwaard het bed en het canvas.
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
let petDead = false;
let deathCause = null;

function setup() {
  // Maakt het speelveld zo groot als het venster.
  gameCanvas = createCanvas(windowWidth, windowHeight);

  // Haalt de randen en schuifbalken van de pagina weg.
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  gameCanvas.style("display", "block");

  // Maakt de video klaar en verberg het losse videobeeld.
  tvVideo = createVideo('RegularShow.mp4');
  tvVideo.hide();
  tvVideo.elt.playsInline = true; // Speel de video in het canvas af.
  tvVideo.elt.muted = true; // Zet het geluid van de video uit.
  // Toon de knoppen weer als de video klaar is.
  tvVideo.elt.onended = function () {
    videoPlayingOnTV = false;
    tvMusic.stop();
    setGameControlsVisible(true);
  };
  // Toon de knoppen weer en meld een fout als de video niet werkt.
  tvVideo.elt.onerror = function () {
    videoPlayingOnTV = false;
    tvMusic.stop();
    setGameControlsVisible(true);
    console.error("De video kon niet worden afgespeeld:", tvVideo.elt.error); // Toon de fout in de console.
  };
  // Maak de knop voor nieuw eten.
  Food = createButton("FoodSpawn");
  Food.style("background-color", "orange"); // Geef de knop een oranje kleur.
  Food.mousePressed(FoodSpawn); // Maak eten als je klikt.

  // Maak de knop voor een nieuw drankje.
  Drink = createButton("Drinken");
  Drink.style("background-color", "#20c2ef"); // Geef de knop een blauwe kleur.
  Drink.mousePressed(DrinkSpawn); // Maak een drankje als je klikt.

  // Maak de knop voor het bed.
  Sleep = createButton("Slapen");
  Sleep.style("background-color", "#2ef55c"); // Geef de knop een groene kleur.
  Sleep.mousePressed(sleepPet); // Zet het bed aan of uit.

  // Maak de knop voor de tv.
  happinessButton = createButton("Happiness");
  happinessButton.style("background-color", "#e7f432"); // Geef de knop een gele kleur.
  happinessButton.mousePressed(spawnTVAndBoostHappiness); // Toon de tv en geef meer blijdschap.

  // Maak de knop voor een nieuw boek.
  studeren = createButton("studeren");
  studeren.style("background-color", " #00ffb1"); // Geef de knop een groene kleur.
  studeren.mousePressed(BookSpawn); // Maak een boek als je klikt.

  // Maak een knop om van kamer te wisselen.
  nextRoomButton = createButton("Click for next room");
  nextRoomButton.mousePressed(nextRoom);
  nextRoomButton.style("background-color", " rgb(50, 238, 47)")

  saveButton = createButton("Opslaan");
  saveButton.style("background-color", " rgb(244, 186, 39)")
  saveButton.mousePressed(saveGame);

  loadButton = createButton("Laden");
  loadButton.style("background-color", " rgb(120, 47, 238)")
  loadButton.mousePressed(loadGame);

  // Pas de grootte en plekken aan voor het venster.
  fitCanvasToWindow();
  loadGame();
}

// Pas het speelveld aan als het venster verandert.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  fitCanvasToWindow();
}

// Pas de grootte van de game en de plek van de knoppen aan.
function fitCanvasToWindow() {
  // Pas de game aan de hoogte van het venster aan.
  let previousWorldWidth = gameWorldWidth;
  gameScale = height / 800; // Maak de game hoger of lager.
  gameWorldWidth = width / gameScale; // Bereken de breedte van de game.
  petX += (gameWorldWidth - previousWorldWidth) / 2; // Houd het huisdier in het midden.
  bedX = constrain(650, petSize / 2, gameWorldWidth - petSize / 2); // Houd het bed in beeld.

  // Zet de knoppen bovenaan en pas hun tekst aan de grootte van het venster aan.
  Food.position(width - 250 * gameScale, 20 * gameScale);
  Food.style("font-size", 25 * gameScale + "px");
  Drink.position(width - 500 * gameScale, 20 * gameScale);
  Drink.style("font-size", 25 * gameScale + "px");
  Sleep.position(width - 350 * gameScale, 20 * gameScale);
  Sleep.style("font-size", 25 * gameScale + "px");
  happinessButton.position(width - 650 * gameScale, 20 * gameScale);
  happinessButton.style("font-size", 25 * gameScale + "px");
  studeren.position(width - 780 * gameScale, 20 * gameScale);
  studeren.style("font-size", 25 * gameScale + "px");
  nextRoomButton.position(20 * gameScale, height - 55 * gameScale);
  nextRoomButton.style("font-size", 18 * gameScale + "px");
  saveButton.position(20 * gameScale, height - 95 * gameScale);
  saveButton.style("font-size", 18 * gameScale + "px");
  loadButton.position(120 * gameScale, height - 95 * gameScale);
  loadButton.style("font-size", 18 * gameScale + "px");
}

// tekend de video of de game op het scherm.
function draw() {
  if (!petDead && videoPlayingOnTV) {
    // Geef langzaam meer blijdschap zolang de video speelt.
    stats.happiness = constrain(stats.happiness + 0.05, 0, 100);
    // Maak het scherm zwart achter de video.
    background(0);
    if (tvVideo.elt.readyState >= 2) {
      // Bereken een passende grootte voor de video.
      let videoAspect = tvVideo.elt.videoWidth / tvVideo.elt.videoHeight; // Bereken de vorm van de video.
      let canvasAspect = width / height; // Bereken de vorm van het scherm.
      let videoWidth = width;
      let videoHeight = height;

      // Maak de video passend zonder hem uit te rekken.
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
    push(); // Bewaar de huidige tekeninstellingen.
    scale(gameScale); // Maak de meter passend bij de game.
    drawStatusBars(true); // tekend alleen de meter voor blijdschap.
    pop(); // Herstel de tekeninstellingen.
    return;
  }

  // tekend de achtergrond van de game.
  background(220);
  image(roomBackgrounds[currentRoomIndex], 0, 0, width, height);

  push(); // Bewaar de huidige tekeninstellingen.
  scale(gameScale);

  if (tvVisible) {
    // tekend de tv als die aan staat.
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

    let petNearTV = isPetNearTV(); // Controleer of het huisdier dichtbij is.
    if (!petDead && petNearTV && !petWasNearTV) {
      playVideoOnTV(); // Start de video als het huisdier dichterbij komt.
    }
    petWasNearTV = petNearTV; // Bewaar of het huisdier dichtbij was.
  }

  if (!petDead) {
    // Laat de dorst en energie langzaam dalen.
    stats.thirst -= 0.05;
    stats.energy -= 0.01;

    // Verlaag de andere waarden als het huisdier dorst heeft.
    if (stats.thirst <= 0) {
      damagePet(0.05, "thirst");
      stats.happiness -= 0.05;
      stats.energy -= 0.05;
    }
  }

  // Kijk of het huisdier bij het zichtbare bed is.
  petSleeping = bedVisible && dist(petX, petY, bedX, bedY) < 90; // Meet de afstand tot het bed.
  if (petSleeping && !petDead) {
    stats.energy += 0.2;
  }

  // Houd alle waarden tussen nul en honderd.
  for (let statIndex = 0; statIndex < statNames.length; statIndex++) {
    let statName = statNames[statIndex];
    stats[statName] = constrain(stats[statName], 0, 100);
  }

  // tekend het huisdier op zijn plek.
  image(imgPet, petX - petSize / 2, petY - petSize / 2, petSize, petSize);

  if (bedVisible) {
    // tekend het bed als het aan staat.
    image(imgBed, bedX - 100, bedY - 70, 200, 140);
  }

  // tekend de naam van het huisdier boven zijn kop.
  textSize(30); // Maak de letters groot.
  fill('cyan'); // Maak de naam lichtblauw.
  text("JackyJones", petX - 75, petY + -70); // Zet de naam op het scherm.

  if (petSleeping) {
    // Toon een bericht als het huisdier slaapt.
    textSize(20);
    fill("white");
    text("Slaapt? =  energie herstelt", bedX - 105, bedY + 95);
  }

  // Loop door het eten en tekend elk stuk dat er nog is.
  for (let foodIndex = 0; foodIndex < foods.length; foodIndex++) {
    let food = foods[foodIndex];
    if (food) {
      image(imgPizza, food.x - 32, food.y - 32, 64, 64);
    }
  }
  // Loop door de drankjes en tekend elk drankje dat er nog is.
  for (let drinkIndex = 0; drinkIndex < drinks.length; drinkIndex++) {
    let drink = drinks[drinkIndex];
    if (drink) {
      image(imgMonster, drink.x - 22, drink.y - 35, 44, 70);
    }
  }

  // tekend het zwaard op zijn plek.
  image(imgSword, stickX - 50, stickY - 50, 100, 100);

  // Behoud het pizza-icoon naast de meters.
  image(imgFoodIcon, 20, 135, 50, 50);

  // Laat de wachttijd na een raak moment zakken.
  if (hitTimer > 0 && !petDead) {
    hitTimer = hitTimer - 1;
  }
  // Geef schade als het zwaard het huisdier raakt.
  if (!petDead && draggingStick == true && dist(stickX, stickY, petX, petY) < petSize / 2 && hitTimer == 0) {
    damagePet(10, "sword");
    hitTimer = 30; // Wacht even voor de volgende schade.
  }

  // tekend alle plaatjes en meters met de waarden van het huisdier.
  drawStatusBars(false);
  if (petDead) {
    textAlign(CENTER, CENTER);
    textSize(30);
    fill("red");
    let causeText = deathCause === "sword" ? "Diamond Long Sword" : "dorst";
    text("JackyJones is dood door " + causeText, gameWorldWidth / 2, 80);
  }

  stroke(0); // Zet de lijnen weer aan.
  pop();
}

function damagePet(amount, cause) {
  if (petDead) {
    return;
  }

  stats.health = max(0, stats.health - amount);
  if (stats.health === 0) {
    petDead = true;
    deathCause = cause;
  }
}

// tekend de plaatjes en meters voor de waarden van het huisdier.
// Toon alleen de meter voor blijdschap tijdens de video.
function drawStatusBars(happinessOnly) {
  noStroke(); // tekend zonder lijnen.

  if (!happinessOnly) { // tekend de plaatjes alleen tijdens de game.
    // tekend de zwarte rand van het hart.
    fill(0);
    for (let row = 0; row < 6; row++) { // tekend elke rij van het hart.
      for (let column = 0; column < 9; column++) { // tekend elk vakje in de rij.
        let heartCell =
          (row === 0 && ((column >= 1 && column <= 3) || (column >= 5 && column <= 7))) ||
          ((row === 1 || row === 2) && column >= 0 && column <= 8) ||
          (row === 3 && column >= 1 && column <= 7) ||
          (row === 4 && column >= 2 && column <= 6) ||
          (row === 5 && column >= 3 && column <= 5);
        if (heartCell) {
          rect(28 + column * 4, 31 + row * 4, 4, 4);
        }
      }
    }

    // tekend het rode deel van het hart.
    fill(220, 60, 40);
    for (let row = 0; row < 6; row++) { // tekend elke rij van het hart.
      for (let column = 0; column < 8; column++) { // tekend elk vakje in de rij.
        let redHeartCell =
          (row === 0 && (column === 1 || column === 2 || column === 5 || column === 6)) ||
          ((row === 1 || row === 2) && column >= 0 && column <= 7) ||
          (row === 3 && column >= 1 && column <= 6) ||
          (row === 4 && column >= 2 && column <= 5) ||
          (row === 5 && column >= 3 && column <= 4);
        if (redHeartCell) {
          rect(30 + column * 4, 33 + row * 4, 4, 4);
        }
      }
    }

    // tekend de zwarte rand van de bliksem.
    fill(0);
    for (let row = 0; row < 7; row++) { // tekend elke rij van de bliksem.
      let startX;
      let blocks;
      if (row === 0) { startX = 44; blocks = 4; }
      else if (row === 1) { startX = 40; blocks = 4; }
      else if (row === 2) { startX = 36; blocks = 6; }
      else if (row === 3) { startX = 40; blocks = 4; }
      else if (row === 4) { startX = 36; blocks = 4; }
      else if (row === 5) { startX = 36; blocks = 3; }
      else { startX = 32; blocks = 3; }
      for (let column = 0; column < blocks; column++) {
        rect(startX + column * 4, 89 + row * 4, 4, 4);
      }
    }

    // tekend het groene deel van de bliksem.
    fill(130, 200, 50);
    for (let row = 0; row < 7; row++) {
      let startX;
      let blocks;
      if (row === 0) { startX = 46; blocks = 3; }
      else if (row === 1) { startX = 42; blocks = 3; }
      else if (row === 2) { startX = 38; blocks = 5; }
      else if (row === 3) { startX = 42; blocks = 3; }
      else if (row === 4) { startX = 38; blocks = 3; }
      else if (row === 5) { startX = 38; blocks = 2; }
      else { startX = 34; blocks = 2; }
      for (let column = 0; column < blocks; column++) {
        rect(startX + column * 4, 91 + row * 4, 4, 4);
      }
    }

  }

  // Kies welke meters op het scherm komen.
  let firstBar = 0;
  let lastBar = 5;
  if (happinessOnly) { // Toon tijdens de video alleen blijdschap.
    firstBar = 2;
    lastBar = 3;
  }

  for (let bar = firstBar; bar < lastBar; bar++) { // tekend elke gekozen meter.
    let y = 22 + bar * 60; // Zet elke meter lager dan de vorige.
    let value;
    if (bar === 4) {
      image(imgBook, 35, y - 2, 50, 50);
    } else if (bar === 3) {
      image(imgMonster, 35, y - 2, 50, 50);
    }

    // tekend de rand en het lege deel van de meter.
    fill(225, 215, 205); // tekend de lichte rand.
    rect(92, y, 316, 46, 6);
    fill(0); // tekend de donkere rand.
    rect(97, y + 5, 306, 36, 3);
    fill(60); // tekend het lege deel van de meter.
    rect(100, y + 8, 300, 30);

    // Kies de waarde en kleur van deze meter.
    if (bar === 0) {
      value = stats.health;
      fill(200, 50, 40); // Gebruik rood voor gezondheid.
    } else if (bar === 1) {
      value = stats.energy;
      fill(130, 200, 50); // Gebruik groen voor energie.
    } else if (bar === 2) {
      value = stats.happiness;
      fill(255, 200, 40); // Gebruik geel voor blijdschap.
    } else if (bar === 3) {
      value = stats.thirst;
      fill(80, 150, 220); // Gebruik blauw voor drinken.
    } else {
      value = stats.studeren;
      fill(170, 100, 220); // Gebruik paars voor studeren.
    }
    rect(100, y + 8, value * 3, 30); // Laat zien hoeveel van de waarde over is.

    // tekend lichte en donkere strepen op de meter.
    if (bar === 0) {
      fill(255, 110, 100);
      rect(100, y + 11, value * 3, 5);
      fill(160, 10, 0);
    } else if (bar === 1) {
      fill(190, 255, 110);
      rect(100, y + 11, value * 3, 5);
      fill(90, 160, 10);
    } else if (bar === 2) {
      fill(255, 255, 100);
      rect(100, y + 11, value * 3, 5);
      fill(215, 160, 0);
    } else if (bar === 3) {
      fill(140, 210, 255);
      rect(100, y + 11, value * 3, 5);
      fill(40, 110, 180);
    } else {
      fill(210, 160, 255);
      rect(100, y + 11, value * 3, 5);
      fill(100, 50, 150);
    }
    rect(100, y + 33, value * 3, 5); // tekend een donkere streep.
  }
}

// Kijk wat de speler met de muis aanklikt.
function mousePressed() {
  // Zet de muisplek om naar de plek in de game.
  let gameMouseX = mouseX / gameScale;
  let gameMouseY = mouseY / gameScale;

  if (dist(gameMouseX, gameMouseY, stickX, stickY) < 55) {
    draggingStick = true;
    return; // Stop zodat dezelfde klik niet ook het huisdier pakt.
  }

  if (dist(gameMouseX, gameMouseY, petX, petY) < petSize / 2) {
    draggingPet = true;
  }
}

// Verplaats een voorwerp terwijl de speler het sleept.
function mouseDragged() {
  // Zet de muisplek om naar de plek in de game.
  let gameMouseX = mouseX / gameScale;
  let gameMouseY = mouseY / gameScale;

  // Laat het zwaard de muis volgen.
  if (draggingStick == true) {
    stickX = gameMouseX;
    stickY = gameMouseY;
  }

  if (draggingPet == true) {
    // Houd het huisdier binnen de game.
    petX = constrain(gameMouseX, petSize / 2, gameWorldWidth - petSize / 2);
    petY = constrain(gameMouseY, petSize / 2, 800 - petSize / 2);

    // Kijken of het huisdier dicht bij eten komt.
    for (let index = 0; index < foods.length; index++) {
      let food = foods[index];
      if (food && dist(petX - 50, petY - 50, food.x, food.y) < petSize / 2 + 35) {
        foods[index] = null;
        stats.happiness += 5;
        stats.health += 20;
      }
    }
    // Kijken of het huisdier dicht bij een drankje komt.
    for (let index = 0; index < drinks.length; index++) {
      let drink = drinks[index];
      if (drink && dist(petX, petY, drink.x, drink.y) < petSize / 2 + 25) {
        drinks[index] = null;
        stats.thirst = constrain(stats.thirst + 20, 0, 100);
        stats.energy += 20;
        stats.happiness += 5;
      }
    }

    if (isPetNearTV()) {
      playVideoOnTV();
    }
  }
}

// Stopen met slepen als de speler de muisknop loslaat.
function mouseReleased() {
  draggingPet = false;

  draggingStick = false;
}

// Bereken de plek van de tv in het midden van de game.
function getTVPosition() {
  let tvX = (gameWorldWidth - TV_WIDTH) / 2;
  // Zet de tv aan de linkerkant als de game te smal is.
  if (tvX < 0) {
    tvX = 0;
  }

  return {
    x: tvX,
    y: 0
  };
}

// Bereken de plek van het scherm in de tv.
function getTVScreenBounds() {
  let tvPosition = getTVPosition();

  return {
    x: tvPosition.x + (TV_SCREEN_CROP.x - TV_IMAGE_CROP.x) * TV_WIDTH / TV_IMAGE_CROP.width,
    y: tvPosition.y + (TV_SCREEN_CROP.y - TV_IMAGE_CROP.y) * TV_HEIGHT / TV_IMAGE_CROP.height,
    width: TV_SCREEN_CROP.width * TV_WIDTH / TV_IMAGE_CROP.width,
    height: TV_SCREEN_CROP.height * TV_HEIGHT / TV_IMAGE_CROP.height
  };
}

// Kijk of het huisdier dicht bij het tv scherm is.
function isPetNearTV() {
  if (!tvVisible) {
    return false;
  }

  let screen = getTVScreenBounds();
  let screenCenterX = screen.x + screen.width / 2;
  let screenCenterY = screen.y + screen.height / 2;
  return dist(petX, petY, screenCenterX, screenCenterY) < petSize / 2 + 70;
}

// Toon de tv en geef het huisdier meer blijdschap.
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

// Start de video en muziek en zet blijdschap op nul.
function playVideoOnTV() {
  if (videoPlayingOnTV) {
    return;
  }

  stats.happiness = 0; // Zet blijdschap op nul bij de start.

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

// Toon de knoppen of verberg ze tijdens de video.
function setGameControlsVisible(visible) {
  if (visible) {
    Food.show();
    Drink.show();
    Sleep.show();
    studeren.show();
    happinessButton.show();
    nextRoomButton.show();
    saveButton.show();
    loadButton.show();
  } else {
    Food.hide();
    Drink.hide();
    Sleep.hide();
    studeren.hide()
    happinessButton.hide();
    nextRoomButton.hide();
    saveButton.hide();
    loadButton.hide();
  }
}

function saveGame() {
  storeItem("virtualPetSave", {
    stats: stats,
    petX: petX,
    petY: petY,
    stickX: stickX,
    stickY: stickY,
    foods: foods,
    drinks: drinks,
    books: books,
    currentRoomIndex: currentRoomIndex,
    bedVisible: bedVisible,
    tvVisible: tvVisible,
    petDead: petDead,
    deathCause: deathCause
  });
}

function loadGame() {
  let savedGame = getItem("virtualPetSave");
  if (savedGame) {
    stats = savedGame.stats;
    if (typeof stats.thirst !== "number") {
      stats.thirst = typeof stats.hunger === "number" ? stats.hunger : 100;
    }
    delete stats.hunger;
    petX = savedGame.petX;
    petY = savedGame.petY;
    stickX = savedGame.stickX;
    stickY = savedGame.stickY;
    foods = savedGame.foods;
    drinks = savedGame.drinks;
    books = savedGame.books;
    currentRoomIndex = savedGame.currentRoomIndex;
    bedVisible = savedGame.bedVisible;
    tvVisible = savedGame.tvVisible;
    petDead = savedGame.petDead === true || stats.health <= 0;
    deathCause = savedGame.deathCause === "hunger"
      ? "thirst"
      : savedGame.deathCause || (petDead ? "thirst" : null);
  }
}

// Wissel naar de volgende kamerachtergrond.
function nextRoom() {
  currentRoomIndex = (currentRoomIndex + 1) % roomBackgrounds.length;
}

// Zet nieuw eten op een willekeurige plek in de game.
function FoodSpawn() {
  foods.push({
    x: random(30, gameWorldWidth - 30),
    y: random(280, 800 - 30)
  });
}

// Zet een nieuw drankje op een willekeurige plek in de game.
function DrinkSpawn() {
  drinks.push({
    x: random(30, gameWorldWidth - 30),
    y: random(280, 800 - 30)
  });
}

// Zet een nieuw boek op een willekeurige plek in de game.
function BookSpawn() {
  stats.studeren = constrain(stats.studeren + 10, 0, 100);
  books.push({
    x: random(30, gameWorldWidth - 30),
    y: random(280, 800 - 30)
  });
}
// Zet het bed aan of uit.
function sleepPet() {
  bedVisible = !bedVisible;
  if (!bedVisible) {
    // Laat het huisdier stoppen met slapen als het bed uitgaat.
    petSleeping = false;
  }
}
