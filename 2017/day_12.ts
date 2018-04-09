/**
* Advent of Code 2017
* Day 12
*
* URL: http://adventofcode.com/2017/day/12
**/
import * as fs from 'fs';


interface Node {
    con  :number[];
    done :boolean;
}


function read_input(path :string) :string[] {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n');
}

function parse_input(input :string[]) :Node[] {
    let json = [];
    
    for(const line of input) {
        const parts = line.split(' <-> ');
        const n   = parseInt(parts[0]);
        const con = parts[1]
            .split(', ')
            .map( (_n) => parseInt(_n) );
        
        json[n] = { con: con, done: false };
    }
    
    return json;
}

function clone_nodes(nodes :Node[]) :Node[] {
    let _nodes = new Array(nodes.length);
    
    for(let i = 0; i < nodes.length; i++) {
        _nodes[i] = { con: nodes[i].con.slice(), done: nodes[i].done };
    }
    
    return _nodes;
}

function has_zero(nodes :Node[], past :number[], i :number) :boolean {
    switch( nodes[i].done === true || nodes[i].con.includes(0) ) {
        case true: return true;
        default: {
            for(const j of nodes[i].con) {
                if( !past.includes(j) && has_zero(nodes, past.concat(j), j) ) {
                    return true;
                }
            }
            
            return false;
        }
    }
}

function n_connected_to_zero(nodes :Node[]) :number {
    let _nodes = clone_nodes(nodes);
    let n = 0;
    let i :number;
    
    for(i = 0; i < _nodes.length; i++) {
        if( _nodes[i].con.includes(0) ) _nodes[i].done = true;
    }
    
    for(i = 0; i < _nodes.length; i++) {
        if( has_zero(_nodes, [], i) ) {
            _nodes[i].done = true;
            n++;
        }
    }
    
    return n;
}

function find_group(nodes :Node[], past, i :number) :number[] {
    return [].concat(
        nodes[i].con.map( (j) => {
            switch( past.includes(j) ) {
                case true : return [];
                default   : return [j].concat( find_group(nodes, past.concat(j), j) );
            }
        })
        .reduce( (acc, arr) => acc.concat(arr), [] )
    );
}

function group_n(nodes :Node[]) :number {
    let _nodes = clone_nodes(nodes);
    let n = 0;
    let i :number;
    let j :number;
    
    
    for(i = 0; i < _nodes.length; i++) {
        if(!_nodes[i].done) {
            const group = find_group(_nodes, [i], i);
            
            _nodes[i].done = true;
            for(j = 0; j < group.length; j++) {
                _nodes[ group[j] ].done = true;
            }
            
            n++;
        }
    }
    
    return n;
}

function main() :void {
    const input = read_input('input/day_12.txt');
    const nodes = parse_input(input);
    
    const a = n_connected_to_zero(nodes);
    const b = group_n(nodes);
    
    console.log({ first: a, second: b });
}


main();
