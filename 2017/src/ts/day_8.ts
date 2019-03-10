/**
* Advent of Code 2017
* Day 8
*
* URL: http://adventofcode.com/2017/day/8
**/
import * as fs from 'fs';


interface NumberJSON {
    [propName :string] :number;
}

function read_input(path :string) :string[][] {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map( (line) => line.split(' ') );
}

// Initialize all registers to 0
function init_reg(input :string[][]) :NumberJSON {
    let reg = {};
    let t_r    :string;
    let cond_r :string;
    
    for(const arr of input) {
        [t_r, cond_r] = [ arr[0], arr[4] ];
        
        reg[t_r]    = 0;
        reg[cond_r] = 0;
    }
    
    return reg;
}

function set_json(json :NumberJSON, t_key :string, val :number) :NumberJSON {
    let _json = {};
    
    for(const key in json) {
        _json[key] = key === t_key ? val : json[key];
    }
    
    return _json;
}

// Reduce a json to it's highest value
function json_high(json) {
    return Object.keys(json)
        .reduce( (acc, key) => Math.max(acc, json[key]), 0 );
}

function eval_cond(reg :NumberJSON, cond :string, cond_r :string, cond_n :number) :boolean {
    switch(cond) {
        case '==' : return reg[cond_r] === cond_n;
        case '!=' : return reg[cond_r] !== cond_n;
        case '<'  : return reg[cond_r]   < cond_n;
        case '>'  : return reg[cond_r]   > cond_n;
        case '>=' : return reg[cond_r]  >= cond_n;
        case '<=' : return reg[cond_r]  <= cond_n;
        default: throw Error('Condition not recognized: ' + cond);
    }
}

function opcode(reg :NumberJSON, op :string, t_r :string, n :number, cond_r :string, cond :string, cond_n :number) :NumberJSON {
    switch(op) {
        case 'inc': {
            switch( eval_cond(reg, cond, cond_r, cond_n) ) {
                case true : return set_json(reg, t_r, reg[t_r]+n);
                default   : return reg;
            }
        }
        case 'dec': {
            switch( eval_cond(reg, cond, cond_r, cond_n) ) {
                case true : return set_json(reg, t_r, reg[t_r]-n);
                default   : return reg;
            }
        }
        default: {
            throw Error('Opcode not recognized: ' + op);
        }
    }
}

function process(input :string[][]) :number[] {
    let reg = init_reg(input);
    let high    :number;
    let highest = 0;
    
    for(const arr of input) {
        const [t_r, op, n,, cond_r, cond, cond_n] = arr;
        
        reg = opcode( reg, op, t_r, parseInt(n), cond_r, cond, parseInt(cond_n) );
        
        // Highest value on this loop
        high = json_high(reg);
        if(high > highest) highest = high;
    }
    
    return [high, highest];
}

function main() :void {
    let input = read_input('input/day_8.txt');
    
    const [a, b] = process(input);
    
    console.log({ first: a, second: b });
}


main();
