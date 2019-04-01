"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
function read_chars(path) {
    return fs.readFileSync(path, 'utf8')
        .trim()
        .split('');
}
exports.read_chars = read_chars;
function read_lines(path) {
    return fs.readFileSync(path, 'utf8')
        .trim()
        .split('\n');
}
exports.read_lines = read_lines;
function read_numbers(path) {
    return read_lines(path).map(Number);
}
exports.read_numbers = read_numbers;
