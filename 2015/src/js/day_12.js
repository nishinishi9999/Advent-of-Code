"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// day 12
const jsonfile = require("jsonfile");
function read_input(path) {
    return jsonfile.readFileSync(path);
}
function has_red(object) {
    return Object.keys(object).some((key) => object[key] === 'red');
}
function traverse_json(object, ignore_red) {
    // Number
    if (typeof (object) === 'number') {
        return object;
    }
    else if (typeof (object) === 'string') {
        return 0;
    }
    else if (object.length !== undefined) {
        return object.map((obj) => traverse_json(obj, ignore_red))
            .reduce((acc, n) => acc + n, 0);
    }
    else {
        if (ignore_red && has_red(object)) {
            return 0;
        }
        else {
            return Object.keys(object).map((key) => traverse_json(object[key], ignore_red))
                .reduce((acc, n) => acc + n, 0);
        }
    }
}
function main() {
    let input = read_input('input/day_12.json');
    const a = traverse_json(input, false);
    const b = traverse_json(input, true);
    console.log({ first: a, second: b });
}
main();
