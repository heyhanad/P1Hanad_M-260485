function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  let kleuren = [
    ['red', 'red', 'blue'],
    ['green', 'green', 'blue'],
    ['yellow', 'yellow', 'red']
    // my table colors
  ];



  for (let y = 0; y < kleuren.length; y++) {
    for (let x = 0; x < kleuren[y].length; x++) {

      fill(kleuren[y][x]);
      rect(x * 30, y * 20, 20, 20);

    }
  }



}
