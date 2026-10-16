let health = 100;
let energy = 0;
let happiness = 0;
let hunger = 0;
let petX = 400;
let petY = 500;
let petSize = 450;
let draggingPet = false;

let imgMonster
let imgBackground

///

function preload() {
  imgMonster = loadImage('Monster.png'); // mijn image finn & Jake.
}

// eten -1000 betekent: staat er niet je ziet het niet
let food1X = -1000;
let food1Y = -1000;
let food2X = -1000;
let food2Y = -1000;
let food3X = -1000;
let food3Y = -1000;
let food4X = -1000;
let food4Y = -1000;
let food5X = -1000;
let food5Y = -1000;
let food6X = -1000;
let food6Y = -1000;
let food7X = -1000;
let food7Y = -1000;
let food8X = -1000;
let food8Y = -1000;
let food9X = -1000;
let food9Y = -1000;
let food10X = -1000;
let food10Y = -1000;

let Food;

let stickX = 150;
let stickY = 700;
let draggingStick = false;
let hitTimer = 0;

function setup() {
  createCanvas(800, 800);

  Food = createButton("FoodSpawn");
  Food.position(550, 20);
  Food.style("background-color", "orange");
  Food.style("font-size", "25px");
  Food.mousePressed(FoodSpawn);
}

function draw() {
  background(220);
  
  textSize(30)
  text("HogRiderBOYYY", 50, 500)

  image(imgMonster, 700, 10, 100, 100);


  hunger = hunger - 0.05;
  energy = energy - 0.01;

  if (hunger <= 0) {
    health = health - 0.05;
    happiness = happiness - 0.05;

    energy = energy - 0.05;
  }

  hunger = constrain(hunger, 0, 100);
  energy = constrain(energy, 0, 100);
  health = constrain(health, 0, 100);
  happiness = constrain(happiness, 0, 100);

  // pet
  fill("Cyan");
  circle(petX, petY, petSize);

  // eten tekenen
  fill("orange");
  circle(food1X, food1Y, 30);
  circle(food2X, food2Y, 30);
  circle(food3X, food3Y, 30);
  circle(food4X, food4Y, 30);
  circle(food5X, food5Y, 30);
  circle(food6X, food6Y, 30);
  circle(food7X, food7Y, 30);
  circle(food8X, food8Y, 30);
  circle(food9X, food9Y, 30);
  circle(food10X, food10Y, 30);

  // de stick
  stroke(120, 70, 20);
  strokeWeight(10);
  line(stickX - 40, stickY, stickX + 40, stickY);
  strokeWeight(1);
  stroke(0);

  // slaan
  if (hitTimer > 0) {
    hitTimer = hitTimer - 1;
  }
  if (draggingStick == true && dist(stickX, stickY, petX, petY) < petSize / 2 && hitTimer == 0) {
    health = health - 20;
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
  rect(100, 30, health * 3, 30);
  fill(255, 110, 100); // lichte streep
  rect(100, 33, health * 3, 5);
  fill(160, 10, 0); // donkere streep
  rect(100, 55, health * 3, 5);

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
  rect(100, 90, energy * 3, 30);
  fill(190, 255, 110);
  rect(100, 93, energy * 3, 5);
  fill(90, 160, 10);
  rect(100, 115, energy * 3, 5);

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
  rect(100, 150, happiness * 3, 30);
  fill(255, 255, 100);
  rect(100, 153, happiness * 3, 5);
  fill(215, 160, 0);
  rect(100, 175, happiness * 3, 5);

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
  rect(100, 210, hunger * 3, 30);
  fill(140, 210, 255);
  rect(100, 213, hunger * 3, 5);
  fill(40, 110, 180);
  rect(100, 235, hunger * 3, 5);

  stroke(0); // randen weer aanzetten voor de rest van de game
}

function mousePressed() { // dist betekent the punten tussen de waardes? dus je hebt x, en dan heb je y,
  if (dist(mouseX, mouseY, stickX, stickY) < 40) {
    draggingStick = true;
    return;// gaat weer terug naar het begin van de code 
  }

  if (dist(mouseX, mouseY, petX, petY) < petSize / 2) {
    draggingPet = true;
  }
}

function mouseDragged() {
  // de stick laten meebewegen
  if (draggingStick == true) {
    stickX = mouseX;
    stickY = mouseY;
  }

  if (draggingPet == true) { // hier heb ik constrain gebruikt constrain is eigenlijk het controleerd of je waarde niet te hoog is voor de maximaal dus je hebt 6700, 0, 100 6700 is te hoog dus hij pakt de 100
    // ik gebruikt de constrain ook voor mijn slap rect tool dus als hij dicht bij is bij een object dat hij het uitvoerd in de canvas
    petX = constrain(mouseX, petSize / 2, width - petSize / 2);
    petY = constrain(mouseY, petSize / 2, height - petSize / 2); // de constrain controleerd of
    // mijn muis dicht bij is bij mijn pet zo ja dan kan ik de pet draggen

    // eten opeten (alleen als je de pet sleept)
    if (dist(petX, petY, food1X, food1Y) < petSize / 2 + 15) {
      food1X = -1000;
      food1Y = -1000;
      hunger = hunger + 20;
      happiness = happiness + 5;
    }
    if (dist(petX, petY, food2X, food2Y) < petSize / 2 + 15) {
      food2X = -1000;
      food2Y = -1000;
      hunger = hunger + 20;
      happiness = happiness + 5;
    }
    if (dist(petX, petY, food3X, food3Y) < petSize / 2 + 15) {
      food3X = -1000;
      food3Y = -1000;
      hunger = hunger + 20;
      happiness = happiness + 5;
    }
    if (dist(petX, petY, food4X, food4Y) < petSize / 2 + 15) {
      food4X = -1000;
      food4Y = -1000;
      hunger = hunger + 20;
      happiness = happiness + 5;
    }
    if (dist(petX, petY, food5X, food5Y) < petSize / 2 + 15) {
      food5X = -1000;
      food5Y = -1000;
      hunger = hunger + 20;
      happiness = happiness + 5;
    }
    if (dist(petX, petY, food6X, food6Y) < petSize / 2 + 15) {
      food6X = -1000;
      food6Y = -1000;
      hunger = hunger + 20;
      happiness = happiness + 5;
    }
    if (dist(petX, petY, food7X, food7Y) < petSize / 2 + 15) {
      food7X = -1000;
      food7Y = -1000;
      hunger = hunger + 20;
      happiness = happiness + 5;
    }
    if (dist(petX, petY, food8X, food8Y) < petSize / 2 + 15) {
      food8X = -1000;
      food8Y = -1000;
      hunger = hunger + 20;
      happiness = happiness + 5;
    }
    if (dist(petX, petY, food9X, food9Y) < petSize / 2 + 15) {
      food9X = -1000;
      food9Y = -1000;
      hunger = hunger + 20;
      happiness = happiness + 5;
    }
    if (dist(petX, petY, food10X, food10Y) < petSize / 2 + 15) {
      food10X = -1000;
      food10Y = -1000;
      hunger = hunger + 20;
      happiness = happiness + 5;
    }
  }
}

function mouseReleased() {
  draggingPet = false;

  // de stick loslaten
  draggingStick = false;
}

function FoodSpawn() {
  // Elke klik zet maar 1 eten neer het eerste eten dat er nog niet is.
  if (food1X < 0) {
    food1X = random(30, width - 30);
    food1Y = random(280, height - 30);
  } else if (food2X < 0) {
    food2X = random(30, width - 30);
    food2Y = random(280, height - 30);
  } else if (food3X < 0) {
    food3X = random(30, width - 30);
    food3Y = random(280, height - 30);
  } else if (food4X < 0) {
    food4X = random(30, width - 30);
    food4Y = random(280, height - 30);
  } else if (food5X < 0) {
    food5X = random(30, width - 30);
    food5Y = random(280, height - 30);
  } else if (food6X < 0) {
    food6X = random(30, width - 30);
    food6Y = random(280, height - 30);
  } else if (food7X < 0) {
    food7X = random(30, width - 30);
    food7Y = random(280, height - 30);
  } else if (food8X < 0) {
    food8X = random(30, width - 30);
    food8Y = random(280, height - 30);
  } else if (food9X < 0) {
    food9X = random(30, width - 30);
    food9Y = random(280, height - 30);
  } else if (food10X < 0) {
    food10X = random(30, width - 30);
    food10Y = random(280, height - 30);
  }



}