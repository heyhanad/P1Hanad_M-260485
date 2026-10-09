//function addition(a, b) {
//return a + b;
//}

//let totaal = addition(10, 5); //Output: 15''

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(200);

  for (let index = 0; index < 10; index++) {
    triangle(30 + index * 58, 20, 86, 75);
    tekenHuis(30 + index * 58, 89, 86, 75);
    
  }


}


function tekenHuis(x, y, l, b) {

  rect(x, y, l, b);
  triangle(30, 75, 58, 20, 86, 75);

}


