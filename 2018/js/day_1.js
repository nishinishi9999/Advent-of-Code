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
function first_repeated(acc, n) {
    const m = acc.n + n;
    if (acc.found)
        return acc;
    else if (acc.past[m])
        return Object.assign(acc, { n: m, found: true });
    else
        return Object.assign(acc, { n: m, past: Object.assign(acc.past, Util.inc_key(acc.past, m)) });
}
function first(xs) {
    return xs.reduce((acc, n) => acc + n);
}
function second(xs, acc) {
    const _acc = xs.reduce(first_repeated, acc);
    if (_acc.found)
        return _acc.n;
    else
        return second(xs, _acc);
}
function main() {
    const path = 'input/day_1.txt';
    const input = Util.format_as_numbers(Util.read_file(path));
    const def_acc = {
        found: false,
        n: 0,
        past: {}
    };
    const [_first, _second] = [first(input), second(input, def_acc)];
    console.log('First:', _first);
    console.log('Second:', _second);
}
main();
