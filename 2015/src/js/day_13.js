"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// day 13
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map((line) => line.substr(0, line.length - 1).split(' '));
}
function parse_input(input) {
    let person = {};
    for (let i = 0; i < input.length; i++) {
        if (person[input[i][0]] === undefined) {
            person[input[i][0]] = {};
        }
        let [a, b] = [input[i][0], input[i][input[i].length - 1]];
        person[a][b] = input[i][2] === 'gain'
            ? parseInt(input[i][3])
            : -parseInt(input[i][3]);
    }
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
    switch (past.length === Object.keys(person).length) {
        case true: {
            return happiness + person[name][first] + person[first][name];
        }
        default: {
            return Object.keys(person[name])
                .filter((_name) => !past.includes(_name))
                .map((_name) => find_arrangement(person, _name, first, happiness + person[name][_name] + person[_name][name], past.concat(_name)))
                .sort((a, b) => b - a)[0];
        }
    }
}
function main() {
    let input = read_input('input/day_13.txt');
    let person = parse_input(input);
    const name = 'Alice';
    const a = find_arrangement(person, name, name, 0, [name]);
    person = add_me(person);
    const b = find_arrangement(person, name, name, 0, [name]);
    console.log({ first: a, second: b });
}
main();
