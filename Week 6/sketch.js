// Bewaar de vier behoeften van het huisdier als getallen van 0 tot 100.
let stats = {
  health: 100,
  energy: 100,
  happiness: 100,
  hunger: 100
};
// Bewaar de positie en grootte van het huisdier in de spelwereld.
let petX = 400;
let petY = 500;
let petSize = 450;
let draggingPet = false;

// Variabelen voor de afbeeldingen video en muziek.
let imgMonster
let imgBackground
let imgSword
let imgBed
let imgPizza
let imgTV
let tvVideo
let tvMusic

// Uitsnedes en afmetingen om alleen het scherm uit de tv-afbeelding te tekenen.
let TV_IMAGE_CROP = { x: 252, y: 205, width: 150, height: 285 };
let TV_WIDTH = 220;
let TV_HEIGHT = 418;
let TV_SCREEN_CROP = { x: 273, y: 227, width: 109, height: 88 };
let happinessButton;
// Onthoud of de tv zichtbaar is en of de video al speelt.
let tvVisible = false;
let videoPlayingOnTV = false;
let petWasNearTV = false;

// Laad afbeeldingen en geluid voordat de game begint.
function preload() {
  imgMonster = loadImage('Monster.png'); // Laad het blikje dat bij drinken wordt getekend.
  imgBackground = loadImage('Background.png'); // Laad de achtergrond van de game.
  imgSword = loadImage('minecraf diamond longSword p5.png'); // Laad het zwaard dat de speler kan slepen.
  imgBed = loadImage('Bed.png'); // Laad de afbeelding van het bed.
  imgPizza = loadImage('pizza.png'); // Laad de afbeelding van eten.
  imgTV = loadImage('minecraft TV.png');
  // Laad de muziek die samen met de tv video afspeelt.
  tvMusic = loadSound('2.06_-_Kaleo_-_Way_Down_We_Go_OST_Lucifer_(mp3.pm).mp3');
}

// Lijsten voor eten en drinken; statNames helpt alle behoeften in een lus te begrenzen.
let foods = [];
let drinks = [];
let statNames = ["health", "energy", "happiness", "hunger"];

// Variabelen voor de knoppen en slaapfunctie.
let Food;
let Drink;
let Sleep;

// Posities en toestanden voor het zwaard, canvas, bed en slapen.
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

// Maak het canvas, de video en de knoppen aan.
function setup() {
  gameCanvas = createCanvas(windowWidth, windowHeight);

  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  gameCanvas.style("display", "block");

  // Maak een verborgen video-element dat later op het canvas wordt getekend.
  tvVideo = createVideo('11.1 — Timeline export of 10.1.mp4');
  tvVideo.hide();
  tvVideo.elt.playsInline = true; // Speel de video in het canvas af.
  tvVideo.elt.muted = true; // Zet het geluid van de video uit; de muziek speelt apart.
  // Herstel de knoppen en stop de muziek als de video klaar is.
  tvVideo.elt.onended = function () {
    videoPlayingOnTV = false;
    tvMusic.stop();
    setGameControlsVisible(true);
  };
  // Herstel de game en meld een fout als de video niet kan afspelen.
  tvVideo.elt.onerror = function () {
    videoPlayingOnTV = false;
    tvMusic.stop();
    setGameControlsVisible(true);
    console.error("De video kon niet worden afgespeeld:", tvVideo.elt.error);
  };

  // Maak de knoppen en koppel elke knop aan de functie die erbij hoort.
  Food = createButton("FoodSpawn");
  Food.style("background-color", "orange"); // Geef de knop een kleur.
  Food.mousePressed(FoodSpawn); // Roep FoodSpawn aan bij een klik.

  Drink = createButton("Drinken");
  Drink.style("background-color", "lightblue");
  Drink.mousePressed(DrinkSpawn); // Roep DrinkSpawn aan bij een klik.

  Sleep = createButton("Slapen");
  Sleep.style("background-color", "lightgreen");
  Sleep.mousePressed(sleepPet); // Zet het bed aan of uit bij een klik.

  happinessButton = createButton("Happiness");
  happinessButton.style("background-color", "pink");
  happinessButton.mousePressed(spawnTVAndBoostHappiness); // Toon de tv en verhoog happiness.

  fitCanvasToWindow();
}

// Pas het canvas en de knopposities aan als het venster verandert.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  fitCanvasToWindow();
}

