"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// day 5
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n');
}
function is_nice(str) {
    return !/ab|cd|pq|xy/.test(str)
        && /(\w)\1/.test(str)
        && /[aiueo]/.test(str)
        && str.match(/[aiueo]/g).length >= 3;
}
function _is_nice(str) {
    return /(\w{2}).*\1/.test(str)
        && /(\w).\1/.test(str);
}
function nice_str_n(input, mode) {
    switch (mode) {
        case true: return input.filter(is_nice).length;
        case false: return input.filter(_is_nice).length;
    }
}
function main() {
    let input = read_input('input/day_5.txt');
    const a = nice_str_n(input, true);
    const b = nice_str_n(input, false);
    console.log({ first: a, second: b });
}
main();
