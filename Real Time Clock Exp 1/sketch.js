//different neon color themes
let theme = 0;
let colors = [
  {
    bg: [10, 20, 35],
    glow: [0, 200, 255],
  },

  {
    bg: [30, 10, 25],
    glow: [255, 80, 180],
  },

  {
    bg: [5, 25, 20],
    glow: [80, 255, 180],
  },
];

function setup() {
  createCanvas(400, 400);

  angleMode(DEGREES);

  textAlign(CENTER, CENTER);

  textFont("monospace");
}

function draw() {
  let c = colors[theme];

  background(c.bg[0], c.bg[1], c.bg[2]);

  translate(width / 2, height / 2);

  noFill();
// this gives glowing effect
  for (let i = 0; i < 5; i++) {
    stroke(c.glow[0], c.glow[1], c.glow[2], 20);

    strokeWeight(10 - i * 2);

    ellipse(0, 0, 260 + i * 5);
  }

  fill(20, 20, 30);

  noStroke();

  ellipse(0, 0, 240);

  stroke(c.glow[0], c.glow[1], c.glow[2]);
//this creates the minute needle
  for (let i = 0; i < 60; i++) {
    rotate(6);

    line(100, 0, 110, 0);
  }
//this gives the real time for the clock
  let h = hour() % 12;

  let m = minute();

  let s = second();
// this rotates the hour hand
  push();

  rotate(h * 30 + m * 0.5);

  strokeWeight(6);

  line(0, 0, 0, -55);

  pop();
//this rotates the minutes hand
  push();

  rotate(m * 6);

  strokeWeight(4);

  line(0, 0, 0, -80);

  pop();
//this rotates the seconds hand 
  push();

  rotate(s * 6);

  stroke(255, 80, 100);

  strokeWeight(2);

  line(0, 10, 0, -95);

  pop();

  noStroke();

  fill(c.glow[0], c.glow[1], c.glow[2]);

  ellipse(0, 0, 14);

  fill(255);
// this displays the digital clock
  textSize(22);

  text(
    nf(hour(), 2) + ":" + nf(minute(), 2) + ":" + nf(second(), 2),

    0,
    165
  );
}
//this changes the theme
function mousePressed() {
  theme++;

  if (theme >= colors.length) {
    theme = 0;
  }
}
