"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// day 9
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8');
}
function parse_input(input) {
    return input.replace(/!./g, '')
        .replace(/<.*?>/g, '')
        .replace(/,/g, '');
}
function _parse_input(input) {
    return input.replace(/!./g, '');
}
function find_subgroups(group) {
    // Remove enclosing brackets
    const _group = group.substr(1, group.length - 2);
    let groups = [];
    let n = 0;
    let start;
    for (let i = 0; i < _group.length; i++) {
        if (_group[i] === '{') {
            n++;
            if (n === 1)
                start = i;
        }
        else if (_group[i] === '}') {
            n--;
            if (n === 0) {
                groups.push(_group.substring(start, i + 1));
            }
        }
    }
    return groups;
}
function count_groups(groups, level) {
    return groups.map((group) => {
        switch (group === '{}') {
            case true: return level;
            default: return level + count_groups(find_subgroups(group), level + 1);
        }
    }).reduce((acc, n) => acc + n, 0);
}
function _count_groups(group) {
    return group.match(/<(.*?)>/g)
        .reduce((acc, _group) => acc + _group.length - 2, 0);
}
function main() {
    let input = read_input('input/day_9.txt');
    const a = count_groups([parse_input(input)], 1);
    const b = _count_groups(_parse_input(input));
    console.log({ first: a, second: b });
}
main();
