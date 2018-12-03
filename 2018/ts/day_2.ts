
import * as Util from './util';

function count_letters(str :string) :number[] {
  const letters = str.split('');
  const occur   = [...new Set(str)].map( l => letters.filter(_=>_===l).length );
  return [ occur.includes(2)?1:0, occur.includes(3)?1:0 ];
}

function sum_occur([a, b] :number[], [_a, _b] :number[]) :number[] {
  return [ a+_a, b+_b ];
}

function checksum(acc :number, n :number) :number {
  return acc*n;
}

function first(input :string[]) :number {
  return input.map(count_letters).reduce(sum_occur, [0, 0]).reduce(checksum);
}

function are_correct(n :number) :boolean {
  return n === 1;
}

function diff(a :string, b :string) :number {
  return a.split('').map( (_, i) => <number>(a[i] !== b[i] ? 1 : 0) ).reduce( (acc, n) => acc+n );
}

function common_letters(a :string, b :string) :string {
  return a.split('').filter( (_, i) => a[i] === b[i]).join('');
}

function second(input :string[]) :string {
  for(let i = 0; i < input.length; i++)
    for(let j = i+1; j < input.length; j++)
      if( are_correct( diff(input[i], input[j]) ) )
        return common_letters(input[i], input[j]);

  return '';
}

function main() :void {
  const path  = 'input/day_2.txt';
  const input = Util.format_as_strings( Util.read_file(path) );

  const [_first, _second] = [ first(input), second(input) ];
  
  console.log('First:', _first);
  console.log('Second:', _second);
}

main();

