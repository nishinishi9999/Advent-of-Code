"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// day 5
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map((n) => parseInt(n));
}
function first(input) {
    let _input = input.slice();
    let n = 0;
    let temp;
    for (let i = 0; i < _input.length; n++, i += temp) {
        temp = _input[i];
        _input[i]++;
    }
    return n;
}
function second(input) {
    let _input = input.slice();
    let n = 0;
    let temp;
    for (let i = 0; i < _input.length; n++, i += temp) {
        temp = _input[i];
        _input[i] += _input[i] >= 3 ? -1 : 1;
    }
    return n;
}
function main() {
    const input = read_input('input/day_5.txt');
    const a = first(input);
    const b = second(input);
    console.log({ first: a, second: b });
}
main();
