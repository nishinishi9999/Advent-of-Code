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
function process_coords(input) {
    return input.map(line => {
        const match = line.match(/position=<\s*(-?\d+),\s+(-?\d+)> velocity=<\s*(-?\d+),\s+(-?\d+)>/);
        if (match && match.length === 5) {
            return {
                pos: {
                    y: parseInt(match[2]),
                    x: parseInt(match[1])
                },
                v: {
                    y: parseInt(match[4]),
                    x: parseInt(match[3])
                }
            };
        }
        else {
            console.log(match);
            throw 'No match: ' + line;
        }
    });
}
function step(coords) {
    coords.forEach(coord => {
        coord.pos.y += coord.v.y;
        coord.pos.x += coord.v.x;
    });
}
function has_message(coords) {
    let neighbors_n = 0;
    for (let i = 0; i < coords.length; i++) {
        let has_neighbors = false;
        for (let j = 0; j < coords.length; j++) {
            const abs_y = Math.abs(coords[i].pos.y - coords[j].pos.y);
            const abs_x = Math.abs(coords[i].pos.x - coords[j].pos.x);
            if (abs_y === 1 && abs_x === 0 || abs_y === 0 && abs_x === 1) {
                has_neighbors = true;
                neighbors_n++;
                break;
            }
        }
    }
    return neighbors_n * 100 / coords.length > 80;
}
function find_message(coords) {
    let s = 0;
    for (; !has_message(coords); s++) {
        step(coords);
    }
    const a = Array(200).fill(0).map(_ => Array(250).fill(' '));
    coords.forEach(coord => a[coord.pos.y + 20][coord.pos.x + 20] = '#');
    a.forEach(line => console.log(line.join('')));
    return s;
}
function main() {
    const path = './input/day_10.txt';
    const input = Util.format_as_strings(Util.read_file(path));
    const coords = process_coords(input);
    const secs = find_message(coords);
    console.log('Secs:', secs);
}
main();
