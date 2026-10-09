let kleuren = ["green", "Red"]

let ImageFinandJake;
let ImageDonald1;
let ImageBen10;

function preload() {
  ImageFinandJake = loadImage('mijnAfbeelding.png'); // mijn image finn & Jake.
  ImageDonald1 = loadImage('Donald Duck.png'); // mijn DonaldDUCK image.
  ImageBen10 = loadImage('Ben10.png'); // mijn Ben10 Image.


}
function setup() {
  createCanvas(800, 800);
  let donald = createButton("donald Duck");
  donald.position(150, 400); // Donald position.
  donald.style("background-color", "rgba(1, 0, 0, 0.02)");
  donald.style("font-size", "35px");
  donald.mousePressed(DonaldDuck);// functie mouse pressed button DonaldDuck.

  let Ben10 = createButton("Ben 10");
  Ben10.position(400, 400); // ben10 position.
  Ben10.style("background-color", "rgba(1, 0, 0, 0.02)");
  Ben10.style("font-size", "35px");
  Ben10.mousePressed(BenBoy);

  let adventureTime = createButton("AdventureTime");
  adventureTime.position(390, 480);
  adventureTime.style("background-color", "rgba(1, 0, 0, 0.02)");
  adventureTime.style("font-size", "35px");
  adventureTime.mousePressed(adventure);// functie mouse pressed AdventureTime.

  let PowerRangers = createButton("Power Rangers");
  PowerRangers.position(90, 500);
  PowerRangers.style("background-color", "rgba(1, 0, 0, 0.02)");
  PowerRangers.style("font-size", "35px");
  PowerRangers.mousePressed(Rangers);
}


function draw() {
  background(220);
  ///      x   y   s   r
  // rect(50, 50, 50, 45);

  textSize(40)
  text("Welk cartoon film is dit?", 50, 30,);// text/ position.

  image(ImageFinandJake, 200, 100, 200, 200)// CUSTOM image position. Finn & Jake
  image(ImageDonald1, 90, 390, 50, 50); // custom image Donald Duck postion.
  image(ImageBen10, 520, 390, 50, 50) /// custom image Ben10 postion.
}


function DonaldDuck() {
  console.log("DonaldDuck werd geklikt!"); // dit komt in console log na dat ik op de button click.
}

function BenBoy() {
  console.log("Ben10 werd geklikt!");
}

function adventure() {
  console.log("AdventureTime werd geklikt!");
}

function Rangers(){
  console.log("Power Rangers werd geklikt!");
}
