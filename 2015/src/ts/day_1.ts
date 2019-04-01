import * as Util from './util'

const pool :Util.NumberJSON = { '(': 1, ')': -1 };

function last_floor(input :string[]) :number {
  return input.reduce( (acc, c) => acc + pool[c], 0 );
}

function basement(input :string[]) :number {
  return input.reduce( (acc, c, i) => {
    return acc[0] == -1 ? acc : [acc[0]+pool[c], i+1];
  }, [0, 0])[1];
}

function main() :void {
  const input = Util.read_chars('../../input/day_1.txt');
  
  const first  = last_floor(input);
  const second = basement(input);
  
  console.log({ first, second });
}

main();

