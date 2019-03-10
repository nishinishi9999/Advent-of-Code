
import * as Util from './util';
import {StringJSON} from './util';


function get_pairs() {
  const lc = 'abcdefghijklmnopqrstuvwxyz';
  const uc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const pairs = {};

  for(let i = 0; i < lc.length; i++) {
    pairs[ lc[i] ] = uc[i];
    pairs[ uc[i] ] = lc[i];
  }

  return pairs;
}

function remove_pairs(str :string, pairs :StringJSON) :string {
  let _str = '';

  for(let i = 0; i < str.length; i++) {
    if( str[i+1] !== pairs[ str[i] ] )
      _str += str[i];
    else
      i++;
  }

  return _str === str ? str : remove_pairs(_str, pairs);
}

function first(str :string, pairs :StringJSON) :number {
  return remove_pairs(str, pairs).length;
}

function second(str :string, pairs :StringJSON) :number {
  return 'abcdefghijklmnopqrstuvwxyz'.split('').map( c => {
    const regex = new RegExp( `[${c}${pairs[c]}]`, 'g' );
    return remove_pairs( str.replace(regex, ''), pairs ).length;
  }).sort( (a, b) => a-b )[0];
}

function main() {
  const input = Util.read_file('../input/day_5.txt');
  const pairs = get_pairs();

  const [_first, _second] = [first(input, pairs), second(input, pairs)];
  console.log('First:', _first);
  console.log('Second:', _second);
}

main();

