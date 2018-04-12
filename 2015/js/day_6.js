"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// day 6
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map((line) => line.split(' '));
}
function parse_input(input) {
    return input.map((arr) => {
        let cmd_i = arr[0] === 'toggle' ? 0 : 1;
        return {
            cmd: arr[cmd_i],
            from: {
                y: parseInt(arr[cmd_i + 1].split(',')[0]),
                x: parseInt(arr[cmd_i + 1].split(',')[1])
            },
            to: {
                y: parseInt(arr[cmd_i + 3].split(',')[0]),
                x: parseInt(arr[cmd_i + 3].split(',')[1])
            }
        };
    });
}
function create_grid(size) {
    return Array(size)
        .fill(0)
        .map(() => Array(size).fill(0));
}
function clone_grid(grid) {
    return Array(grid.length)
        .fill(0)
        .map((_, i) => grid[i].slice());
}
function run_cmd(cmd, grid) {
    let _grid = clone_grid(grid);
    for (let y = cmd.from.y; y < cmd.to.y + 1; y++) {
        for (let x = cmd.from.x; x < cmd.to.x + 1; x++) {
            _grid[y][x] = cmd.cmd === 'on'
                ? 1
                : cmd.cmd === 'off'
                    ? 0
                    : _grid[y][x] === 1 ? 0 : 1;
        }
    }
    return _grid;
}
function _run_cmd(cmd, grid) {
    let _grid = clone_grid(grid);
    for (let y = cmd.from.y; y < cmd.to.y + 1; y++) {
        for (let x = cmd.from.x; x < cmd.to.x + 1; x++) {
            _grid[y][x] = cmd.cmd === 'on'
                ? _grid[y][x] + 1
                : cmd.cmd === 'off'
                    ? (_grid[y][x] - 1) < 0 ? 0 : _grid[y][x] - 1
                    : _grid[y][x] + 2;
        }
    }
    return _grid;
}
function grid_state(cmd, mode) {
    let grid = create_grid(1000);
    for (let i = 0; i < cmd.length; i++) {
        if (mode)
            grid = run_cmd(cmd[i], grid);
        else
            grid = _run_cmd(cmd[i], grid);
    }
    return grid.reduce((acc, arr) => acc + arr.reduce((_acc, n) => _acc + n), 0);
}
function main() {
    let input = read_input('input/day_6.txt');
    let cmd = parse_input(input);
    const a = grid_state(cmd, true);
    const b = grid_state(cmd, false);
    console.log({ first: a, second: b });
}
main();
