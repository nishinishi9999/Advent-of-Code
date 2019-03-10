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
exports.read_file = (path) => fs.readFileSync(path, 'utf8');
exports.lines = (file) => file.split('\n').filter(_ => _);
exports.numbers = (file) => exports.lines(file).map(n => parseInt(n));
exports.char_arrs = (file) => exports.lines(file).map(_ => _.split(''));
// JSON manipulation
exports.inc_key = (json, key) => {
    const _key = key.toString();
    return { [_key]: json[_key] ? json[_key] + 1 : 1 };
};
function obj_sum(obj) {
    return Object.values(obj).reduce((acc, n) => acc + n);
}
exports.obj_sum = obj_sum;
function obj_max(obj) {
    return Object.keys(obj).sort((a, b) => obj[b] - obj[a])[0];
}
exports.obj_max = obj_max;
function obj_min(obj) {
    return Object.keys(obj).sort((a, b) => obj[a] - obj[b])[0];
}
exports.obj_min = obj_min;
function obj_find_key(obj, val) {
    return Object.keys(obj).find(key => obj[key] === val);
}
exports.obj_find_key = obj_find_key;