// day 9
import * as fs from 'fs';


function read_input(path :string) :string[][] {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map( (line) => line.split(' ') );
}

function parse_input(input :string[][]) {
    let dist = {};
    
    for(let i = 0; i < input.length; i++) {
        if(dist[ input[i][0] ] === undefined) dist[ input[i][0] ] = {};
        if(dist[ input[i][2] ] === undefined) dist[ input[i][2] ] = {};
        
        dist[ input[i][0] ][ input[i][2] ] = parseInt(input[i][4]);
        dist[ input[i][2] ][ input[i][0] ] = parseInt(input[i][4]);
    }
    
    return dist;
}

function shortest_distance(dist, from :string, n :number, past :string[]) :number {
    switch(past.length === Object.keys(dist).length) {
        case true: return n;
        default: return Object.keys(dist[from]).map( (to) => {
            switch(past.includes(to)) {
                case true : return Infinity;
                default   : return shortest_distance(dist, to, n + dist[from][to], past.concat(to));
            }
        })
        .sort( (a, b) => a - b )[0];
    }
}

function longest_distance(dist, from :string, n :number, past :string[]) :number {
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

function find_shortest(dist) {
    let shortest = Infinity;
    
    for(const from in dist) {
        let d = shortest_distance(dist, from, 0, [from]);
        
        if(d < shortest) shortest = d;
    }
    
    return shortest;
}

function find_longest(dist) {
    let longest = 0;
    
    for(const from in dist) {
        let d = longest_distance(dist, from, 0, [from]);
        
        if(d > longest) longest = d;
    }
    
    return longest;
}

function main() :void {
    let input = read_input('input/day_9.txt');
    let dist  = parse_input(input);
    
    const a = find_shortest(dist);
    const b = find_longest(dist);
    
    console.log({ first: a, second: b });
}


main();
