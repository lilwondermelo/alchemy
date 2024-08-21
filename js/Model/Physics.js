export default class Physics {
    constructor() {
    }

    movesLiquid(mass, force) {
        let vector = {
          "up": -1,
          "right": -1,
          "down": -1,
          "left": -1
        }
        if (force[0] > 0) {
          vector["right"] = force[0]/2 + mass/2;
          vector["up"] = force[0]/2 - mass;
          vector["down"] = force[0] + mass;
        }
        else if (force[0] < 0) {
          vector["left"] = -force[0]/2 + mass/2;
          vector["up"] = -force[0]/2 - mass;
          vector["down"] = -force[0] + mass;
        }
        else if (force[1] < 0) {
          vector["left"] = -force[1]/2 + mass/2;
          vector["right"] = -force[1]/2 + mass/2;
          vector["up"] = -force[1] - mass;
        }
        else {
          vector["left"] = force[1]/2 + mass/2;
          vector["right"] = force[1]/2 + mass/2;
          vector["down"] = force[1] + mass;
        }
        return vector;
      }

      moveGas(force) {
        let vector = {
          "up": Math.abs(force[1]/3) + Math.abs(force[0]/3),
          "right": Math.abs(force[1]/3) + Math.abs(force[0]/3),
          "down": Math.abs(force[1]/3) + Math.abs(force[0]/3),
          "left": Math.abs(force[1]/3) + Math.abs(force[0]/3)
        }
        return vector;
      }





      movesSolid(mass, force) {
        let vector = {
          "up": -1,
          "right": -1,
          "down": -1,
          "left": -1
        }
  
        let y = force[1];
        let x = force[0];
        if (x > 0) {
          vector['right'] = x;
          vector['down'] = mass;
        }
        else if (x < 0) {
          vector['left'] = -x;
          vector['down'] = mass;
        }
        else if (y < 0) {
          vector['up'] = -y - mass;
        }
        else {
          vector['down'] = y + mass;
        }
        return vector;
      }
  
      
  }