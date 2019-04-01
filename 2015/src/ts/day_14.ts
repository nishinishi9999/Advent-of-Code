import * as Util from './util'

interface Reindeer {
  v       :number;
  pos     :number;
  fly_t   :number;
  rest_t  :number;
  counter :number;
  resting :boolean;
  points  :number;
  [propName :string] :any
}

interface Reindeers {
  [propName :string] :Reindeer;
}

function parse_input(input :string[]) :Reindeers {
  const reindeer :Reindeers = {};
  
  input.forEach( line => {
    const parts = line.substr(0, line.length-1).split(' ');

    reindeer[ parts[0] ] = {
      v       : parseInt( parts[3] ),
      pos     : 0,
      fly_t   : parseInt( parts[6] ),
      rest_t  : parseInt( parts[ parts.length-2 ] ),
      counter : parseInt( parts[6] ),
      resting : false,
      points  : 0
    };
  });
  
  return reindeer;
}

function clone_reindeers(reindeers :Reindeers) :Reindeers {
  const _reindeers :Reindeers = {};
  
  for(const key in reindeers)
    _reindeers[key] = Object.assign({}, reindeers[key]);
  
  return _reindeers;
}

function next_second(reindeers :Reindeers) :Reindeers {
  const _reindeers :Reindeers = clone_reindeers(reindeers);
  
  for(const name in _reindeers) {
    const reindeer = _reindeers[name];
    
    reindeer.counter--;
    
    if(!reindeer.resting) {
        reindeer.pos += reindeer.v;
        
        if(reindeer.counter === 0) {
            reindeer.counter = reindeer.rest_t;
            reindeer.resting = true;
        }
    }
    else {
        if(reindeer.counter === 0) {
            reindeer.counter = reindeer.fly_t;
            reindeer.resting = false;
        }
    }
  }
  
  return _reindeers;
}

function leading_reindeer(reindeers :Reindeers, sort_by :string) :string[] {
  const sort = Object.keys(reindeers).sort( (a, b) =>
    reindeers[b][sort_by] - reindeers[a][sort_by]
  );
  
  // All reindeers tied with the first (including itself)
  return sort.filter( name =>
    reindeers[name][sort_by] === reindeers[ sort[0] ][sort_by]
  );
}

function increment_points(reindeers :Reindeers) :Reindeers {
  const _reindeers = clone_reindeers(reindeers);
  
  for( const name of leading_reindeer(_reindeers, 'pos') )
    _reindeers[name].points++;
  
  return _reindeers;
}

function winning_reindeer(reindeers :Reindeers, round_n :number) :number {
  let _reindeers = clone_reindeers(reindeers);
  
  for(let i = 0; i < round_n; i++)
    _reindeers = next_second(_reindeers);
  
  return _reindeers[ leading_reindeer(_reindeers, 'pos')[0] ].pos;
}

function _winning_reindeer(reindeers :Reindeers, round_n :number) :number {
  let _reindeers = clone_reindeers(reindeers);
  
  for(let i = 0; i < round_n; i++)
    _reindeers = increment_points( next_second(_reindeers) );
  
  return _reindeers[ leading_reindeer(_reindeers, 'points')[0] ].points;
}

function main() :void {
  const input     = Util.read_lines('../../input/day_14.txt');
  const reindeers = parse_input(input);
  const round_n   = 2503;
  
  const first  =  winning_reindeer(reindeers, round_n);
  const second = _winning_reindeer(reindeers, round_n);
  
  console.log({ first, second });
}


main();
