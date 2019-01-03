
import * as Util from './util';

class Cell {
  id    :number;
  power :number;
  mem   : { [propName :number] :number };

  constructor(x, y) {
    this.id    = x+11;
    this.power = this.id * (y+1);
    this.mem_diag = {};
    this.mem_up   = {};
    this.mem_left = {};
  }
}

function create_map() :Cell[][] {
  return Array(300).fill(0).map( (_, y) =>
    Array(300).fill(0).map( (_, x) =>
      new Cell(x, y)
    )
  );
}

function set_power(map :Cell[][], serial_n :number) {
  map.forEach( (row, y) =>
    row.forEach( (cell, x) => {
      cell.power += serial_n;
      cell.power *= cell.id;
      cell.power  = cell.power > 99 ? parseInt( cell.power.toString().substr(-3, 1) ) : 0;
      cell.power -= 5;

      cell.mem_diag[0] = cell.power;
    })
  );

  for(let y = 0; y < map.length; y++) {
    for(let x = 0; x < map[y].length; x++) {
      let power = map[y][x].power;
      map[y][x].mem_up[0]   = power;
      map[y][x].mem_left[0] = power;

      if(y && x) {
        for(let diff = 1; diff <= y; diff++)
          map[y][x].mem_up[diff]   = power + map[y-1][x].mem_up[diff-1];
        for(let diff = 1; diff <= x; diff++) 
          map[y][x].mem_left[diff] = power + map[y][x-1].mem_left[diff-1];
      }
    }
  }
}

function first(map :Cell[][]) :string {
  let max = 0;
  let corner_y, corner_x;

  for(let y = 0; y < map.length-2; y++) {
    for(let x = 0; x < map.length-2; x++) {
      const power =
        map[y  ][x].power + map[y  ][x+1].power + map[y  ][x+2].power
      + map[y+1][x].power + map[y+1][x+1].power + map[y+1][x+2].power
      + map[y+2][x].power + map[y+2][x+1].power + map[y+2][x+2].power;
      
      if(power > max) {
        max = power;
        corner_y = y+1;
        corner_x = x+1;
      }
    }
  }

  return `${corner_x},${corner_y}`;
}

/*
 * -2  -4   4   4   4
 * -4   4   4   4  -5
 *  4   3   3   4  -4
 *  1   1   2   4  -3
 * -1   0   2  -5  -2
 */

function second(map :Cell[][]) :string {
  let max = 0;
  let max_size;
  let corner_y, corner_x;

  for(let y = 1; y < map.length; y++) {
    console.log(y);

    for(let x = 1; x < map[y].length; x++) {
      const cell = map[y][x]
      const corner = map[y-1][x-1];

      for(let size = 1; size < y; size++) {
        let power = corner.mem_diag[size-1]
          + cell.mem_up[size] - cell.power
          + cell.mem_left[size] - cell.power;
          
        cell.mem_diag[size] = power;

        if(power > max) {
          corner_y = y-size;
          corner_x = x-size;
          max_size = size + 1;
        }
      }
    }
  }

  return `${corner_x},${corner_y},${max_size}`;
}

function main() {
  const serial_n = 18;
  //const serial_n = parseInt( Util.read_file('./input/day_11.txt') );
  const map = create_map();
  set_power(map, serial_n);

  console.log( map[0][1] );
  console.log( map[1][1] );
  console.log( map[2][1] );

  //console.log( 'First:', first(map) );
  console.log( 'Second:', second(map) );
}

main();

