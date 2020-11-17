/**
* Advent of Code 2017
* Day 24
*
* URL: http://adventofcode.com/2017/day/24
**/
import * as fs from 'fs';


function read_input(path :string) :number[][] {
    return fs.readFileSync(path, 'utf8')
        .split('\n')
        .map( (line) => line.split('/')
            .map( (n) => parseInt(n) )
        );
}

function has_parent(input :number[][], parent :number, past :string[]) {
    for(let i = 0; i < input.length; i++) {
        if( input[i].includes(parent) && !past.includes( input[i].join() ) ) {
            return true;
        }
    }
    
    return false;
}

// @ts-ignore
function strongest_path(input :number[][], parent :number, s :number, past :string[]) {
    switch( has_parent(input, parent, past) ) {
        case false: return s;
        default: {
            return input.filter( (arr) => arr.includes(parent) && !past.includes(arr.join()) )
                .map( (arr) => {
                    const pair = arr[0] === parent ? arr[1] : arr[0];
                    
                    return strongest_path( input, pair, s + parent + pair, past.concat( arr.join() ) );
                })
                .sort( (a, b) => b-a )[0];
        }
    }
}

function sort_by_length(arr_a :string[], arr_b :string[]) :number {
    return arr_b[1] === arr_a[1]
        // @ts-ignore
        ? arr_b[0] - arr_a[0]
        // @ts-ignore
        : arr_b[1] - arr_a[1];
}

function longest_path(input :number[][], parent :number, s :number, len :number, past :string[]) :number[] {
    switch( has_parent(input, parent, past) ) {
        case false: return [s, len];
        default: {
            return input.filter( (arr) => arr.includes(parent) && !past.includes( arr.join() ) )
                .map( (arr) => {
                    const pair = arr[0] === parent ? arr[1] : arr[0];
                    
                    return longest_path( input, pair, s + parent + pair, len+1, past.concat( arr.join() ) );
                })
                // @ts-ignore
                .sort(sort_by_length)[0];
        }
    }
}

function main() :void {
    let input = read_input('../../input/day_24.txt');

    const a = strongest_path(input, 0, 0, []);
    const b = longest_path(input, 0, 0, 0, []);
    
    console.log({ first: a, second: b });
}


main();
