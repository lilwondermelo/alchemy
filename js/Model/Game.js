import Block from './Block.js';
import Maths from './Maths.js';
import Physics from './Physics.js';

export default class Game {
  map = {};
  path = [];
  moves = {};
  maths;
  phys;
  types = [
    {
      "id": 0,
      "name": "fire",
      "type": "field",
      "mass": 0
    },
    {
      "id": 1,
      "name": "air",
      "type": "gas",
      "mass": 0
    },
    {
      "id": 2,
      "name": "water",
      "type": "liquid",
      "mass": 2
    },
    {
      "id": 3,
      "name": "earth",
      "type": "solid",
      "mass": 6
    }
  ]
    constructor(gridWidth, gridHeight) {
      this.maths = new Maths();
      this.phys = new Physics();

      this.gridWidth = gridWidth;
      this.gridHeight = gridHeight;
      this.grid = new Array(gridWidth * gridHeight).fill(null);
      this.renderMain();
    }
  
    moveBlock(block) {
    }

    get_direction() {

    }

    cancel() {
      Object.entries(this.map).forEach(([key, value]) => value.unselect());
      $('.energy').html(0);
      this.path = [];
    }

    clear_path() {
      Object.entries(this.map).forEach(([key, value]) => {
        if (value.cell.hasClass("highlighted")) {
          value.unselect();
        }
      });
    }

    

    checkMoves(block) {
      const type = this.types[block.attr("data-type")].type;
      const mass = this.types[block.attr("data-type")].mass;
      let moves = [];
      let x = 0;
      let y = 0;
      let force = 0;

      if (this.path.length > 0) {
        x = parseInt(block.attr('data-x') - parseInt(this.path.slice(-1)[0].attr('data-x')));
        y = parseInt(block.attr('data-y') - parseInt(this.path.slice(-1)[0].attr('data-y')));
        force = this.moves[this.maths.get_direction(x,y)];
      }
      console.log(force);
      if (type == "solid") {
        moves = this.phys.movesSolid(mass, [x * force, y * force]);
      }
      else if (type == "liquid") {
        moves = this.phys.movesLiquid(mass, [x * force, y * force]);
      }
      else if (type == "gas") {
        moves = this.phys.moveGas([x * force, y * force]);
      }
      else {
        moves = {
          "up": -1,
          "right": -1,
          "down": -1,
          "left": -1
        }
      }
      console.log(moves);
      let cell = this.map[block.attr('data-id')];
      if (this.path.length > 0) {
        cell.select(moves[this.maths.get_direction(x, y)]);
      }
      else {
        cell.select(mass);
      }
      this.moves = moves;
      this.path.push(block);
      this.availableMoves(moves, cell);
    }

    availableMoves(moves, cell) {
      let x = cell.x;
      let y = cell.y;
      const near = {
        "up": (y > 0)?this.map['' + x + '' + (y-1)]:null,
        "right": (x < this.gridWidth - 1)?this.map['' + (x+1) + '' + y]:null,
        "down": (y < this.gridHeight - 1)?this.map['' + x + '' + (y+1)]:null,
        "left": (x > 0)?this.map['' + (x-1) + '' + y]:null
      }
      for (const key in moves) {
        if (near[key] != null) {
          if ((moves[key] >= this.types[near[key].type].mass) && (moves[key] != -1)) {
            near[key].highlight();
          }
        }
        
      }
    }

    render() {
      return this.table;
    }

    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    renderMain() {
      this.table = $('<table class="main"></table>');
      for (let j = 0; j < this.gridHeight; j++) {
        const row = $('<tr></tr>');
        for (let i = 0; i < this.gridWidth; i++) {
          var type = this.getRandomInt(4);
          var cell = new Block(i, j, this.types[type]);
          this.map['' + i + j] = cell;
          row.append(cell.render());
        }
        // Добавляем строку в таблицу
        this.table.append(row);
      }
    }

    

    
  }