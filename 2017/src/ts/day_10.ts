/**
* Advent of Code 2017
* Day 10
*
* URL: http://adventofcode.com/2017/day/10
**/
import * as fs from 'fs';


interface HashJSON {
    hash : number;
    map  : number[];
    pos  : number;
    skip : number;
}


// Initialization functions

function read_input(path :string) :string {
    return fs.readFileSync(path, 'utf8');
}

export function parse_to_numbers(input :string) :number[] {
    return input.split(',')
        .map( (n) => parseInt(n) );
}

export function parse_to_bytes(input :string) :number[] {
    return input.split('')
        .map( (c) => c.charCodeAt(0) );
}


export function init_map(len :number) :number[] {
    return Array(len).fill(0).map( (_, i) => i );
}

// hash functions

// Reverse a subarray
function sub_reverse(map :number[], pos :number, length :number) :number[] {
    let _map = map.slice();
    let to :number;
    
    for(let i = pos, dist = length-1; dist > 0; i = (i+1) % map.length, dist -= 2) {
        to = (i+dist) % map.length;
        
        [ _map[i], _map[to] ] = [ _map[to], _map[i] ];
    }
    
    return _map;
}

function hash(map :number[], lengths :number[], pos :number, skip :number) :HashJSON {
    let _map = map.slice();
    
    for(let i = 0; i < lengths.length; i++, skip++) {
        _map = sub_reverse(_map, pos, lengths[i]);
        
        pos = (pos + lengths[i] + skip) % _map.length;
    }
    
    return { hash: _map[0] * _map[1], map: _map, pos: pos, skip: skip };
}

// Convert numerical array to hexadecimal string
function arr_to_hex_str(arr :number[]) {
    return arr.map( (n) => n.toString(16).padStart(2, '0') )
        .join('');
}

function knot_hash(map :number[]) :string {
    let blocks = new Array(16);
    
    for(let i = 0; i < 16; i++) {
        blocks[i] = map[i*16];
        
        for(let j = 1; j < 16; j++) {
            blocks[i] ^= map[i*16 + j];
        }
    }
    
    return arr_to_hex_str(blocks);
}

export function _hash(lengths :number[]) :string {
    const round_n     = 64;
    let map           = init_map(256);
    let ascii_lengths = lengths.concat([ 17, 31, 73, 47, 23 ]);
    let pos           = 0;
    let skip          = 0;
    let res :HashJSON;
    
    for(let i = 0; i < round_n; i++) {
        res = hash(map, ascii_lengths, pos, skip);
        
        map  = res.map;
        pos  = res.pos;
        skip = res.skip;
    }
    
    return knot_hash(map);
}

function main(asModule :boolean) :void {
    if(asModule) return;  

    const input = read_input('../../input/day_10.txt');
    const map   = init_map(256);
    
    const a = hash(map, parse_to_numbers(input), 0, 0).hash;
    const b = _hash(parse_to_bytes(input));
    
    console.log({ first: a, second: b });
}


main(true);
