"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonfile = __importStar(require("jsonfile"));
function has_red(obj) {
    return Object.keys(obj).some(key => obj[key] === 'red');
}
function traverse_json(obj, ignore_red) {
    // Number
    if (typeof (obj) === 'number') {
        return obj;
    }
    // String
    else if (typeof (obj) === 'string') {
        return 0;
    }
    // Array
    else if (obj.length !== undefined) {
        return obj.map((_obj) => traverse_json(_obj, ignore_red))
            .reduce((acc, n) => acc + n, 0);
    }
    // JSON
    else {
        if (ignore_red && has_red(obj)) {
            return 0;
        }
        else {
            return Object.keys(obj).map(key => traverse_json(obj[key], ignore_red))
                .reduce((acc, n) => acc + n, 0);
        }
    }
}
function main() {
    const input = jsonfile.readFileSync('../../input/day_12.json');
    const first = traverse_json(input, false);
    const second = traverse_json(input, true);
    console.log({ first, second });
}
main();
