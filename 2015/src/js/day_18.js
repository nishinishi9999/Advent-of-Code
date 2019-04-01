"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Util = __importStar(require("./util"));
function neighbors_on(map, y, x) {
    const state_on = '#';
    return [x - 1, x, x + 1].filter((_x) => map[y - 1] !== undefined && map[y - 1][_x] !== undefined && map[y - 1][_x] === state_on).length
        + [x - 1, x + 1].filter((_x) => map[y][_x] !== undefined && map[y][_x] === state_on).length
        + [x - 1, x, x + 1].filter((_x) => map[y + 1] !== undefined && map[y + 1][_x] !== undefined && map[y + 1][_x] === state_on).length;
}
function is_corner(map, y, x) {
    return (y === 0 && x === 0)
        || (y === 0 && x === map.length - 1)
        || (y === map.length - 1 && x === 0)
        || (y === map.length - 1 && x === map.length - 1);
}
function next_state(map, y, x, mode) {
    const state_on = '#';
    const state_off = '.';
    if (mode && is_corner(map, y, x))
        return state_on;
    const neighbor_n = neighbors_on(map, y, x);
    switch (map[y][x]) {
        case state_on: return neighbor_n === 2 || neighbor_n === 3 ? state_on : state_off;
        default: return neighbor_n === 3 ? state_on : state_off;
    }
}
function animate(map, mode) {
    return map.map((line, y) => line.map((_, x) => next_state(map, y, x, mode)));
}
function simulate(map, round_n, mode) {
    const state_on = '#';
    let _map = map.map((arr) => arr.slice());
    for (let i = 0; i < round_n; i++)
        _map = animate(_map, mode);
    return _map.reduce((acc, arr) => acc + arr.filter((c) => c === state_on).length, 0);
}
function main() {
    const round_n = 100;
    const input = Util.read_lines('../../input/day_18.txt')
        .map(_ => _.split(''));
    const first = simulate(input, round_n, false);
    const second = simulate(input, round_n, true);
    console.log({ first, second });
}
main();
