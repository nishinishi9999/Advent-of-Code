/**
* Advent of Code 2017
* Day 4
*
* URL: http://adventofcode.com/2017/day/4
**/
import * as fs from 'fs';


function read_input(path :string) :string[][] {
    return fs.readFileSync(path, 'utf8')
        .split('\n')
        .map( (line) => line.split(' ') );
}

function sort_str(str :string) :string {
    return str.split('').sort().join('');
}

function valid_n(input :string[][]) :number {
    return input.length - input.filter( (line) =>
        line.some( (a, i) => line.some( (b, j) => i !== j && a === b ) )
    ).length-1;
}

function valid_n_anagrams(input :string[][]) :number {
    return input.length - input.filter( (line) =>
        line.some( (a, i) => line.some( (b, j) => i !== j && sort_str(a) === sort_str(b) ) )
    ).length-1;
}

function main() :void {
    const input = read_input('../../input/day_4.txt');
  console.log(input);
    
    const a = valid_n(input);
    const b = valid_n_anagrams(input);
    
    console.log({ first: a, second: b });
}


main();
