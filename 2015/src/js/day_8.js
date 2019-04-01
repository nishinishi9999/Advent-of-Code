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
function diff(str) {
    return str.length - eval(str).length;
}
function _diff(str) {
    return encoded_str(str).length - str.length;
}
function encoded_str(str) {
    return '"'
        + str.replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
        + '"';
}
function str_len_diff(input) {
    return input.map(diff).reduce((acc, n) => acc + n, 0);
}
function _str_len_diff(input) {
    return input.map(_diff).reduce((acc, n) => acc + n, 0);
}
function main() {
    const input = Util.read_lines('../../input/day_8.txt');
    const first = str_len_diff(input);
    const second = _str_len_diff(input);
    console.log({ first, second });
}
main();
