"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('')
        .map((n) => parseInt(n));
}
function contiguous_sum(input) {
    return input.reduce((acc, n, i) => acc + (n === input[(i + 1) % input.length] ? input[i] : 0), 0);
}
function halfway_sum(input) {
    let half = input.length / 2;
    return input.reduce((acc, n, i) => acc + (n === input[(i + half) % input.length] ? input[i] : 0), 0);
}
function process_sum(input) {
    const dist = input.length / 2;
    let a = 0; // first part
    let b = 0; // second part
    let i;
    for (i = 0; i < input.length - 1; i++) {
        // Compare to next character
        if (input[i] === input[i + 1]) {
            a += input[i];
        }
        // Compare to character (input.length/2) positions away from i
        if (input[i] === input[(i + dist) % (input.length)]) {
            b += input[i];
        }
    }
    // Compare first to last character
    if (input[0] === input[input.length - 1]) {
        a += input[0];
    }
    return [a, b];
}
function main() {
    const input = read_input('input/day_1.txt');
    const a = contiguous_sum(input);
    const b = halfway_sum(input);
    console.log({ first: a, second: b });
}
main();
