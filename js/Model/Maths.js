export default class Maths {
    constructor() {
    }

    get_direction(x, y) {
        if (x >= 1) {
          return "right";
        }
        else if (x <= -1) {
          return "left";
        }
        else if (y >= 1) {
          return "down";
        }
        else if (y <= -1) {
          return "up";
        }
      }

      
  }