//this stores flowers, trees, and rain
let flowers = [];
let trees = [];
let rain = [];

function setup() {
  createCanvas(400, 400);

  colorMode(HSB, 360, 100, 100);

  noStroke();
//this adds trees to the canvas
  trees.push(new Tree(60, 285));
  trees.push(new Tree(180, 270));
  trees.push(new Tree(310, 280));
//this creates the random flowers in the landscape
  for (let i = 0; i < 20; i++) {
    flowers.push(new Flower(random(20, width - 20), random(320, 385)));
  }
//this creates the rain
  for (let i = 0; i < 120; i++) {
    rain.push(new RainDrop());
  }
}
//the function draw displays all scenery in the landscape
function draw() {
  drawGradientSky();

  drawMoon();

  drawMountains();

  drawRain();

  drawGround();

  for (let t of trees) {
    t.show();
  }

  for (let f of flowers) {
    f.update();

    f.show();
  }
}
//this gives the night sky
function drawGradientSky() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);

    let c = lerpColor(color(240, 60, 12), color(260, 40, 2), inter);

    stroke(c);

    line(0, y, width, y);
  }

  noStroke();
}
// this creates the glowing moon
function drawMoon() {
  noStroke();

  fill(60, 5, 100, 10);
  ellipse(320, 70, 90);

  fill(60, 5, 100, 20);
  ellipse(320, 70, 65);

  fill(60, 5, 100);
  ellipse(310, 80, 55);
}
//this draws the mountain
function drawMountains() {
  fill(220, 20, 20);

  triangle(0, 300, 130, 130, 260, 300);

  fill(220, 25, 15);

  triangle(140, 300, 285, 90, 420, 300);

  fill(0, 0, 100, 85);

  triangle(100, 170, 130, 130, 160, 170);

  triangle(248, 145, 285, 90, 322, 145);
}
//gives an uneven shape to the ground
function drawGround() {
  fill(120, 45, 14);

  beginShape();

  vertex(0, height);

  for (let x = 0; x <= width; x += 20) {
    let y = 290 + sin(x * 0.025) * 15;

    vertex(x, y);
  }

  vertex(width, height);

  endShape(CLOSE);
}
//this creates the flower
class Flower {
  constructor(x, y) {
    this.x = x;

    this.y = y;

    this.hue = random(300, 360);

    this.offset = random(1000);
  }
//this gives animation to the flowers
  update() {
    this.swing = sin(frameCount * 0.03 + this.offset) * 3;
  }

  show() {
    stroke(120, 80, 35);

    strokeWeight(2);

    line(this.x, this.y, this.x + this.swing, this.y - 20);

    noStroke();

    fill(this.hue, 70, 100);

    for (let i = 0; i < 8; i++) {
      let angle = (TWO_PI / 8) * i;

      let px = this.x + this.swing + cos(angle) * 5;

      let py = this.y - 20 + sin(angle) * 5;

      ellipse(px, py, 7);
    }

    fill(50, 80, 100);

    ellipse(this.x + this.swing, this.y - 20, 7);
  }
}
//this draws the tree
class Tree {
  constructor(x, y) {
    this.x = x;

    this.y = y;

    this.size = 55;
  }

  show() {
    fill(30, 60, 20);

    rect(this.x, this.y, 12, this.size);

    fill(120, 50, 25);

    ellipse(this.x + 6, this.y, this.size);

    ellipse(this.x - 12, this.y + 10, this.size * 0.7);

    ellipse(this.x + 24, this.y + 10, this.size * 0.7);
  }
}
//this creates the rain 
class RainDrop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);

    this.y = random(-height, 0);

    this.speed = random(4, 10);

    this.len = random(5, 15);
  }
//this gives animation to the raindrops
  update() {
    this.y += this.speed;

    if (this.y > height) {
      this.reset();

      this.y = random(-50, 0);
    }
  }

  show() {
    stroke(200, 20, 100, 40);

    strokeWeight(1);

    line(this.x, this.y, this.x, this.y + this.len);
  }
}

function drawRain() {
  for (let r of rain) {
    r.update();

    r.show();
  }

  noStroke();
}
//this adds flowers when the mouse is pressed
function mousePressed() {
  if (mouseY > 300) {
    flowers.push(new Flower(mouseX, mouseY));
  }
}
