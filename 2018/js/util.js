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
exports.format_as_strings = (file) => file.split('\n')
    .filter(_ => _);
exports.format_as_numbers = (file) => exports.format_as_strings(file)
    .map(n => parseInt(n));
// JSON manipulation
exports.inc_key = (json, key) => {
    const _key = key.toString();
    return { [_key]: json[_key] ? json[_key] + 1 : 1 };
};
