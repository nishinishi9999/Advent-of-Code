"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Advent of Code 2017
* Day 24
*
* URL: http://adventofcode.com/2017/day/24
**/
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map((line) => line.split('/')
        .map((n) => parseInt(n)));
}
function has_parent(input, parent, past) {
    for (let i = 0; i < input.length; i++) {
        if (input[i].includes(parent) && !past.includes(input[i].join())) {
            return true;
        }
    }
    return false;
}
function strongest_path(input, parent, s, past) {
    switch (has_parent(input, parent, past)) {
        case false: return s;
        default: {
            return input.filter((arr) => arr.includes(parent) && !past.includes(arr.join()))
                .map((arr) => {
                const pair = arr[0] === parent ? arr[1] : arr[0];
                return strongest_path(input, pair, s + parent + pair, past.concat(arr.join()));
            })
                .sort((a, b) => b - a)[0];
        }
    }
}
function sort_by_length(arr_a, arr_b) {
    return arr_b[1] === arr_a[1]
        ? arr_b[0] - arr_a[0]
        : arr_b[1] - arr_a[1];
}
function longest_path(input, parent, s, len, past) {
    switch (has_parent(input, parent, past)) {
        case false: return [s, len];
        default: {
            return input.filter((arr) => arr.includes(parent) && !past.includes(arr.join()))
                .map((arr) => {
                const pair = arr[0] === parent ? arr[1] : arr[0];
                return longest_path(input, pair, s + parent + pair, len + 1, past.concat(arr.join()));
            })
                .sort(sort_by_length)[0];
        }
    }
}
function main() {
    let input = read_input('input/day_24.txt');
    const a = strongest_path(input, 0, 0, []);
    const b = longest_path(input, 0, 0, 0, []);
    console.log({ first: a, second: b });
}
main();
