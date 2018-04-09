"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Advent of Code 2017
* Day 11
*
* URL: http://adventofcode.com/2017/day/11
**/
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split(',');
}
function count_dirs(dirs) {
    let dir_n = {
        n: 0,
        s: 0,
        nw: 0,
        ne: 0,
        sw: 0,
        se: 0
    };
    for (const dir of dirs) {
        dir_n[dir]++;
    }
    return dir_n;
}
function attempt_negation(json) {
    let _json = Object.assign({}, json);
    const negated = {
        n: 's',
        s: 'n',
        nw: 'se',
        ne: 'sw',
        sw: 'ne',
        se: 'nw'
    };
    for (const dir in _json) {
        if (_json[dir] > 0 && _json[negated[dir]] > 0) {
            let [max, min] = [dir, negated[dir]].sort((_a, _b) => _json[_b] - _json[_a]);
            // The lowest becomes 0, the highest becomes the difference
            [_json[max], _json[min]] = [_json[max] - _json[min], 0];
        }
    }
    return _json;
}
function attempt_reduction(json) {
    let _json = Object.assign({}, json);
    const reduced = {
        n: ['sw', 'se'],
        s: ['nw', 'ne'],
        nw: ['s', 'ne'],
        ne: ['s', 'nw'],
        sw: ['n', 'se'],
        se: ['n', 'sw']
    };
    for (const dir in _json) {
        // The lowest becomes 0
        if (_json[dir] > 0 && _json[reduced[dir][0]] > 0) {
            const min = [dir, reduced[dir][0]].sort((a, b) => _json[a] - _json[b])[0];
            _json[min] = 0;
        }
        else if (_json[dir] > 0 && _json[reduced[dir][1]] > 0) {
            const min = [dir, reduced[dir][1]].sort((a, b) => _json[a] - _json[b])[0];
            _json[min] = 0;
        }
    }
    return _json;
}
function json_sum(json) {
    let _json = Object.assign({}, json);
    return Object.keys(_json)
        .reduce((acc, n) => acc + _json[n], 0);
}
function farthest_distance(input) {
    let dirs = input.slice();
    let dist = 0;
    while (dirs.length > 0) {
        const d = measure_distance(dirs);
        if (d > dist)
            dist = d;
        dirs.pop();
    }
    return dist;
}
function measure_distance(input) {
    return json_sum(attempt_reduction(attempt_negation(count_dirs(input))));
}
function main() {
    const input = read_input('input/day_11.txt');
    const a = measure_distance(input);
    const b = farthest_distance(input);
    console.log({ first: a, second: b });
}
main();
