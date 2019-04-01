import * as Util from './util'

function next_pos(c :string, y :number, x :number) :number[] {
  switch(c) {
    case '<': return [y, x-1];
    case '>': return [y, x+1];
    case '^': return [y-1, x];
    case 'v': return [y+1, x];
    default: throw Error('Incorrect direction: ' + c);
  }
}

function house_n(input :string[], santa_n :number) :number {
  const houses :Util.NumberJSON = { '0,0': 1 }
  
  // Initialize house map
  const santa = new Array(santa_n).fill(0).map( i => ({
      y: 0,
      x: 0,
  }));
  
  for(let i = 0, turn = 0; i < input.length; i++, turn = (turn+1) % santa_n) {
    [ santa[turn].y, santa[turn].x ] =
      next_pos(input[i], santa[turn].y, santa[turn].x);
    
    const key = `${santa[turn].y},${santa[turn].x}`;
    houses[key] = (houses[key]||0) + 1;
  }
  
  return Object.keys(houses).length;
}

function main() :void {
  const input = Util.read_chars('../../input/day_3.txt');
  
  const first  = house_n(input, 1);
  const second = house_n(input, 2);
  
  console.log({ first, second });
}

main();

