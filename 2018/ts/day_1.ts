
import * as Util      from './util'
import { NumberJSON } from './util'


// Not immutable!
interface Repeated {
  found :boolean,
  n     :number,
  past  :NumberJSON
}

function first_repeated(acc :Repeated, n :number) :Repeated {
  const m = acc.n+n;
  
  if( acc.found )
    return acc;
  else if( acc.past[m] )
    return Object.assign(acc, { n: m, found: true });
  else
    return Object.assign(acc, { n: m, past: Object.assign(acc.past, Util.inc_key(acc.past, m)) });
}

function first(xs :number[]) :number {
  return xs.reduce( (acc, n) => acc + n );
}

function second(xs :number[], acc :Repeated) :number {
  const _acc = xs.reduce(first_repeated, acc);

  if(_acc.found)
    return _acc.n;
  else
    return second(xs, _acc);
}

function main() :void {
  const path  = 'input/day_1.txt';
  const input = Util.format_as_numbers( Util.read_file(path) );

  const def_acc = {
    found : false,
    n     : 0,
    past  : {}
  };

  console.log('First:',  first(input) );
  console.log('Second:', second(input, def_acc) );
}

main();

