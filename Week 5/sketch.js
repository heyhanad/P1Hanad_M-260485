let kleuren = ["green", "Red"] // wil ik nog gebruiken voor de feedback; goed/fout

let antwoorden = ["Donald Duck", "Ben10", "adventureTime"]

let ImageFinandJake;
let ImageDonald1;
let ImageBen10;

let vraagNummer = 0;
let score = 0;
let feedback = "moet nog dingen fixen.";
let beantwoord = false;
let volgendeKnop;
let donald;
let Ben10;
let adventureTime;
let PowerRangers;

function preload() {
  ImageFinandJake = loadImage('mijnAfbeelding.png'); // mijn image finn & Jake.
  ImageDonald1 = loadImage('Donald Duck.png'); // mijn DonaldDUCK image.
  ImageBen10 = loadImage('Ben10.png'); // mijn Ben10 Image.


}
function setup() {
  createCanvas(800, 800);

  donald = createButton("donald Duck");
  donald.position(150, 400); // Donald position.
  donald.style("background-color", "rgba(1, 0, 0, 0.02)");
  donald.style("font-size", "35px");
  donald.mousePressed(DonaldDuck);// functie mouse pressed button DonaldDuck.

  Ben10 = createButton("Ben 10");
  Ben10.position(400, 400); // ben10 position.
  Ben10.style("background-color", "rgba(1, 0, 0, 0.02)");
  Ben10.style("font-size", "35px");
  Ben10.mousePressed(BenBoy);

  adventureTime = createButton("AdventureTime");
  adventureTime.position(390, 480);
  adventureTime.style("background-color", "rgba(1, 0, 0, 0.02)");
  adventureTime.style("font-size", "35px");
  adventureTime.mousePressed(adventure);// functie mouse pressed AdventureTime.

  PowerRangers = createButton("Power Rangers");
  PowerRangers.position(90, 500);
  PowerRangers.style("background-color", "rgba(1, 0, 0, 0.02)");
  PowerRangers.style("font-size", "35px");
  PowerRangers.mousePressed(Rangers);

  volgendeKnop = createButton("Volgende");
  volgendeKnop.position(300, 650);
  volgendeKnop.style("font-size", "30px");
  volgendeKnop.mousePressed(volgendeVraag);
  volgendeKnop.hide();
  // buttons
}


function draw() {
  background(220);
  textSize(40);

  if (vraagNummer < 3) {
    text("Welk cartoon film is dit?", 50, 30);

    if (vraagNummer === 0) {
      image(ImageFinandJake, 200, 100, 200, 200);
    }
    if (vraagNummer === 1) {
      image(ImageDonald1, 200, 100, 200, 200);
    }
    if (vraagNummer === 2) {
      image(ImageBen10, 200, 100, 200, 200);
    }
    image(ImageDonald1, 90, 390, 50, 50); // custom image Donald Duck postion.
    image(ImageBen10, 520, 390, 50, 50) /// custom image Ben10 postion.

    text(feedback, 300, 600);
    text("Score: " + score, 600, 50);
  }

  if (vraagNummer === 3) {
    text("Klaar! Score: " + score + " / 3", 150, 300);
  }
}

function DonaldDuck() {
  console.log("DonaldDuck werd geklikt!"); // dit komt in console log na dat ik op de button click.
  if (beantwoord === false) {
    beantwoord = true;
    if (vraagNummer === 1) {
      feedback = "Goed!";
      score++;
    } else {
      feedback = "Fout!";
    }
    volgendeKnop.show();
  }
}

function BenBoy() {
  console.log("Ben10 werd geklikt!");
  if (beantwoord === false) {
    beantwoord = true;
    if (vraagNummer === 2) {
      feedback = "Goed!";
      score++;
    } else {
      feedback = "Fout!";
    }
    volgendeKnop.show();
  }
}

function adventure() {
  console.log("AdventureTime werd geklikt!");
  if (beantwoord === false) {
    beantwoord = true;
    if (vraagNummer === 0) {
      feedback = "Goed!";
      score++;
    } else {
      feedback = "Fout!";
    }
    volgendeKnop.show();
  }
}

function Rangers() {
  console.log("Power Rangers werd geklikt!");
  if (beantwoord === false) {
    beantwoord = true;
    feedback = "Fout!";
    volgendeKnop.show();
  }
}

function volgendeVraag() {
  vraagNummer++;
  feedback = "";
  beantwoord = false;
  volgendeKnop.hide();

  if (vraagNummer >= 3) {
    donald.hide();
    Ben10.hide();
    adventureTime.hide();
    PowerRangers.hide();
  }
}
