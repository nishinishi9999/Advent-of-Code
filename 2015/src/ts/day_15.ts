import * as Util from './util'

function parse_input(input :string[]) :number[][] {
  const properties :number[][] = [];
  
  input.forEach( line => {
    const _properties :number[] = [];
    const parts = line.split(': ');
    
    for( const prop of parts[1].split(', ') ) {
      const arr = prop.split(' ');
      _properties.push( parseInt(arr[1]) );
    }

    properties.push(_properties);
  });
    
  return properties;
}

function sum_prop(properties :number[][], i :number, spoons :number[]) :number {
  let res = 0;

  for(let j = 0; j < properties.length; j++)
    res += properties[j][i] * spoons[j];

  return Math.max(0, res);
}

function sum_props(properties :number[][], spoons :number[]) {
  let res = 1;

  for(let i = 0; i < properties[0].length-1; i++)
    res *= sum_prop(properties, i, spoons);

  return res;
}

function search_highest(
  properties :number[][],
  i          :number,
  spoons     :number[],
  max_spoons :number) :number[] {

  // 222870, 117936
  if(i === spoons.length) {
    if(max_spoons === 0) {
      const n       = sum_props(properties, spoons);
      const hasCals = sum_prop(properties, 4, spoons) === 500;

      return [ n, hasCals ? n : 0 ];
    }
    else
      return [0, 0];
  }
  else {
    let high_n = 0;
    let high_m = 0;
    
    for(let j = 0; j <= max_spoons; j++) {
      spoons[i] = j;
      let [n, m] = search_highest(properties, i+1, spoons, max_spoons - j);
      spoons[i] = 0;
      
      if(n > high_n)
        high_n = n;
      if(m > high_m)
        high_m = m;
    }
    
    return [high_n, high_m];
  }
}

function main() :void {
  const input      = Util.read_lines('../../input/day_15.txt');
  const properties = parse_input(input);
  
  const def_i      = 0;
  const max_spoons = 100;
  const spoons     = Array(properties[0].length-1).fill(0);

  const [first, second] = search_highest(properties, def_i, spoons, max_spoons);
  
  console.log({ first, second });
}

main();

