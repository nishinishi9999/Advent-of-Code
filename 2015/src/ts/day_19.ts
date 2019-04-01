import * as Util from './util'

interface Rule {
  from :string;
  to   :string;
}

function parse_input(input :string[]) :[Rule[], string] {
  const rules = input.slice(0, -1).filter(Boolean).map( line => {
    const parts = line.split(' => ');
    return { from: parts[0], to: parts[1] };
  });

  return [rules, input.slice(-1)[0]];
}

function find_pos(rules :Rule[], molecule :string) :number {
  const pos :{ [propName :string] :boolean } = {};
  const parts = molecule.match(/[A-Z][a-z]*/g);

  if(!parts)
    throw "Couldnt split molecule";
  else {
    for(let i = 0; i < parts.length; i++) {
      const _parts = parts.slice();

      rules.filter( _ => _.from == parts[i] ).forEach( rule => {
        _parts[i] = rule.to;
        pos[ _parts.join('') ] = true;
      });
    }

    return Object.keys(pos).length;
  }
}

function main() :void {
  const input = Util.read_lines('../../input/day_19.txt');
  const [rules, molecule] = parse_input(input);

  const first = find_pos(rules, molecule);

  console.log({ first });
}

main();

