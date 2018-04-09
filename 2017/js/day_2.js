"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Advent of code 2017
* Day 2
*
* URL: http://adventofcode.com/2017/day/2
**/
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map((line) => line.split('\t').map((n) => parseInt(n)));
}
// first part ( max - min )
function first(input) {
    return input.map((line) => Math.max.apply(null, line) - Math.min.apply(null, line))
        .reduce((acc, n) => acc + n, 0);
}
// second part ( a % b == 0 )
function second(input) {
    return input.map((line) => {
        const n = line.find((n) => line.some((m) => n !== m && n % m === 0));
        const m = line.find((m) => n !== m && n % m === 0);
        return n / m;
    })
        .reduce((acc, n) => acc + n, 0);
}
function main() {
    const input = read_input('input/day_2.txt');
    const a = first(input);
    const b = second(input);
    console.log({ first: a, second: b });
}
main();
