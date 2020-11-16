/**
* Advent of Code 2017
* Day 21
*
* URL: http://adventofcode.com/2017/day/21
**/
import * as fs from 'fs';


interface RuleJSON {
    from :string;
    to   :string;
}

interface RulesJSON {
    2 :RuleJSON[];
    3 :RuleJSON[];
}


function read_input(path :string) :string[][] {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map( (line) => line.split(' => ') );
}

function parse_input(input :string[][]) :RulesJSON {
    let rules = { 2: [], 3: [] };
    
    for(let i = 0; i < input.length; i++) {
        if(input[i][0].length === 5) {
            rules[2].push({ from: input[i][0], to: input[i][1] });
        }
        else {
            rules[3].push({ from: input[i][0], to: input[i][1] });
        }
    }
    
    return rules;
}

function flatten(arr :string[][]) :string {
    return arr.map( (_arr) => _arr.join('') ).join('/');
}

function from_rule(rule :RuleJSON) :string[][] {
    return rule.to.split('/').map( (line) => line.split('') );
}

function rotate(arr :string[][]) :string[][] {
    switch(arr[0].length) {
        case 2: {
            return [
                [ arr[1][0], arr[0][0] ],
                [ arr[1][1], arr[0][1] ]
            ];
        }
        case 3: {
            return [
                [ arr[2][0], arr[1][0], arr[0][0] ],
                [ arr[2][1], arr[1][1], arr[0][1] ],
                [ arr[2][2], arr[1][2], arr[0][2] ]
            ];
        }
    }
}

function flip(arr :string[][]) :string[][] {
    switch(arr[0].length) {
        case 2: {
            return [
                [ arr[0][1], arr[0][0] ],
                [ arr[1][1], arr[1][0] ]
            ];
        }
        case 3: {
            return [
                [ arr[0][2], arr[0][1], arr[0][0] ],
                [ arr[1][2], arr[1][1], arr[1][0] ],
                [ arr[2][2], arr[2][1], arr[2][0] ]
            ];
        }
    }
}

function get_posibilities(arr :string[][]) :string[] {
    let pos = [arr];
    let i :number;
    
    switch(arr[0].length) {
        case 2: {
            for(i = 1; i < 4; i++) {
                pos.push( rotate(pos[i-1]) );
            }
            
            return pos.map(flatten);
        }
        case 3: {
            for(i = 1; i < 4; i++) {
                pos.push( rotate(pos[i-1]) );
            }
            
            pos.push( flip(arr) );
            
            for(i = 5; i < 8; i++) {
                pos.push( rotate(pos[i-1]) );
            }
            
            return pos.map(flatten);
        }
    }
}

function match_rule(arr :string[][], rules :RulesJSON) {
    let pos = get_posibilities(arr);
    
    for(const rule of rules[arr[0].length]) {
        for(const str of pos) {
            if(rule.from === str) {
                return rule;
            }
        }
    }
    
    throw Error('No rule found.');
}

function expanded_arr(len :number) :string[][] {
    switch(len % 2 === 0) {
        case true : return Array(len/2 * 3).fill('').map( () => Array(len/2 * 3).fill('') );
        default   : return Array(len/3 * 4).fill('').map( () => Array(len/3 * 4).fill('') );
    }
}

function replace(arr :string[][], rules :RulesJSON) :string[][] {
    switch(arr.length % 2 === 0) {
        case true: {
            let expanded = expanded_arr(arr.length);
            let offset_y = 0;
            
            for(let y = 0; y < arr.length; y += 2) {
                let offset_x = 0;
                
                for(let x = 0; x < arr.length; x += 2) {
                    let _arr = from_rule( match_rule( [
                        [ arr[y][x],   arr[y][x+1]   ],
                        [ arr[y+1][x], arr[y+1][x+1] ]
                    ], rules));
                    
                    for(let _y = 0; _y < 3; _y++) {
                        for(let _x = 0; _x < 3; _x++) {
                            expanded[y+offset_y+_y][x+offset_x+_x] = _arr[_y][_x];
                        }
                    }
                    
                    offset_x++;
                }
                
                offset_y++;
            }
            
            return expanded;
        }
        case false: {
            let expanded = expanded_arr(arr.length);
            let offset_y = 0;
            
            for(let y = 0; y < arr.length; y += 3) {
                let offset_x = 0;
                
                for(let x = 0; x < arr.length; x += 3) {
                    let _arr = from_rule( match_rule( [
                        [ arr[y][x],   arr[y][x+1],   arr[y][x+2]   ],
                        [ arr[y+1][x], arr[y+1][x+1], arr[y+1][x+2] ],
                        [ arr[y+2][x], arr[y+2][x+1], arr[y+2][x+2] ]
                    ], rules));

                    for(let _y = 0; _y < 4; _y++) {
                        for(let _x = 0; _x < 4; _x++) {
                            expanded[y+offset_y+_y][x+offset_x+_x] = _arr[_y][_x];
                        }
                    }
                    
                    offset_x++;
                }
                
                offset_y++;
            }
            
            return expanded;
        }
    }
}

function cell_n(arr :string[][], rules :RulesJSON, times :number) :number {
    let _arr = arr.map( (line) => line.slice() );
    
    for(let i = 0; i < times; i++) {
        _arr = replace(_arr, rules);
    }
    
    return _arr.join('').split('').filter( (c) => c === '#' ).length;
}

function main() :void {
    let input = read_input('../../input/day_21.txt');
    let rules = parse_input(input);
    
    let arr = [
        ['.', '#', '.'],
        ['.', '.', '#'],
        ['#', '#', '#']
    ];
    
    
    const a = cell_n(arr, rules, 5);
    const b = cell_n(arr, rules, 18);
    
    console.log({ first: a, second: b });
}


main();
