/**
* Advent of Code 2017
* Day 3
*
* URL: http://adventofcode.com/2017/day/3
**/
import * as mathjs from 'mathjs';


function create_map(size :number) :number[][] {
    let arr = new Array(size);
    let i :number;
    
    for(i = 0; i < size; i++) {
        arr[i] = new Array(size).fill(0);
    }
    
    return arr;
}

function rotate(a) {
    const b = mathjs.complex(0, -1);
    
    const re =  a.re*b.re + a.im*b.im;
    const im = -a.re*b.im + a.im*b.re;
    
    return mathjs.complex(re, im);
}

/**
  +-------------------------------+
  | 37   36   35  34  33  32   31 |
  |    +---------------------+    |
  | 38 | 17   16  15  14  13 | 30 |
  |    |    +-----------+    |    |
  | 39 | 18 | 5    4  3 | 12 | 29 |                     
  |    |    |   +---+   |    |    |
  | 40 | 19 | 6 |  1  2 | 11 | 28 |
  |    |    |   +-------+    |    |
  | 41 | 20 | 7    8  9 * 10 | 27 |
  |    |    +----------------+    |
  | 42 | 21  22   23 24   25 * 26 |
  |    +--------------------------+
  | 43   44  45   46 47   48   49 * 50
  +-------------------------------------
**/
function measure_distance(target :number) :number {
    let dist     = 0;                       // Distance
    let line_pos = 0;                       // Relative line position
    let line_len = 0;                       // Line length
    let dir      = mathjs.complex(1, -1);   // Direction (re: horizontal, im: vertical);
    let axis     = true;

    for(let n = 1; n < target; n++) {
        dist += axis ? dir.im : dir.re;
        
        if(line_pos === line_len) {
            dir = rotate(dir);
            line_pos = 0;
            
            axis = !axis;
            if(axis) line_len++;
        }
        else {
            line_pos++;
        }
    }
    
    return Math.abs(dist);
}


/**
  +--------------------------+
  | 2   3   4   4  4   4   2 |  
  |   +-------------------   |
  | 4 | 2   3   4  4   2 | 3 |
  |   |   +----------+   |   |
  | 4 | 4 | 2   3  2 | 3 | 4 |
  |   |   |   +---+  |   |   |
  | 4 | 4 | 3 | 1  1 | 4 | 4 |
  |   |   |   +------+   |   |
  | 4 | 3 | 2   4  3 * 2 | 4 |
  |   |   +--------------+   |
  | 3 | 2   4   4  4   3 * 2 |
  |   +----------------------+
  | 2   4   4   4  4   4   3 * 2
  +-------------------------------
**/
// Get array of adjacent numbers
function adjacent_n(map :number[][], y :number, x :number) :number[] {
    return map[y-1].slice(x-1, x+2)
        .concat( map[y+1].slice(x-1, x+2) )
        .concat( map[y][x-1], map[y][x+1] );
}

// Sum all the adjacent numbers
function sum_adjacent(map :number[][], y :number, x :number) :number {
    return adjacent_n(map, y, x)
        .reduce( (acc, n) => acc+n );
}

function first_higher(target :number) :number {
    const map_size = 1000;
    let map      = create_map(map_size);
    let y        = 500;
    let x        = 500;
    let line_pos = 0;
    let line_len = 0;
    let n        = 1;
    let dir      = mathjs.complex(1, -1);
    let axis     = true;
    
    map[y][x] = 1;
    
    
    while(n <= target) {
        if(axis) y += dir.im;
        else     x += dir.re;
        
        n = map[y][x] = sum_adjacent(map, y, x);
        
        
        if(line_pos === line_len) {
            dir = rotate(dir);
            line_pos = 0;
            
            axis = !axis;
            if(axis) line_len++;
        }
        else {
            line_pos++;
        }
    }
    
    return n;
}

function main() :void {
    const input = 347991;
    
    const a = measure_distance(input);
    //const b = _measure_distance(0, 0, 0, 1, mathjs.complex(1, -1), true, input);
    const b = first_higher(input);
    
    console.log({first: a, second: b});
}


main();
