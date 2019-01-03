
import * as Util from './util';


interface Rule {
  rule :boolean[];
  to   :boolean;
}

interface Rules {
  [propName :string] :Rule[]
}


class Cell {
  state  :boolean;
  _state :boolean;
  index  :number
  constructor(initial_state :boolean, index :number) {
    this.state  = initial_state;
    this._state = false;
    this.index  = index;
  }
}


function parse_input(input :string[], len :number) {
  const cells = Array(len).fill(0).map( (_, i) => new Cell(false, i-len/2) );

  input[0].substr(15).split('').forEach( (c, i) => {
    cells[ i+len/2 ].state = c === '#'
  });

  const rules = {
    dead  : [],
    alive : []
  }

  input.slice(1).forEach( line => {
    const [rule, to] = line.split(' => ');
    const is_alive    = rule[2] === '#';
    const _rule = {
      rule : (rule.substr(0, 2) + rule.substr(3)).split('').map( c => c === '#' ),
      to   : to === '#'
    };

    if( is_alive )
      rules.alive.push(_rule);
    else
      rules.dead.push(_rule);
  });


  return [cells, rules];
}

function get_rule(cells :Cell[], i :number, rules :Rules) :Rule | undefined {
  const neighbors = [ cells[i-2], cells[i-1], cells[i+1], cells[i+2] ].map(_=>_.state);
  const subrules  = cells[i].state ? rules.alive : rules.dead;
  const rule = subrules.find( subrule =>
    subrule.rule.every( (b, i) => b === neighbors[i] )
  );

  return rule;
}

function gen(cells :Cell[], rules :Rules) {
  for(let i = 2; i < cells.length-2; i++) {
    const rule = get_rule(cells, i, rules);
    //console.log(cells[i].index, rule);
    
    if(rule)
      cells[i]._state = rule.to;
    else
      cells[i]._state = false;
  }

  for(let i = 2; i < cells.length-2; i++)
    cells[i].state = cells[i]._state;
}

function simulate(input :string[], itr_n :number, len :number) :number {
  const [cells, rules] = parse_input(input, len);

  for(let i = 0; i < itr_n; i++)
    gen(cells, rules);

  return cells.reduce( (acc, cell) => cell.state ? acc + cell.index : acc, 0 );
}

function main() {
  const path  = './input/day_12.txt';
  const input = Util.format_as_strings( Util.read_file(path) );

  const _first  = simulate(input, 20, 2000);
  const _second = simulate(input, 50000, 2000);
  console.log('First:', _first);
  console.log('Second:', _second);
}

main();

