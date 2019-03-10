"use strict";
exports.__esModule = true;
var fs = require("fs");
exports.read_file = function (path) { return fs.readFileSync(path, 'utf8'); };
exports.lines = function (file) { return file.split('\n').filter(function (_) { return _; }); };
exports.numbers = function (file) { return exports.lines(file).map(function (n) { return parseInt(n); }); };
exports.char_arrs = function (file) { return exports.lines(file).map(function (_) { return _.split(''); }); };
// JSON manipulation
exports.inc_key = function (json, key) {
    var _a;
    var _key = key.toString();
    return _a = {}, _a[_key] = json[_key] ? json[_key] + 1 : 1, _a;
};
function obj_sum(obj) {
    return Object.values(obj).reduce(function (acc, n) { return acc + n; });
}
exports.obj_sum = obj_sum;
function obj_max(obj) {
    return Object.keys(obj).sort(function (a, b) { return obj[b] - obj[a]; })[0];
}
exports.obj_max = obj_max;
function obj_min(obj) {
    return Object.keys(obj).sort(function (a, b) { return obj[a] - obj[b]; })[0];
}
exports.obj_min = obj_min;
function obj_find_key(obj, val) {
    return Object.keys(obj).find(function (key) { return obj[key] === val; });
}
exports.obj_find_key = obj_find_key;
