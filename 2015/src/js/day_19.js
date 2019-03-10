"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// day 19
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map((line) => line.split(' => '));
}
function parse_input(input) {
    let map = {};
    let target;
    for (const arr of input) {
        if (arr.length === 1) {
            target = arr[0];
        }
        else {
            let [from, to] = arr;
            if (map[from] === undefined) {
                map[from] = [to];
            }
            else {
                map[from].push(to);
            }
        }
    }
    return [map, target];
}
function form_regex(map) {
    return RegExp(Object.keys(map).join('|'), 'g');
}
function replace_i(arr, i, value) {
    let _arr = arr.slice();
    _arr[i] = value;
    return _arr;
}
function get_posibilities(map, target) {
    const regex = form_regex(map);
    let match = target.match(regex);
    let past = {};
    for (let i = 0; i < match.length; i++) {
        for (let j = 0; j < map[match[i]].length; j++) {
            const key = replace_i(match, i, map[match[i]][j]).join('');
            past[key] = true;
        }
    }
    return Object.keys(past).length + 1;
}
function step_n(map, regex, p_arr, pos, i, target, limit) {
    console.log(p_arr, pos, i);
    // There is a match
    switch (p_arr.join('') === target) {
        case true: return i;
        default: {
            // Arbitrary limit
            switch (i === limit) {
                case true: return -1;
                default: {
                    // End of the array
                    let _i;
                    let _pos;
                    if (pos === p_arr.length) {
                        _i = i + 1;
                        _pos = 0;
                        console.log(p_arr.join(''));
                        p_arr = p_arr.join('').match(regex);
                    }
                    else {
                        _i = i;
                        _pos = pos;
                    }
                    for (let j = _pos; j < p_arr.length; j++) {
                        const p = p_arr[j];
                        console.log(p);
                        for (let k = 0; k < map[p].length; k++) {
                            let _p_arr = replace_i(p_arr, j, map[p][k]);
                            const res = step_n(map, regex, _p_arr, _pos + 1, _i, target, limit);
                            if (res !== -1) {
                                return res;
                            }
                        }
                    }
                    return -1;
                }
            }
        }
    }
}
function main() {
    let input = read_input('input/day_19.txt');
    let [map, target] = parse_input(input);
    const regex = form_regex(map);
    //console.log(map);
    //target = 'HOHOHO';
    const a = get_posibilities(map, target);
    const b = step_n(map, regex, ['e'], 0, 0, target, 2);
    console.log({ first: a, second: b });
}
main();
