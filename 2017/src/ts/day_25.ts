/**
* Advent of Code 2017
* Day 25
*
* URL: http://adventofcode.com/2017/day/25
**/
interface StateJSON {
    value :number[];
    dir   :number[];
    state :string[];
}

interface StatesJSON {
    [propName :string] :StateJSON;
}


function checksum(arr :number[]) :number {
    return arr.filter( (n) => n === 1 ).length;
}

function turing(state :string, steps :number, states :StatesJSON) {
    let tape = new Array(steps*2).fill(0);
    let pos  = steps;
    
    let i :number;
    let value :number;
    let s :StateJSON;
    
    for(i = 0; i < steps; i++) {
        value = tape[pos];
        s = states[state];
        
        state     = s.state[value];
        tape[pos] = s.value[value];
        pos      += s.dir[value];
    }
    
    return checksum(tape);
}

// @ts-ignore
function main() {
    const state = 'A';
    const steps = 12586542;
    
    let states = {
        A: {
            value : [1, 0],
            dir   : [1, -1],
            state : ['B', 'B']
        },
        B: {
            value : [0, 1],
            dir   : [1, -1],
            state : ['C', 'B']
        },
        C: {
            value : [1, 0],
            dir   : [1, -1],
            state : ['D', 'A']
        },
        D: {
            value : [1, 1],
            dir   : [-1, -1],
            state : ['E', 'F']
        },
        E: {
            value : [1, 0],
            dir   : [-1, -1],
            state : ['A', 'D']
        },
        F: {
            value : [1, 1],
            dir   : [1, -1],
            state : ['A', 'E']
        }
    };
    
    
    const a = turing(state, steps, states);
    
    console.log({ first: a });
}


main();
