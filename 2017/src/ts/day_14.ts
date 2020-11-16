/**
* Advent of Code 2017
* Day 14
*
* URL: http://adventofcode.com/2017/day/14
**/
import * as knot from './day_10';


function hex_to_bin(hex :string) :string {
    return hex.split('')
        .map( (n) => parseInt(n, 16).toString(2).padStart(4, '0') )
        .join('');
}

function bit_map(input :string) :string[] {
    const round_n = 128;
    
    return Array(round_n).fill(0).map( (_, i) =>
        hex_to_bin(
            knot._hash( knot.parse_to_bytes( `${input}-${i.toString()}` ) )
        )
    );
}

function used_n(input :string) :number {
    return bit_map(input)
        .join('').split('')
        .reduce( (acc, n) => n === '1' ? acc+1 : acc, 0 );
}

function set_contiguous(map :number[][], y :number, x :number, n :number) {
    map[y][x] = n;
    
    if(map[y-1]    !== undefined && map[y-1][x] === 1) set_contiguous(map, y-1, x, n);
    if(map[y+1]    !== undefined && map[y+1][x] === 1) set_contiguous(map, y+1, x, n);
    if(map[y][x-1] !== undefined && map[y][x-1] === 1) set_contiguous(map, y, x-1, n);
    if(map[y][x+1] !== undefined && map[y][x+1] === 1) set_contiguous(map, y, x+1, n);
}

function contiguous_n(input :string) :number {
    const len = 128;
    let n     = 2;
    
    let map = bit_map(input)
        .map( (line) => line.split('')
            .map( (_n) => parseInt(_n) )
        );
    
    for(let y = 0; y < len; y++) {
        for(let x = 0; x < len; x++) {
            if(map[y][x] === 1) {
                set_contiguous(map, y, x, n);
                n++;
            }
        }
    }
    
    // To make out for 0 and 1
    return n-2;
}

function main() {
    //const input = 'flqrgnkx';
    const input = 'wenycdww';
    
    const a = used_n(input);
    const b = contiguous_n(input);
    
    console.log({ first: a, second: b });
}


main();
