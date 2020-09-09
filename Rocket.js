function Rocket(dna) {
  this.pos = createVector(width / 2, height - 50);
  this.vel = createVector();
  this.acc = createVector();
  this.completed = false;
  this.crashed = false;
  this.crashedWall = false;
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  this.calcFitness = function() {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, height, height, 0);
    if (this.completed) {
      this.fitness *= 10;
    }
    if (this.crashed) {
      this.fitness /= 10;
    }
    if (this.crashedWall) {
      this.fitness /= 10;
    }
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 20) {
      this.completed = true;
      mutation = false;
      this.pos = target.copy();
    }

    if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
      console.log("crashed");
      this.crashed = true;

    }

    if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {

      this.crashedWall = true;

    }

    if (!this.completed && !this.crashed && !this.crashedWall) {
      this.applyForce(this.dna.genes[count]);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(1.5);
    }
  }

  this.show = function(color) {
    push();
    translate(this.pos.x, this.pos.y);
    rectMode(CENTER);
    rotate(this.vel.heading() + 90);
    fill(color);
    if (this.crashed || this.crashedWall) {
      fill("#ff4b5c");
    }
    rect(-2.5, 20, 2.5, 7.5);
    rect(2.5, 20, 2.5, 7.5);
    triangle(-5, 20, 5, 20, 0, 0);
    pop();
  }
}
