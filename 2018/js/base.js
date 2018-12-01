"use strict";
const fs = require('fs');
const ramda = require('ramda');
function read_file(path) {
    return fs.readFileSync(path, 'utf8');
}
function main() {
    const input = read_file('../input/day_1.txt');
}
