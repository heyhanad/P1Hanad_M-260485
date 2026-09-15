let a = 40;
let b = 300;

let kaas = 30
let iamcoding = 24
let learned = 2000
let iksnaphet = 300


let som = a + b;
let verschil = a - b;
let product = a * b;
let uitkomst = a / b;
let rest = a % b;
let Hanad = iamcoding + b
let ja = learned * b
let hetisgoed = iksnaphet + b

function setup() {
  createCanvas(400, 400);
}



function draw() {
  background(0, 0, 0);
  
  fill("yellow")
  textSize(50)
  text("iksnaphet = " + (hetisgoed + b), 40, 120)
  
  
  fill("green")
  textSize(30)
  text("learned ja * b =" + (ja * b), 30, 80);
  
  fill("Pink")
  textSize(25);
  text("iamcoding = " + (iamcoding + b), 30, 45);
  
  fill("Red")
  textSize(50)
  text("som : = " + (a + b),   40, 250);// dit is een som a+b
  
  fill("Cyan")
  textSize(25)
  text("verschil: = " + (a - b), 50, 315);// dit is een min som a-b
  
  fill("Purple")
  textSize(24)
  text("product = " + (a * b), 50, 350);
}

