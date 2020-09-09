let popul;
let lifeSpan = 1200;
let count = 0;
let target;
let mutation = true;
let genCount = 1;
let maximumFitness = 0;
let minDist = 600;
let currentMAxFit;

let rx = 200;
let ry = 300;
let rw = 600;
let rh = 10;

function setup() {
  createCanvas(1000, 600);
  popul = new Population();
  target = createVector(width / 2, 100);
}

function draw() {
  background("black");
  popul.run();
  count++;

  fill("#7d0633");
  rect(rx, ry, rw, rh);

  fill("#ff4b5c");
  ellipse(target.x, target.y, 30, 30);

  fill("white");
  ellipse(target.x, target.y, 15, 15);

  textFont('Orbitron');

  fill("white");
  textStyle(BOLD);

  textSize(20);
  text("Life Span: " + count, width / 6, height / 6);

  textSize(20);
  text("Generation: " + genCount, width / 2.35, height / 14);

  textSize(20);
  text("Maximum Fitness: " + round(maximumFitness, 2), (width / 6) * 4, (height / 6));

  if (count === lifeSpan) {
    genCount++;
    minDist = height;
    popul.evaluate();
    popul.selection()
    count = 0;
  }
}
