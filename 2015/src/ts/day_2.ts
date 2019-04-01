import * as Util from './util'

function parse_input(input :string[]) :number[][] {
  return input.map( line => line.split('x').map(Number) );
}

function square_feet(l :number, w :number, h :number) :number {
  return 2*l*w + 2*w*h + 2*h*l;
}

function smallest_area(l :number, w :number, h :number) :number {
  const sort = [l, w, h].sort( (a, b) => a-b );
  return sort[0]*sort[1];
}

function smallest_perimeter(l :number, w :number, h :number) :number {
  const sort = [l, w, h].sort( (a, b) => a-b );
  return sort[0]*2 + sort[1]*2;
}

function cubic_feet(l :number, w :number, h :number) :number {
  return l*w*h;
}

function total_square_feet(input :number[][]) :number {
  return input.map( ([l, w, h]) =>
    square_feet(l, w, h) + smallest_area(l, w, h)
  )
  .reduce( (acc, n) => acc + n, 0 );
}

function total_ribbon_feet(input :number[][]) :number {
  return input.map( ([l, w, h]) =>
    smallest_perimeter(l, w, h) + cubic_feet(l, w, h)
  )
  .reduce( (acc, n) => acc + n, 0 );
}

function main() :void {
  const input = Util.read_lines('../../input/day_2.txt');
  const d = parse_input(input);
   
  const first  = total_square_feet(d);
  const second = total_ribbon_feet(d);
  
  console.log({ first, second });
}

main();

