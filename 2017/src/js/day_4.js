"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// day 4
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map((line) => line.split(' '));
}
function sort_str(str) {
    return str.split('').sort().join('');
}
function valid_n(input) {
    return input.length - input.filter((line) => line.some((a, i) => line.some((b, j) => i !== j && a === b))).length;
}
function valid_n_anagrams(input) {
    return input.length - input.filter((line) => line.some((a, i) => line.some((b, j) => i !== j && sort_str(a) === sort_str(b)))).length;
}
function main() {
    const input = read_input('input/day_4.txt');
    const a = valid_n(input);
    const b = valid_n_anagrams(input);
    console.log({ first: a, second: b });
}
main();
