"use strict";
exports.__esModule = true;
var fs = require("fs");
exports.read_file = function (path) { return fs.readFileSync(path, 'utf8'); };
exports.format_as_strings = function (file) { return file.split('\n')
    .filter(function (_) { return _; }); };
exports.format_as_numbers = function (file) { return exports.format_as_strings(file)
    .map(function (n) { return parseInt(n); }); };
// JSON manipulation
exports.inc_key = function (json, key) {
    var _a;
    var _key = key.toString();
    return _a = {}, _a[_key] = json[_key] ? json[_key] + 1 : 1, _a;
};
