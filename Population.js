function Population() {
  this.rockets = [];
  this.popSize = 100;
  this.matingPool = [];

  for (let i = 0; i < this.popSize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function() {
    let maxFit = 0;
    for (let i = 0; i < this.popSize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxFit) {
        maxFit = this.rockets[i].fitness;
      }
    }
    maximumFitness = maxFit;

    for (let i = 0; i < this.popSize; i++) {
      this.rockets[i].fitness /= maxFit;
    }

    this.matingPool = [];

    for (let i = 0; i < this.popSize; i++) {
      let n = this.rockets[i].fitness * 100;
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.rockets[i]);
      }
    }
  }

  this.selection = function() {
    let newRockets = [];
    for (let i = 0; i < this.rockets.length; i++) {
      let parentA = random(this.matingPool).dna;
      let parentB = random(this.matingPool).dna;
      let child = parentA.crossOver(parentB);
      if (mutation) {
        child.mutation();
      }
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }

  this.run = function() {
    for (let i = 0; i < this.popSize; i++) {
      this.rockets[i].update();
      let d = dist(this.rockets[i].pos.x, this.rockets[i].pos.y, target.x, target.y);
      if (d < minDist && !this.rockets[i].crashed && !this.rockets[i].crashedWall) {
        minDist = d;
        this.rockets[i].show("#81b214");
      } else {
        this.rockets[i].show("white");
      }
    }
  }
}
