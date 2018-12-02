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
function count_letters(str) {
    const letters = str.split('');
    const occur = [...new Set(str)].map(l => letters.filter(_ => _ === l).length);
    return [occur.includes(2) ? 1 : 0, occur.includes(3) ? 1 : 0];
}
function sum_occur([a, b], [_a, _b]) {
    return [a + _a, b + _b];
}
function checksum(acc, n) {
    return acc * n;
}
function first(input) {
    return input.map(count_letters).reduce(sum_occur, [0, 0]).reduce(checksum);
}
function are_correct(n) {
    return n === 1;
}
function diff(a, b) {
    return a.split('').map((_, i) => a[i] !== b[i] ? 2 : 0).reduce((acc, n) => acc + n, 0);
}
function common_letters(a, b) {
    return a.split('').filter((_, i) => a[i] === b[i]).join('');
}
function second(input) {
    for (let i = 0; i < input.length; i++)
        for (let j = i + 1; j < input.length; j++)
            if (are_correct(diff(input[i], input[j])))
                return common_letters(input[i], input[j]);
    return '';
}
function main() {
    const path = 'input/day_2.txt';
    const input = Util.format_as_strings(Util.read_file(path));
    const [_first, _second] = [first(input), second(input)];
    console.log('First:', _first);
    console.log('Second:', _second);
}
main();
