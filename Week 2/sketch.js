let dayC, nightC, sunriseC;
let sun1 = 30;
let Moon2 = -1030;
let Moon2Speed = 5.5;

let totalDayTime = 100;

let sunAndMoonSpeed = 3;
function setup() {
  createCanvas(800, 600);

  noStroke();
  dayC = color(150, 220, 255);
  nightC = color(0, 0, 50);
  sunriseC = color(220, 150, 200);
}

function draw() {

  let time = cos(frameCount / totalDayTime);

  let c;
  // time will be between -1 and 1
  if (time < 0) {
    // if we are in the -1 to 0 range
    // it is night time so we want to map
    // between the night and the sunrise colour
    c = lerpColor(sunriseC, nightC, abs(time));

  } else {
    // if we are in the 0 to 1 range
    // it is day time, so we want to map
    // between the day and sunrise colour
    c = lerpColor(sunriseC, dayC, time);


  }

  background(c);
  fill(0);
  rect(0, 0, width, 30);
  fill(255);
  text(floor(time * 1000) / 1000, width / 2, 15);



  Moon2 = Moon2 + sunAndMoonSpeed;
  if(time < 0)
  {
    fill("grey")

  }
  else
  {
    fill("yellow")
  }
  circle(Moon2, 100, 60)
  if (Moon2 >= 3000) {
    Moon2 = -200
  }



  // sun1 = sun1 + sunAndMoonSpeed;
  // fill("yellow")
  // circle(sun1, 100, 60)

  // if (sun1 >= 3000) {
  //   sun1 = -200

  // }


  text("moon2:" + Moon2, 20, 150);

  fill("grey");
  rect(1, 399, 900, 200, 0, 0,);
  fill("green");
  rect(1, 360, 900, 100, 0, 0,);

  fill("White");
  rect(1, 512, 90, 20, 0, 0,)
  rect(100, 512, 90, 20, 0, 0,)
  rect(200, 512, 90, 20, 0, 0,)
  rect(300, 512, 90, 20, 0, 0,)
  rect(400, 512, 90, 20, 0, 0,)
  rect(500, 512, 90, 20, 0, 0,)
  rect(600, 512, 90, 20, 0, 0,)
  rect(700, 512, 90, 20, 0, 0,)


   fill("grey")
   rect(710, 390, 10, 90, 0, 0,)
   rect(680, 300, 70, 120, 0, 0,)

   fill("red")
   circle(715, 319, 30, 10, 1,)
   
   fill("green")
   circle(715, 396, 30, 10, 1,)

   fill("orange")
   circle(715 , 360, 30, 10, 1,)

   fill("red")
   rect(30, 450, 144, 40, 50)
   rect(200, 450, 144, 40, 50)
   
   
   fill("Black")
   circle(50, 499, 35, 0,)
   circle(150, 499, 35, 0,)




   
  }
