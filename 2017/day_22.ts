/**
* Advent of Code 2017
* Day 22
*
* URL: http://adventofcode.com/2017/day/22
**/
import * as fs from 'fs';


interface StateJSON {
    map           :string[][];
    y             :number;
    x             :number;
    dir           :string;
    has_infected  :boolean;
    node_clean    :string;
    node_infected :string;
    node_weakened :string;
    node_flagged  :string;
}


function read_input(path :string) :string[][] {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map( (line) => line.split('') );
}

function parse_input(input :string[][]) :StateJSON {
    let map = new Array(1000);
    for(let i = 0; i < 1000; i++) map[i] = new Array(1000).fill('.');
    
    const y_offset = 500;
    const x_offset = 500;
    const y_center = y_offset + Math.ceil(input.length/2) - 1;
    const x_center = x_offset + Math.ceil(input[0].length/2) - 1;
    
    for(let y = 0; y < input.length; y++) {
        for(let x = 0; x < input[y].length; x++) {
            map[ y+y_offset ][ x+x_offset ] = input[y][x];
        }
    }
    
    return {
        map           : map,
        y             : y_center,
        x             : x_center,
        dir           : 'up',
        has_infected  : false,
        node_clean    : '.',
        node_infected : '#',
        node_weakened : 'W',
        node_flagged  : 'F'
    };
}

// Destructive behaviour!
function set_key(s :StateJSON, key :string, val :string | number | boolean) :StateJSON {
    s[key] = val;
    
    return s;
}

function set_dir(s :StateJSON, dir :string) :StateJSON {
    return set_key(s, 'dir', dir);
}

function set_y(s :StateJSON, y :number) :StateJSON {
    return set_key(s, 'y', y);
}
function set_x(s :StateJSON, x :number) :StateJSON {
    return set_key(s, 'x', x);
}
function set_infected(s :StateJSON, has_infected :boolean) :StateJSON {
    return set_key(s, 'has_infected', has_infected);
}

// Destructive behaviour!
function set_map(s :StateJSON, val :string) :StateJSON {
    s.map[s.y][s.x] = val;
    
    return s;
}

function rotate(s :StateJSON, rot_dir :boolean) :StateJSON {
    let dirs = ['up', 'right', 'down', 'left'];
    
    switch(rot_dir) {
        // Right
        case true: return set_dir(s, dirs[ (dirs.indexOf(s.dir)+1) % dirs.length ]);
        // Left
        default: {
            const dir_i = dirs.indexOf(s.dir)-1;
            
            return set_dir(s, dir_i < 0 ? dirs[dirs.length+dir_i] : dirs[dir_i]);
        }
    }
}

function infection_phase(s :StateJSON) :StateJSON {
    switch(s.map[s.y][s.x]) {
        case s.node_clean: return set_infected(
            set_map( rotate(s, false), s.node_infected ),
            true
        );
        default: return set_infected(
            set_map( rotate(s, true), s.node_clean ),
            false
        );
    }
}

function _infection_phase(s :StateJSON) :StateJSON {
    switch(s.map[s.y][s.x]) {
        case s.node_clean: return set_infected(
            set_map( rotate(s, false), s.node_weakened ),
            false
        );
        case s.node_infected: return set_infected(
            set_map( rotate(s, true), s.node_flagged ),
            false
        );
        case s.node_weakened: return set_infected(
            set_map(s, s.node_infected),
            true
        );
        case s.node_flagged: return set_infected(
            set_map( rotate( rotate(s, true), true ), s.node_clean ),
            false
        );
        default: throw Error('Invalid node: ' + s.map[s.y][s.x]);
    }
}

function move_forward(s :StateJSON) :StateJSON {
    switch(s.dir) {
        case 'up'    : return set_y(s, s.y-1);
        case 'down'  : return set_y(s, s.y+1);
        case 'left'  : return set_x(s, s.x-1);
        case 'right' : return set_x(s, s.x+1);
        default: throw Error('Invalid direction: ' + s.dir);
    }
}

function next_tick(s :StateJSON, evolved_mode :boolean) :StateJSON {
    switch(evolved_mode) {
        case true : return move_forward( _infection_phase(s) );
        default   : return move_forward( infection_phase(s) );
    }
}

function infected_n(s :StateJSON, tick_n :number, evolved_mode :boolean) {
    let n = 0;
    
    for(let i = 0; i < tick_n; i++) {
        s = next_tick(s, evolved_mode);
        
        if(s.has_infected) n++;
    }
    
    return n;
}

function main() {
    let input = read_input('input/day_22.txt');
    
    const a = infected_n( parse_input(input), 10000,    false );
    const b = infected_n( parse_input(input), 10000000, true  );
    
    console.log({ first: a, second: b });
}


main();
