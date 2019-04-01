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
const pool = { '(': 1, ')': -1 };
function last_floor(input) {
    return input.reduce((acc, c) => acc + pool[c], 0);
}
function basement(input) {
    return input.reduce((acc, c, i) => {
        return acc[0] == -1 ? acc : [acc[0] + pool[c], i + 1];
    }, [0, 0])[1];
}
function main() {
    const input = Util.read_chars('../../input/day_1.txt');
    const first = last_floor(input);
    const second = basement(input);
    console.log({ first, second });
}
main();
