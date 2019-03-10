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
class Cell {
    constructor(initial_state, index) {
        this.state = initial_state;
        this._state = false;
        this.index = index;
    }
}
function parse_input(input, len) {
    const cells = Array(len).fill(0).map((_, i) => new Cell(false, i - len / 2));
    input[0].substr(15).split('').forEach((c, i) => {
        cells[i + len / 2].state = c === '#';
    });
    const rules = {
        dead: [],
        alive: []
    };
    input.slice(1).forEach(line => {
        const [rule, to] = line.split(' => ');
        const is_alive = rule[2] === '#';
        const _rule = {
            rule: (rule.substr(0, 2) + rule.substr(3)).split('').map(c => c === '#'),
            to: to === '#'
        };
        if (is_alive)
            rules.alive.push(_rule);
        else
            rules.dead.push(_rule);
    });
    return [cells, rules];
}
function get_rule(cells, i, rules) {
    const neighbors = [cells[i - 2], cells[i - 1], cells[i + 1], cells[i + 2]].map(_ => _.state);
    const subrules = cells[i].state ? rules.alive : rules.dead;
    const rule = subrules.find(subrule => subrule.rule.every((b, i) => b === neighbors[i]));
    return rule;
}
function gen(cells, rules) {
    for (let i = 2; i < cells.length - 2; i++) {
        const rule = get_rule(cells, i, rules);
        //console.log(cells[i].index, rule);
        if (rule)
            cells[i]._state = rule.to;
        else
            cells[i]._state = false;
    }
    for (let i = 2; i < cells.length - 2; i++)
        cells[i].state = cells[i]._state;
}
function simulate(input, itr_n, len) {
    const [cells, rules] = parse_input(input, len);
    for (let i = 0; i < itr_n; i++)
        gen(cells, rules);
    return cells.reduce((acc, cell) => cell.state ? acc + cell.index : acc, 0);
}
function main() {
    const path = './input/day_12.txt';
    const input = Util.format_as_strings(Util.read_file(path));
    const _first = simulate(input, 20, 2000);
    const _second = simulate(input, 50000, 2000);
    console.log('First:', _first);
    console.log('Second:', _second);
}
main();
