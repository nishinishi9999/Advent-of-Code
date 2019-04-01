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
function parse_input(input) {
    const person = {};
    input.forEach(line => {
        const parts = line.substr(0, line.length - 1).split(' ');
        const [a, b] = [parts[0], parts[parts.length - 1]];
        if (person[parts[0]] === undefined)
            person[parts[0]] = {};
        person[a][b] = parts[2] === 'gain'
            ? parseInt(parts[3])
            : -parseInt(parts[3]);
    });
    return person;
}
// Destructive behaviour!
function add_me(person) {
    person['Me'] = {};
    for (const key in person) {
        person[key]['Me'] = 0;
        person['Me'][key] = 0;
    }
    return person;
}
function find_arrangement(person, name, first, happiness, past) {
    if (past.length === Object.keys(person).length) {
        return happiness + person[name][first] + person[first][name];
    }
    else {
        return Object.keys(person[name])
            .filter((_name) => !past.includes(_name))
            .map((_name) => find_arrangement(person, _name, first, happiness + person[name][_name] + person[_name][name], past.concat(_name)))
            .sort((a, b) => b - a)[0];
    }
}
function main() {
    const name = 'Alice';
    const input = Util.read_lines('../../input/day_13.txt');
    let person = parse_input(input);
    const first = find_arrangement(person, name, name, 0, [name]);
    person = add_me(person);
    const second = find_arrangement(person, name, name, 0, [name]);
    console.log({ first, second });
}
main();
