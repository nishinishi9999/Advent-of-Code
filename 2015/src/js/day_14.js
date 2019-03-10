"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// day 14
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map((line) => line.substr(0, line.length - 1).split(' '));
}
function parse_input(input) {
    let reindeer = {};
    for (let i = 0; i < input.length; i++) {
        reindeer[input[i][0]] = {
            v: parseInt(input[i][3]),
            pos: 0,
            fly_t: parseInt(input[i][6]),
            rest_t: parseInt(input[i][input[i].length - 2]),
            counter: parseInt(input[i][6]),
            resting: false,
            points: 0
        };
    }
    return reindeer;
}
function clone_reindeers(reindeers) {
    let _reindeers = {};
    for (const key in reindeers) {
        _reindeers[key] = Object.assign({}, reindeers[key]);
    }
    return _reindeers;
}
function next_second(reindeers) {
    let _reindeers = clone_reindeers(reindeers);
    for (const name in _reindeers) {
        let reindeer = _reindeers[name];
        reindeer.counter--;
        if (!reindeer.resting) {
            reindeer.pos += reindeer.v;
            if (reindeer.counter === 0) {
                reindeer.counter = reindeer.rest_t;
                reindeer.resting = true;
            }
        }
        else {
            if (reindeer.counter === 0) {
                reindeer.counter = reindeer.fly_t;
                reindeer.resting = false;
            }
        }
    }
    return _reindeers;
}
function leading_reindeer(reindeers, sort_by) {
    let sort = Object.keys(reindeers).sort((a, b) => reindeers[b][sort_by] - reindeers[a][sort_by]);
    // All reindeers tied with the first (including itself)
    return sort.filter((name) => reindeers[name][sort_by] === reindeers[sort[0]][sort_by]);
}
function increment_points(reindeers) {
    let _reindeers = clone_reindeers(reindeers);
    for (const name of leading_reindeer(_reindeers, 'pos')) {
        _reindeers[name].points++;
    }
    return _reindeers;
}
function winning_reindeer(reindeers, round_n) {
    let _reindeers = clone_reindeers(reindeers);
    for (let i = 0; i < round_n; i++) {
        _reindeers = next_second(_reindeers);
    }
    return _reindeers[leading_reindeer(_reindeers, 'pos')[0]].pos;
}
function _winning_reindeer(reindeers, round_n) {
    let _reindeers = clone_reindeers(reindeers);
    for (let i = 0; i < round_n; i++) {
        _reindeers = increment_points(next_second(_reindeers));
    }
    return _reindeers[leading_reindeer(_reindeers, 'points')[0]].points;
}
function main() {
    let input = read_input('input/day_14.txt');
    let reindeers = parse_input(input);
    const round_n = 2503;
    //const round_n = 1000;
    const a = winning_reindeer(reindeers, round_n);
    const b = _winning_reindeer(reindeers, round_n);
    console.log({ first: a, second: b });
}
main();
