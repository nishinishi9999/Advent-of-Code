"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Advent of Code 2017
* Day 10
*
* URL: http://adventofcode.com/2017/day/10
**/
const fs = require("fs");
// Initialization functions
function read_input(path) {
    return fs.readFileSync(path, 'utf8');
}
function parse_to_numbers(input) {
    return input.split(',')
        .map((n) => parseInt(n));
}
exports.parse_to_numbers = parse_to_numbers;
function parse_to_bytes(input) {
    return input.split('')
        .map((c) => c.charCodeAt(0));
}
exports.parse_to_bytes = parse_to_bytes;
function init_map(len) {
    return Array(len).fill(0).map((_, i) => i);
}
exports.init_map = init_map;
// hash functions
// Reverse a subarray
function sub_reverse(map, pos, length) {
    let _map = map.slice();
    let to;
    for (let i = pos, dist = length - 1; dist > 0; i = (i + 1) % map.length, dist -= 2) {
        to = (i + dist) % map.length;
        [_map[i], _map[to]] = [_map[to], _map[i]];
    }
    return _map;
}
function hash(map, lengths, pos, skip) {
    let _map = map.slice();
    for (let i = 0; i < lengths.length; i++, skip++) {
        _map = sub_reverse(_map, pos, lengths[i]);
        pos = (pos + lengths[i] + skip) % _map.length;
    }
    return { hash: _map[0] * _map[1], map: _map, pos: pos, skip: skip };
}
// Convert numerical array to hexadecimal string
function arr_to_hex_str(arr) {
    return arr.map((n) => n.toString(16).padStart(2, '0'))
        .join('');
}
function knot_hash(map) {
    let blocks = new Array(16);
    for (let i = 0; i < 16; i++) {
        blocks[i] = map[i * 16];
        for (let j = 1; j < 16; j++) {
            blocks[i] ^= map[i * 16 + j];
        }
    }
    return arr_to_hex_str(blocks);
}
function _hash(lengths) {
    const round_n = 64;
    let map = init_map(256);
    let ascii_lengths = lengths.concat([17, 31, 73, 47, 23]);
    let pos = 0;
    let skip = 0;
    let res;
    for (let i = 0; i < round_n; i++) {
        res = hash(map, ascii_lengths, pos, skip);
        map = res.map;
        pos = res.pos;
        skip = res.skip;
    }
    return knot_hash(map);
}
exports._hash = _hash;
function main() {
    const input = read_input('input/day_10.txt');
    const map = init_map(256);
    const a = hash(map, parse_to_numbers(input), 0, 0).hash;
    const b = _hash(parse_to_bytes(input));
    console.log({ first: a, second: b });
}
//main();
