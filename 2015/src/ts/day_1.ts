// day 1
import * as fs from 'fs';


function read_input(path :string) :string[] {
    return fs.readFileSync(path, 'utf8')
        .split('');
}

function count_floor(input :string[]) :number {
    return input.filter( (c) => c == '(' ).length
        - input.filter( (c) => c == ')' ).length;
}

function basement(input :string[], n :number, i :number) :number {
    let map   = { '(': 1, ')': -1 };
    
    switch(n < 0) {
        case true : return i;
        default   : return basement(input, n + map[ input[i] ], i+1);
    }
}

function main() :void {
    let input = read_input('input/day_1.txt');
    
    const a = count_floor(input);
    const b = basement(input, 0, 0);
    
    console.log({ first: a, second: b });
}


main();
