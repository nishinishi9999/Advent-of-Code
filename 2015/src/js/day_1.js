"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// day 1
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('');
}
function count_floor(input) {
    return input.filter((c) => c == '(').length
        - input.filter((c) => c == ')').length;
}
function basement(input, n, i) {
    let map = { '(': 1, ')': -1 };
    switch (n < 0) {
        case true: return i;
        default: return basement(input, n + map[input[i]], i + 1);
    }
}
function main() {
    let input = read_input('input/day_1.txt');
    const a = count_floor(input);
    const b = basement(input, 0, 0);
    console.log({ first: a, second: b });
}
main();
