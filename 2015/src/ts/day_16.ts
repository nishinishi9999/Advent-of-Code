import * as Util from './util'

interface Grandma {
  children    :number;
  cats        :number;
  samoyeds    :number;
  pomeranians :number;
  vizslas     :number;
  goldfish    :number;
  trees       :number;
  cars        :number;
  perfumes    :number;
  [propName :string] :number;
}

function parse_input(input :string[]) :Grandma[] {
  return input.map( line => {
    const attrs   = line.match(/(\w+) (\d+)|(\w+): (\d+)/g);
    if(!attrs) throw 'Couldn\'t parse input'

    const grandma :Grandma = {
        children    : -1,
        cats        : -1,
        samoyeds    : -1,
        pomeranians : -1,
        vizslas     : -1,
        goldfish    : -1,
        trees       : -1,
        cars        : -1,
        perfumes    : -1
    }
    
    for(let i = 1; i < attrs.length; i++) {
      const [attr, val] = attrs[i].split(': ');
      grandma[attr] = parseInt(val);
    }
    
    return grandma;
  });
}

function is_subset(a :Grandma, b :Grandma) :boolean {
  return Object.keys(a).every( (key) =>
    a[key] === -1 || a[key] === b[key]
  );
}

function is_sue(a :Grandma, b :Grandma) :boolean {
  return Object.keys(a).every( (key) => {
    switch(key) {
      case 'cats'       :
      case 'trees'      : return a[key] === -1 || b[key]   < a[key];
      case 'pomeranians':
      case 'goldfish'   : return a[key] === -1 || b[key]   > a[key];
      default           : return a[key] === -1 || b[key] === a[key];
    }
  });
}

function find_grandma(grandma :Grandma[], target :Grandma, i :number) :number {
  if(i == grandma.length) return -1;
  
  if ( is_subset(grandma[i], target) )
    return i + 1;
  else
    return find_grandma(grandma, target, i+1);
}

function _find_grandma(grandma :Grandma[], target :Grandma, i :number) :number {
  if(i == grandma.length) return -1;
  
  if ( is_sue(grandma[i], target) )
    return i + 1;
  else
    return _find_grandma(grandma, target, i+1);
}

function main() :void {
  const input   = Util.read_lines('../../input/day_16.txt');
  const grandma = parse_input(input);
  
  const target = {
    children    : 3,
    cats        : 7,
    samoyeds    : 2,
    pomeranians : 3,
    akitas      : 0,
    vizslas     : 0,
    goldfish    : 5,
    trees       : 3,
    cars        : 2,
    perfumes    : 1
  };
  
  
  const first  =  find_grandma(grandma, target, 0);
  const second = _find_grandma(grandma, target, 0);
  
  console.log({ first, second });
}

main();

