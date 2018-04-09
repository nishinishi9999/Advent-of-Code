"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Advent of Code 2017
* Day 19
*
* URL: http://adventofcode.com/2017/day/19
**/
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map((line) => line.split(''));
}
//// TODO: Fix parseInt
function find_start(map) {
    // Vertical
    for (const y of [0, map.length - 1]) {
        for (const x in map[y]) {
            if (map[y][x] !== ' ') {
                return { y: y, x: parseInt(x), dir: y === 0 ? 'down' : 'up' };
            }
        }
    }
    // Horizontal
    for (const y in map) {
        for (const x of [0, map[y].length - 1]) {
            if (map[y][x] !== ' ') {
                return { y: parseInt(y), x: x, dir: x === 0 ? 'right' : 'left' };
            }
        }
    }
    throw Error('No start');
}
function follow_stop(map, y, x, dir) {
    if (dir === 'left' || dir === 'right') {
        if (map[y - 1][x] === '|')
            return { y: y - 1, x: x, dir: 'up' };
        else if (map[y + 1][x] === '|')
            return { y: y + 1, x: x, dir: 'down' };
    }
    else {
        if (map[y][x - 1] === '-')
            return { y: y, x: x - 1, dir: 'left' };
        else if (map[y][x + 1] === '-')
            return { y: y, x: x + 1, dir: 'right' };
    }
}
function next_pos(map, pos) {
    const stop_char = '+';
    switch (map[pos.y][pos.x] === stop_char) {
        case true: return follow_stop(map, pos.y, pos.x, pos.dir);
        default: switch (pos.dir) {
            case 'up': return { y: pos.y - 1, x: pos.x, dir: pos.dir };
            case 'down': return { y: pos.y + 1, x: pos.x, dir: pos.dir };
            case 'left': return { y: pos.y, x: pos.x - 1, dir: pos.dir };
            case 'right': return { y: pos.y, x: pos.x + 1, dir: pos.dir };
            default: throw Error('Invalid direction: ' + pos.dir);
        }
    }
}
function is_end(map, pos) {
    return map[pos.y][pos.x] === undefined
        || map[pos.y][pos.x] === ' ';
}
function find_path(map, pos) {
    let A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let _pos = Object.assign({}, pos);
    let path = map[_pos.y][_pos.x];
    while (!is_end(map, _pos)) {
        _pos = next_pos(map, _pos);
        path += map[_pos.y][_pos.x];
    }
    return [
        // Wipe out non-letter characters
        path.split('').filter((c) => A.includes(c)).join(''),
        // Number of steps minus last space
        path.length - 1
    ];
}
function main() {
    let input = read_input('input/day_19.txt');
    let start_pos = find_start(input);
    const [a, b] = find_path(input, start_pos);
    console.log({ first: a, second: b });
}
main();
