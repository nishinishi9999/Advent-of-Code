"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Advent of Code 2017
* Day 16
*
* URL: http://adventofcode.com/2017/day/16
**/
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync('input/day_16.txt', 'utf8')
        .split(',');
}
function clone_cmd(cmd) {
    return cmd.map((c) => ({ cmd: c.cmd, args: c.args.slice() }));
}
function parse_input(input) {
    return input.map((line) => {
        const cmd = line[0];
        const args = line.substr(1);
        return {
            cmd: cmd,
            args: cmd === 's'
                ? [parseInt(args)]
                : cmd === 'x'
                    ? args.split('/').map((n) => parseInt(n))
                    : args.split('/')
        };
    });
}
function spin(arr, n) {
    let last;
    let _arr = arr.slice();
    let temp;
    let temp2;
    let i;
    let j;
    for (i = 0; i < n; i++) {
        last = _arr[_arr.length - 1];
        temp = _arr[0];
        for (j = 0; j < _arr.length - 1; j++) {
            temp2 = _arr[j + 1];
            _arr[j + 1] = temp;
            temp = temp2;
        }
        _arr[0] = last;
    }
    return _arr;
}
function exchange(arr, i, j) {
    let _arr = arr.slice();
    let temp;
    temp = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = temp;
    return _arr;
}
function partner(arr, a, b) {
    return exchange(arr, arr.indexOf(a), arr.indexOf(b));
}
function exec_cmd(cmd, args, arr) {
    switch (cmd) {
        case 's': return spin(arr, args[0]);
        case 'x': return exchange(arr, args[0], args[1]);
        case 'p': return partner(arr, args[0], args[1]);
        default: throw Error('Unknown command: ' + cmd);
    }
}
function compare_arr(arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}
function repetition_index(cmd, arr) {
    let _cmd = clone_cmd(cmd);
    let _arr = arr.slice();
    let arr_str = arr.join('');
    let i;
    let j;
    for (i = 0; i < 1000000; i++) {
        for (j = 0; j < _cmd.length; j++) {
            _arr = exec_cmd(_cmd[j].cmd, _cmd[j].args, _arr);
        }
        if (arr_str === _arr.join('')) {
            return i;
        }
    }
    return 0;
}
function exec_cmd_list(cmd, round_n) {
    let _cmd = clone_cmd(cmd);
    let arr = 'abcdefghijklmnop'.split('');
    const rep_index = repetition_index(_cmd, arr);
    for (var j = 0; j < round_n % (rep_index + 1); j++) {
        for (var i = 0; i < _cmd.length; i++) {
            arr = exec_cmd(_cmd[i].cmd, _cmd[i].args, arr);
        }
    }
    return arr.join('');
}
function main() {
    const input = read_input('input/day_16.txt');
    const cmd = parse_input(input);
    //process.exit();
    const a = exec_cmd_list(cmd, 1);
    const b = exec_cmd_list(cmd, 1000000000);
    console.log({ first: a, second: b });
}
main();
