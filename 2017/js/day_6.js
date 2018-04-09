"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Advent of Code 2017
* Day 6
*
* URL: http://adventofcode.com/2017/day/2
**/
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\t')
        .map((n) => parseInt(n));
}
function redistribute(mem) {
    let _mem = mem.slice();
    const index = _mem.indexOf(Math.max.apply(null, _mem));
    let bank = _mem[index];
    _mem[index] = 0;
    for (let i = (index + 1) % _mem.length; bank > 0; i = (i + 1) % _mem.length, bank--) {
        _mem[i]++;
    }
    return _mem;
}
function loop_len(mem, past) {
    let _mem = mem.slice();
    let key;
    let n = 0;
    for (;; n++) {
        _mem = redistribute(_mem);
        key = _mem.join(' ');
        if (past[key] !== undefined)
            break;
        else
            past[key] = true;
    }
    return { n: n, mem: _mem, loop_key: key };
}
function main() {
    let mem = read_input('input/day_6.txt');
    let s1 = loop_len(mem, [mem.join(' ')]);
    const a = s1.n + 1; // To compensate for the last execution
    let s2 = loop_len(s1.mem, [s1.loop_key]);
    const b = s2.n;
    console.log({ first: a, second: b });
}
main();
