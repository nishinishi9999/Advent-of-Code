/**
* Advent of Code 2017
* Day 5
*
* URL: http://adventofcode.com/2017/day/5
**/
import * as fs from 'fs';


function read_input(path :string) :number[] {
    return fs.readFileSync(path, 'utf8')
        .split('\n')
        .map( (n) => parseInt(n) );
}

function first(input :number[]) :number {
    let _input = input.slice();
    let n      = 0;
    let temp :number;
    
    for(let i = 0; i < _input.length; n++, i += temp) {
        temp = _input[i];
        
        _input[i]++;
    }
    
    return n-1;
}

function second(input :number[]) :number {
    let _input = input.slice();
    let n      = 0;
    let temp :number;
    
    for(let i = 0; i < _input.length; n++, i += temp) {
        temp = _input[i];
        
        _input[i] += _input[i] >= 3 ? -1 : 1;
    }
    
    return n-1;
}

function main() :void {
    const input :number[] = read_input('../../input/day_5.txt');
    
    const a :number = first(input);
    const b :number = second(input);
    
    console.log({ first: a, second: b });
}


main();
