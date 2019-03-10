
import * as Util from './util'

interface Pos {
  y :number,
  x :number
}

enum Tiles {
  Floor = 'FLOOR',
  Wall  = 'WALL'
}

enum Units {
  Elf    = 'ELF',
  Goblin = 'GOBLIN'
}

class Tile {
  constructor(c :string) {
    this.tile = c === '.'
      ? Tiles.Floor
      : Tiles.Wall;
  }
}

class Unit {
  hp      :number;
  atk     :number;
  type    :string;
  pos     :Pos;
  is_dead :boolean;

  constructor(c :string, y :number, x :number) {
    this.hp   = 200;
    this.atk  = 3;
    this.type = c === 'E' ? Units.Elf : Units.Goblin;
    this.pos  = {y, x};
    this.is_dead = false;
  }
}

class Battle {
  map   :string[][];
  units :Unit[];

  constructor(input :string[]) {
    this.map   = Array.from( Array(input.length), () => [] );
    this.units = [];
    
    input.forEach( (line, y) => {
      line.split('').forEach( (c, x) => {
        if(c === 'E' || c === 'G') {
          this.units.push( new Unit(c, y, x) );
          this.map[y].push( new Tile('.') );
        }
        else {
          this.map[y].push( new Tile(c) );
        }
      });
    });
  }

  get_unit(y :number, x :number) :Unit | undefined {
    const unit = this.units.filter(_=>!_.is_dead).filter( _ => _.pos.y === y && _.pos.x === x );
    return unit.length ? unit[0] : undefined;
  }

  alive_units() {
    return this.units.filter(_=>!_.is_dead);
  }

  sort_units() {
    return this.alive_units().sort( (u, _u) =>
      u.pos.y === _u.pos.y ? u.pos.x-_u.pos.x : u.pos.y-_u.pos.y
    );
  }

  dist_map(unit :Unit) {
    const manhattan = Array.from( Array(this.map.length), (_, y) =>
      this.map[y].map( (tile, x) =>
        tile.tile === Tiles.Wall ? Infinity : Math.abs(unit.pos.y - y) + Math.abs(unit.pos.x - x)
      )
    );

    const targets = {};this.alive_units().filter( _unit => unit.type !== _unit.type );
    
    console.log( manhattan.map(_=>_.map(_=>_ === Infinity ? '#' : _).join(' ')).join('\n') );
  }

  tick() {
    const units = this.sort_units();

    units.forEach( unit => {
      if(unit.type === Units.Elf) {
        const dist = this.dist_map(unit);
      }
    });
  }

  print() {
    const map = {
      [Tiles.Floor]  : '.',
      [Tiles.Wall]   : '#',
      [Units.Elf]    : 'E',
      [Units.Goblin] : 'G'
    };

    console.log(
      this.map.map( (row, y) =>
        row.map( (tile, x) => {
          const unit = this.get_unit(y, x);
          return map[ unit ? unit.type : tile.tile ] || tile.tile
        }).join(' ')
      ).join('\n')
    );
  }
}

function main() {
  const path   = 'input/__day_15.txt'; 
  const input  = Util.lines( Util.read_file(path) );
  const battle = new Battle(input);

  for(let i = 0; i < 1; i++) {
    battle.print();
    console.log();
    battle.tick();
    console.log();
    battle.print();
  }
}

main();

