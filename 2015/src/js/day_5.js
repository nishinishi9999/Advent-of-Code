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
function is_nice(str) {
    const match = str.match(/[aiueo]/g);
    return !/ab|cd|pq|xy/.test(str)
        && /(\w)\1/.test(str)
        && /[aiueo]/.test(str)
        && match !== null && match.length >= 3;
}
function _is_nice(str) {
    return /(\w{2}).*\1/.test(str)
        && /(\w).\1/.test(str);
}
function main() {
    const input = Util.read_lines('../../input/day_5.txt');
    const first = input.filter(is_nice).length;
    const second = input.filter(_is_nice).length;
    console.log({ first, second });
}
main();