// Schaal de spelwereld naar de hoogte van het venster en zet de knoppen rechtsboven.
function fitCanvasToWindow() {
  // Schaal de vaste spelhoogte naar het venster en bereken de breedte van de wereld.
  let previousWorldWidth = gameWorldWidth;
  gameScale = height / 800; // Houd de spelwereld 800 eenheden hoog.
  gameWorldWidth = width / gameScale; // Reken de vensterbreedte om naar spelcoordinaten.
  petX += (gameWorldWidth - previousWorldWidth) / 2; // Houd het huisdier ongeveer in het midden.
  bedX = constrain(650, petSize / 2, gameWorldWidth - petSize / 2); // Houd het bed binnen de wereld.

  // Zet de knoppen rechtsboven en schaal hun tekst mee met het venster.
  Food.position(width - 250 * gameScale, 20 * gameScale);
  Food.style("font-size", 25 * gameScale + "px");
  Drink.position(width - 500 * gameScale, 20 * gameScale);
  Drink.style("font-size", 25 * gameScale + "px");
  Sleep.position(width - 400 * gameScale, 20 * gameScale);
  Sleep.style("font-size", 25 * gameScale + "px");
  happinessButton.position(width - 650 * gameScale, 20 * gameScale);
  happinessButton.style("font-size", 25 * gameScale + "px");
}

