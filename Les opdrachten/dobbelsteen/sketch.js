let RandomNumber = 1;

function keyPressed() {
  if (keyCode === 'c') {
    RandomNumber = 1;
    RandomNumber = 2;
    RandomNumber = 3;
    RandomNumber = 4;
    RandomNumber = 5;
    RandomNumber = 6;

  }
}



function setup() {
  createCanvas(710, 400);
}


function draw() {
  background(220);

  //dobbelsteen
  fill("White")
  square(200, 70, 200, 20);

  /*
  // Links
  fill("Black")
  circle(230, 100, 50);
  circle(230, 170, 50);
  circle(230, 237, 50);

  // Rechts
  fill("Black")
  circle(365, 100, 50);
  circle(365, 170, 50);
  circle(365, 237, 50);
  
  // Midden
  fill("Black")
  circle(300, 170, 50);
*/
  if (RandomNumber == 1) {
    fill("Black");
    circle(300, 170, 50);
  }
 
  if (RandomNumber == 2) {
    fill('black');
    circle(230, 100, 50);
    circle(365, 237, 50);
    
  }
 
  if (RandomNumber == 3) {
      fill("Black")
      circle(300, 170, 50);
      circle(230, 100, 50);
      circle(365, 237, 50);

  }

  if (RandomNumber == 4) {
    fill("Black")
    circle(230, 100, 50);
    circle(230, 237, 50);
    circle(365, 237, 50);
    circle(365, 100, 50);

  }
  
  if (RandomNumber == 5) {
    fill("Black")
    circle(365, 100, 50);
    circle(300, 170, 50);
    circle(365, 237, 50);
    circle(230, 237, 50);
    circle(230, 100, 50);

  }
  
  if (RandomNumber == 6) {
      fill("Black");
      circle(230, 170, 50);
      circle(230, 100, 50);
      circle(365, 237, 50);
      circle(365, 170, 50);
      circle(365, 100, 50);
      circle(230, 237, 50);

  }

  if (RandomNumber == 7) {
      fill("Black");
      circle(230, 170, 50);
      circle(230, 100, 50);
      circle(365, 237, 50);
      circle(365, 170, 50);
      circle(365, 100, 50);
      circle(230, 237, 50);
      circle(300, 170, 50);

  }
  
}

