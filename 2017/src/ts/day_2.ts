/**
* Advent of Code 2017
* Day 2
*
* URL: http://adventofcode.com/2017/day/2
**/
import * as fs from 'fs';


function read_input(path :string) :number[][] {
    return fs.readFileSync(path, 'utf8')
        .trim()
        .split('\n')
        .map( (line) => line.split('\t').map( (n) => parseInt(n) ) );
}

// first part ( max - min )
function first(input :number[][]) :number {
    return input.map( (line) =>
        Math.max.apply(null, line) - Math.min.apply(null, line)
    )
    .reduce( (acc, n) => acc+n, 0 );
}

// second part ( a % b == 0 )
function second(input :number[][]) :number {
    return input.map( (line) => {
        const n = line.find( (_n) => line.some( (_m) => _n !== _m && _n % _m === 0 ) );
      const m = line.find( (_m) => <number>n !== _m && <number>n % _m === 0 );
      
      return <number>n/<number>m;
  })
  .reduce( (acc, n) => acc+n, 0 );
}

function main() :void {
    const input :number[][] = read_input('../../input/day_2.txt');
    
    const a :number = first(input);
    const b :number = second(input);
    
    console.log({ first: a, second: b });
}


main();
