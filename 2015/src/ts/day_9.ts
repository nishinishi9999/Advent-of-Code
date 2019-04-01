import * as Util from './util'

interface I_2DNumberJSON {
  [propName :string] :{
    [propName :string] :number
  }
}

function parse_input(input :string[]) :I_2DNumberJSON {
  let dist :I_2DNumberJSON = {};
  
  input.forEach( line => {
    const parts = line.split(' ');
    const [a, b, _dist] = [ parts[0], parts[2], parts[4] ];

    if(dist[a] === undefined)
      dist[a] = {};
    if(dist[b] === undefined)
      dist[b] = {};
    
    dist[a][b] = parseInt(_dist);
    dist[b][a] = parseInt(_dist);
  });
  
  return dist;
}

function shortest_distance(dist :I_2DNumberJSON, from :string, n :number, past :string[]) :number {
  switch(past.length === Object.keys(dist).length) {
    case true : return n;
    default   : return Object.keys(dist[from]).map( (to) => {
      switch(past.includes(to)) {
        case true : return Infinity;
        default   : return shortest_distance(dist, to, n + dist[from][to], past.concat(to));
      }
    })
    .sort( (a, b) => a - b )[0];
  }
}

function longest_distance(dist :I_2DNumberJSON, from :string, n :number, past :string[]) :number {
  switch(past.length === Object.keys(dist).length) {
    case true: return n;
    default: return Object.keys(dist[from]).map( (to) => {
      switch(past.includes(to)) {
        case true : return 0;
        default   : return longest_distance(dist, to, n + dist[from][to], past.concat(to));
      }
    })
    .sort( (a, b) => b - a )[0];
  }
}

function find_shortest(dist :I_2DNumberJSON) :number {
  let shortest = Infinity;
  
  for(const from in dist) {
    const d = shortest_distance(dist, from, 0, [from]);
    
    if(d < shortest)
      shortest = d;
  }
  
  return shortest;
}

function find_longest(dist :I_2DNumberJSON) :number {
  let longest = 0;
  
  for(const from in dist) {
    const d = longest_distance(dist, from, 0, [from]);
    
    if(d > longest)
      longest = d;
  }
  
  return longest;
}

function main() :void {
  const input = Util.read_lines('../../input/day_9.txt');
  const dist  = parse_input(input);
  
  const first  = find_shortest(dist);
  const second = find_longest(dist);
  
  console.log({ first, second });
}


main();

