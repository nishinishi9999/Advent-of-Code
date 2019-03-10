"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// day 8
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n');
}
function diff(str) {
    return str.length - eval(str).length;
}
function encoded_str(str) {
    return '"'
        + str.replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
        + '"';
}
function str_len_diff(input) {
    return input.map(diff)
        .reduce((acc, n) => acc + n, 0);
}
function _str_len_diff(input) {
    return input.map((str) => encoded_str(str).length - str.length)
        .reduce((acc, n) => acc + n, 0);
}
function main() {
    let input = read_input('input/day_8.txt');
    const a = str_len_diff(input);
    const b = _str_len_diff(input);
    console.log(encoded_str("\"\\x27\""));
    console.log({ first: a, second: b });
}
main();
