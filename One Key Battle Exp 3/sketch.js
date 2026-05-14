//this loads the sound files
let hitSound;
let winSound;
let bgMusic;
//this stores sound variables
let orbX;
let gameOver = false;
let winner = "";
//this stores particle effect
let particles = [];

//this loads game audio files
function preload() {
  hitSound = loadSound("hit.mp3");
  winSound = loadSound("win.mp3");
  bgMusic = loadSound("bgmusic.mp3");
}

function setup() {
  createCanvas(400, 400);

  colorMode(HSB, 360, 100, 100);

  textAlign(CENTER, CENTER);

  textFont("monospace");

  orbX = width / 2;

  noStroke();

}
//this draws the game scene
function draw() {
  drawBackground();

  drawArenaGlow();

  drawOrb();

  drawParticles();

  if (!gameOver) {
    checkWinner();
  }

  drawUI();
}

function drawBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);

    let c = lerpColor(color(230, 60, 8), color(280, 50, 3), inter);

    stroke(c);

    line(0, y, width, y);
  }

  noStroke();

  fill(280, 40, 100, 5);

  ellipse(width / 2, height / 2, 320);
}

function drawArenaGlow() {
  fill(200, 80, 100, 8);

  rect(0, 0, width / 2, height);

  fill(340, 80, 100, 8);

  rect(width / 2, 0, width / 2, height);

  stroke(0, 0, 100, 15);

  line(width / 2, 0, width / 2, height);

  noStroke();
}
//this draws glowing orb
function drawOrb() {
  fill(50, 80, 100, 10);

  ellipse(orbX, height / 2, 100);

  fill(50, 80, 100, 35);

  ellipse(orbX, height / 2, 50);

  fill(50, 20, 100);

  ellipse(orbX, height / 2, 24);
}
//this creates particles when player hit the orb
class Particle {
  constructor(x, y, hue) {
    this.x = x;

    this.y = y;

    this.hue = hue;

    this.vx = random(-4, 4);

    this.vy = random(-4, 4);

    this.life = 100;

    this.size = random(3, 8);
  }

  update() {
    this.x += this.vx;

    this.y += this.vy;

    this.life -= 3;
  }

  show() {
    fill(this.hue, 70, 100, this.life);

    ellipse(this.x, this.y, this.size);
  }
}

function drawParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();

    particles[i].show();

    if (particles[i].life <= 0) {
      particles.splice(i, 1);
    }
  }
}
//this displays games informations
function drawUI() {
  fill(0, 0, 100);

  textSize(16);

  text("PLAYER 1 : A", 80, 35);

  text("PLAYER 2 : L", 320, 35);

  if (gameOver) {
    fill(50, 80, 100);

    textSize(28);

    text(winner, width / 2, height / 2 - 40);

    fill(0, 0, 100);

    textSize(16);

    text("PRESS R TO RESTART", width / 2, height / 2 + 10);
  }
}
//this checks winning conditions, whether player 1 or 2 wins
function checkWinner() {
  if (orbX < 35) {
    winner = "PLAYER 2 WINS";

    gameOver = true;

    winSound.play();

    bgMusic.stop();
  }

  if (orbX > width - 35) {
    winner = "PLAYER 1 WINS";

    gameOver = true;

    winSound.play();

    bgMusic.stop();
  }
}
//this controls the background sounds and interactions
function keyPressed() {
  if (!bgMusic.isPlaying() && !gameOver) {
    bgMusic.loop();
  }

  if (!gameOver) {
    if (key == "a" || key == "A") {
      orbX += 10;

      createBurst(orbX, height / 2, 200);

      hitSound.play();
    }

    if (key == "l" || key == "L") {
      orbX -= 10;

      createBurst(orbX, height / 2, 340);

      hitSound.play();
    }
  }

  if (key == "r" || key == "R") {
    orbX = width / 2;

    gameOver = false;

    winner = "";

    particles = [];
  }
}
//this creates the particle
function createBurst(x, y, hue) {
  for (let i = 0; i < 12; i++) {
    particles.push(new Particle(x, y, hue));
  }
}
