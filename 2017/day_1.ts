/**
* Advent of Code 2017
* Day 1
*
* URL: http://adventofcode.com/2017/day/1
**/
import * as fs from 'fs';


function read_input(path :string) :number[] {
    return fs.readFileSync(path, 'utf8')
        .split('')
        .map( (n) => parseInt(n) );
}

function contiguous_sum(input :number[]) :number {
    return input.reduce( (acc, n, i) =>
        acc + (n === input[(i+1) % input.length] ? input[i] : 0)
    , 0 );
}

function halfway_sum(input :number[]) :number {
    const half = input.length/2;
    
    return input.reduce( (acc, n, i) =>
        acc + (n === input[(i+half) % input.length] ? input[i] : 0)
    , 0 );
}

function main() :void {
    const input = read_input('input/day_1.txt');
    
    const a = contiguous_sum(input);
    const b = halfway_sum(input);
    
    console.log({ first: a, second: b });
}


main();