// Teken elke frame de video of de normale game.
function draw() {
  if (videoPlayingOnTV) {
    stats.happiness = constrain(stats.happiness + 0.05, 0, 100); // Happiness gaat langzaam omhoog tot maximaal 100.
    background(0);
    if (tvVideo.elt.readyState >= 2) {
      // Bereken verhoudingen zodat de video past zonder uit te rekken.
      let videoAspect = tvVideo.elt.videoWidth / tvVideo.elt.videoHeight; // Verhouding van de video.
      let canvasAspect = width / height; // Verhouding van het canvas.
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
    push(); // Bewaar de tekeninstellingen voordat de meter wordt getekend.
    scale(gameScale); // Maak de meter even groot als in de game.
    drawStatusBars(true); // Teken alleen de happiness-meter linksboven over de video.
    pop(); // Zet de tekeninstellingen terug.
    return;
  }

  background(220);
  image(imgBackground, 0, 0, width, height);

  push(); // Bewaar de tekeninstellingen voordat de spelwereld wordt geschaald.
  scale(gameScale);

  if (tvVisible) {
    // Teken de tv en start de video wanneer het huisdier er dichtbij komt.
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

    let petNearTV = isPetNearTV(); // Controleer of het huisdier bij de tv staat.
    if (petNearTV && !petWasNearTV) {
      playVideoOnTV(); // Start alleen bij het naderen, niet elke frame opnieuw.
    }
    petWasNearTV = petNearTV; // Onthoud de afstand voor de volgende frame.
  }

  // Laat honger en energie langzaam dalen tijdens het spelen.
  stats.hunger -= 0.05;
  stats.energy -= 0.01;

  // Als honger op is, dalen gezondheid, happiness en energie ook.
  if (stats.hunger <= 0) {
    stats.health -= 0.05;
    stats.happiness -= 0.05;

    stats.energy -= 0.05;
  }

  // Herstel energie wanneer het huisdier dicht bij een zichtbaar bed is.
  petSleeping = bedVisible && dist(petX, petY, bedX, bedY) < 90; // Meet de afstand tot het bed.
  if (petSleeping) {
    stats.energy += 0.2;
  }

  // Houd alle behoeften tussen 0 en 100.
  for (let statIndex = 0; statIndex < statNames.length; statIndex++) {
    let statName = statNames[statIndex];
    stats[statName] = constrain(stats[statName], 0, 100);
  }

  // Teken het huisdier als een blauwe cirkel.
  fill("Cyan"); // Kies de kleur van het huisdier.
  circle(petX, petY, petSize); // Teken het huisdier op zijn positie.

  if (bedVisible) {
    // Teken het bed alleen als het is aangezet.
    image(imgBed, bedX - 100, bedY - 70, 200, 140);
  }

  // Teken de naam van het huisdier.
  textSize(30); // Stel de lettergrootte van de naam in.
  fill('black'); // Maak de naam zwart.
  text("HogRiderBOYY999", petX - 140, petY); // Teken de naam naast het huisdier.

  if (petSleeping) {
    // Toon een bericht zolang het huisdier slaapt.
    textSize(20);
    fill("white");
    text("Slaapt - energie herstelt", bedX - 105, bedY + 95);
  }

  // Loop door de lijsten en teken elk eten en drankje dat nog bestaat.
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

  // Teken het zwaard op zijn huidige positie.
  image(imgSword, stickX - 50, stickY - 50, 100, 100);

  // Verlaag de timer en geef schade als het zwaard de huisdier raakt.
  if (hitTimer > 0) {
    hitTimer = hitTimer - 1;
  }
  if (draggingStick == true && dist(stickX, stickY, petX, petY) < petSize / 2 && hitTimer == 0) {
    stats.health -= 10;
    hitTimer = 30; // Wacht even voordat een volgende aanraking schade doet.
  }

  drawStatusBars(false); // Teken alle statusiconen en meters met for-lussen.

  stroke(0); // randen weer aanzetten voor de rest van de game
  pop();
}

// Teken de icoontjes en de vier statusbalken.
// happinessOnly is true tijdens de video, zodat alleen happiness zichtbaar blijft.
function drawStatusBars(happinessOnly) {
  noStroke(); // Teken de meters zonder extra randen.

  if (!happinessOnly) { // Teken de iconen alleen in het gewone gamebeeld.
    // Teken de zwarte buitenkant van het hart met vakjes per rij.
    fill(0);
    for (let row = 0; row < 6; row++) { // Loop langs de rijen van het hart.
      for (let column = 0; column < 9; column++) { // Loop langs de vakjes per rij.
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

    // Teken de rode binnenkant van het hart over de zwarte buitenkant.
    fill(220, 60, 40);
    for (let row = 0; row < 6; row++) { // Loop langs de rijen in het hart.
      for (let column = 0; column < 8; column++) { // Loop langs de vakjes per rij.
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

    // Teken de zwarte buitenkant van de bliksem.
    fill(0);
    for (let row = 0; row < 7; row++) { // Loop langs de rijen van de bliksem.
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

    // Teken de groene binnenkant van de bliksem met dezelfde aanpak.
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

    // Teken de zwarte buitenkant van het hunger-icoon.
    fill(0);
    for (let row = 0; row < 9; row++) {
      let startX = 28;
      let blocks = 9;
      if (row === 0 || row === 8) { startX = 36; blocks = 5; }
      else if (row === 1 || row === 7) { startX = 32; blocks = 7; }
      for (let column = 0; column < blocks; column++) {
        rect(startX + column * 4, 207 + row * 4, 4, 4);
      }
    }

    // Teken de oranje binnenkant van het hunger-icoon.
    fill(255, 150, 30);
    for (let row = 0; row < 8; row++) {
      let startX;
      let blocks;
      let y;
      if (row === 0) { startX = 38; blocks = 4; y = 209; }
      else if (row === 1) { startX = 34; blocks = 6; y = 213; }
      else if (row <= 5) { startX = 30; blocks = 8; y = 217 + (row - 2) * 4; }
      else if (row === 6) { startX = 34; blocks = 6; y = 233; }
      else { startX = 38; blocks = 4; y = 237; }
      for (let column = 0; column < blocks; column++) {
        rect(startX + column * 4, y, 4, 4);
      }
    }
    fill(255, 230, 150); // Geef het icoon een licht glansje.
    rect(38, 217, 4, 4);
  }

  // Deze for-lus tekent de buitenkant en vulling van alle vier meters.
  let firstBar = 0;
  let lastBar = 4;
  if (happinessOnly) { // Tijdens de video wordt alleen happiness getoond.
    firstBar = 2;
    lastBar = 3;
  }

  for (let bar = firstBar; bar < lastBar; bar++) { // Herhaal de tekenstappen per meter.
    let y = 22 + bar * 60; // Zet elke meter 60 pixels onder de vorige.
    let value;

    fill(225, 215, 205); // Teken de lichte buitenrand.
    rect(92, y, 316, 46, 6);
    fill(0); // Teken de zwarte rand.
    rect(97, y + 5, 306, 36, 3);
    fill(60); // Teken het lege deel van de meter.
    rect(100, y + 8, 300, 30);

    // Koppel elke balk aan de juiste behoefte en kleur.
    if (bar === 0) {
      value = stats.health;
      fill(200, 50, 40); // Kies rood voor health.
    } else if (bar === 1) {
      value = stats.energy;
      fill(130, 200, 50); // Kies groen voor energy.
    } else if (bar === 2) {
      value = stats.happiness;
      fill(255, 200, 40); // Kies geel voor happiness.
    } else {
      value = stats.hunger;
      fill(80, 150, 220); // Kies blauw voor hunger.
    }
    rect(100, y + 8, value * 3, 30); // De gekleurde vulling toont de waarde.

    // Teken de lichte en donkere streepjes passend bij de kleur van de balk.
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
    } else {
      fill(140, 210, 255);
      rect(100, y + 11, value * 3, 5);
      fill(40, 110, 180);
    }
    rect(100, y + 33, value * 3, 5); // Teken de donkere streep onder de vulling.
  }
}

// Reageer op een muisklik en kijk of de speler het zwaard of huisdier aanklikt.
function mousePressed() {
  // Zet de muispositie om van schermcoordinaten naar spelcoordinaten.
  let gameMouseX = mouseX / gameScale;
  let gameMouseY = mouseY / gameScale;

  if (dist(gameMouseX, gameMouseY, stickX, stickY) < 55) {
    draggingStick = true;
    return; // Stop hier zodat dezelfde klik het huisdier niet ook vastpakt.
  }

  if (dist(gameMouseX, gameMouseY, petX, petY) < petSize / 2) {
    draggingPet = true;
  }
}

// Verplaats het vastgehouden voorwerp terwijl de muis beweegt.
function mouseDragged() {
  // Gebruik spelcoordinaten zodat slepen klopt met de schaal van het canvas.
  let gameMouseX = mouseX / gameScale;
  let gameMouseY = mouseY / gameScale;

  // Laat het zwaard de muis volgen zolang het wordt vastgehouden.
  if (draggingStick == true) {
    stickX = gameMouseX;
    stickY = gameMouseY;
  }

  if (draggingPet == true) {
    // Beperk de positie zodat het huisdier binnen de spelwereld blijft.
    petX = constrain(gameMouseX, petSize / 2, gameWorldWidth - petSize / 2);
    petY = constrain(gameMouseY, petSize / 2, 800 - petSize / 2);

    // Eet eten op als het huisdier er dichtbij komt.
    for (let index = 0; index < foods.length; index++) {
      let food = foods[index];
      if (food && dist(petX, petY, food.x, food.y) < petSize / 2 + 35) {
        foods[index] = null;
        stats.hunger += 20;
        stats.happiness += 5;
        stats.health += 20;
      }
    }
    // Drink een drankje op als het huisdier er dichtbij komt.
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

// Stop met slepen zodra de muisknop wordt losgelaten.
function mouseReleased() {
  draggingPet = false;

  draggingStick = false;
}

// Bereken de positie van de tv in het midden van de spelwereld.
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

// Bereken waar het scherm zit binnen de afbeelding van de tv.
function getTVScreenBounds() {
  let tvPosition = getTVPosition();

  return {
    x: tvPosition.x + (TV_SCREEN_CROP.x - TV_IMAGE_CROP.x) * TV_WIDTH / TV_IMAGE_CROP.width,
    y: tvPosition.y + (TV_SCREEN_CROP.y - TV_IMAGE_CROP.y) * TV_HEIGHT / TV_IMAGE_CROP.height,
    width: TV_SCREEN_CROP.width * TV_WIDTH / TV_IMAGE_CROP.width,
    height: TV_SCREEN_CROP.height * TV_HEIGHT / TV_IMAGE_CROP.height
  };
}

// Controleer met afstand of het huisdier dicht genoeg bij het tv-scherm is.
function isPetNearTV() {
  if (!tvVisible) {
    return false;
  }

  let screen = getTVScreenBounds();
  let screenCenterX = screen.x + screen.width / 2;
  let screenCenterY = screen.y + screen.height / 2;
  return dist(petX, petY, screenCenterX, screenCenterY) < petSize / 2 + 70;
}

// Toon de tv en geef happiness wanneer de happiness-knop wordt ingedrukt.
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

// Start de video en muziek en zet happiness op nul aan het begin.
function playVideoOnTV() {
  if (videoPlayingOnTV) {
    return;
  }

  stats.happiness = 0; // Begin met 0 happiness wanneer de video start.

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

// Verberg of toon alle knoppen terwijl de video speelt.
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

// Maak een nieuw eten op een willekeurige plek in de spelwereld.
function FoodSpawn() {
  foods.push({
    x: random(30, gameWorldWidth - 30),
    y: random(280, 800 - 30)
  });
}

// Maak een nieuw drankje op een willekeurige plek in de spelwereld.
function DrinkSpawn() {
  drinks.push({
    x: random(30, gameWorldWidth - 30),
    y: random(280, 800 - 30)
  });
}

// Zet het bed aan of uit; als het uitgaat, stopt de slaapstatus.
function sleepPet() {
  bedVisible = !bedVisible;
  if (!bedVisible) {
    petSleeping = false;
  }
}
