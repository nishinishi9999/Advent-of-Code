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
function* bin_gen(len) {
    const target = 2 ** len;
    let bin = '';
    let n;
    for (n = 0; n < target; n++) {
        bin = n.toString(2)
            .padStart(len, '0');
        yield bin;
    }
}
function find_pos(input, target) {
    const gen = bin_gen(input.length);
    const n = {};
    let pos = 0;
    let done = false;
    let bin;
    let total;
    while (true) {
        let next = gen.next();
        bin = next.value;
        done = next.done;
        if (done) {
            break;
        }
        else {
            total = 0;
            for (let i = 0; i < bin.length; i++) {
                if (bin[i] === '1')
                    total += input[i];
                if (total > target)
                    break;
            }
        }
        if (total === target) {
            const len = bin.split('').filter((_n) => _n === '1').length;
            pos++;
            if (n[len] === undefined)
                n[len] = 1;
            else
                n[len]++;
        }
    }
    return [
        pos,
        // min
        n[Object.keys(n).sort((a, b) => parseInt(a) - parseInt(b))[0]]
    ];
}
function main() {
    const input = Util.read_numbers('../../input/day_17.txt');
    const target = 150;
    const [first, second] = find_pos(input, target);
    console.log({ first, second });
}
main();
