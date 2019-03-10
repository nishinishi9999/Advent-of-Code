/**
* Advent of Code 2017
* Day 18
*
* URL: http://adventofcode.com/2017/day/18
**/
import * as fs from 'fs';
import * as asm from './asm.js';


interface Operator {
    op   :string;
    args :string[] | number[];
}

interface Register {
    [propName :string] :string | number;
}


function read_input(path :string) :string[][] {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map( (line) => line.split(' ') );
}

function parse_input(input :string[][]) :Operator[] {
    let ops = new Array(input.length);
    
    for(let i = 0; i < input.length; i++) {
        ops[i] = { op: input[i][0], args: [] };
        
        ops[i].args.push( Number.isInteger(parseInt(input[i][1]))
            ? parseInt(input[i][1])
            : input[i][1]
        );
        
        if(input[i][2] !== undefined)
            ops[i].args.push( Number.isInteger(parseInt(input[i][2]))
                ? parseInt(input[i][2])
                : input[i][2]
            );
    }
    
    return ops;
}

function init_reg(init_val? :Register) :Register {
    const A = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let json = {};
    
    for(const l of A) json[l] = 0;
    
    if(init_val !== undefined) {
        for(const key in init_val) {
            json[key] = init_val[key];
        }
    }
    
    return json;
}


function parallel_opcode(ops :Operator[]) :number {
    let n = 0;
    let i    :number;
    let turn :boolean;
    let s;
    
    let a = {
        r: init_reg({p: 0, id: 0}),
        i: 0,
        q: [],
        stopped: false
    };
    let b = {
        r: init_reg({p: 1, id: 1}),
        i: 0,
        q: [],
        stopped: false
    };
    
    // while there isn't a deadlock and both are not stopped
    for(i = 0, turn = true; i === 0 || !(a.q.length === 0 && b.q.length === 0) && !(a.stopped && b.stopped); i++, turn = !turn) {
        switch(turn) {
            case true: {
                if(!a.stopped) {
                    s   = asm._opcode(ops, a.r, a.i, { snd: [], rcv: b.q.slice() });
                    a.r = s.r;
                    a.i = s.i;
                    a.q = s.q;
                    a.stopped = s.stopped;
                }
                
                break;
            }
            default: {
                if(!b.stopped) {
                    s   = asm._opcode(ops, b.r, b.i, { snd: [], rcv: a.q.slice() });
                    b.r = s.r;
                    b.i = s.i;
                    b.q = s.q;
                    b.stopped = s.stopped;
                }
                
                n += b.q.length;
            }
        }
    }
    
    return n;
}

function main() :void {
    const input = read_input('input/day_18.txt');
    const ops   = parse_input(input);
    
    const a = asm.opcode(ops, init_reg(), 0, 0);
    const b = parallel_opcode(ops);
    
    console.log({ first: a, second: b });
}


main();
