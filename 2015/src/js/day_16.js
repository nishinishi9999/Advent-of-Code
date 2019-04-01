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
    return input.map(line => {
        const attrs = line.match(/(\w+) (\d+)|(\w+): (\d+)/g);
        if (!attrs)
            throw 'Couldn\'t parse input';
        const grandma = {
            children: -1,
            cats: -1,
            samoyeds: -1,
            pomeranians: -1,
            vizslas: -1,
            goldfish: -1,
            trees: -1,
            cars: -1,
            perfumes: -1
        };
        for (let i = 1; i < attrs.length; i++) {
            const [attr, val] = attrs[i].split(': ');
            grandma[attr] = parseInt(val);
        }
        return grandma;
    });
}
function is_subset(a, b) {
    return Object.keys(a).every((key) => a[key] === -1 || a[key] === b[key]);
}
function is_sue(a, b) {
    return Object.keys(a).every((key) => {
        switch (key) {
            case 'cats':
            case 'trees': return a[key] === -1 || b[key] < a[key];
            case 'pomeranians':
            case 'goldfish': return a[key] === -1 || b[key] > a[key];
            default: return a[key] === -1 || b[key] === a[key];
        }
    });
}
function find_grandma(grandma, target, i) {
    if (i == grandma.length)
        return -1;
    if (is_subset(grandma[i], target))
        return i + 1;
    else
        return find_grandma(grandma, target, i + 1);
}
function _find_grandma(grandma, target, i) {
    if (i == grandma.length)
        return -1;
    if (is_sue(grandma[i], target))
        return i + 1;
    else
        return _find_grandma(grandma, target, i + 1);
}
function main() {
    const input = Util.read_lines('../../input/day_16.txt');
    const grandma = parse_input(input);
    const target = {
        children: 3,
        cats: 7,
        samoyeds: 2,
        pomeranians: 3,
        akitas: 0,
        vizslas: 0,
        goldfish: 5,
        trees: 3,
        cars: 2,
        perfumes: 1
    };
    const first = find_grandma(grandma, target, 0);
    const second = _find_grandma(grandma, target, 0);
    console.log({ first, second });
}
main();
