"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Advent of Code 2017
* Day 20
*
* URL: http://adventofcode.com/2017/day/20
**/
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map((line) => line.split(', '));
}
function parse_input(input) {
    return input.map((arr) => {
        let pos = arr[0].match(/<(.+?),(.+?),(.+?)>/);
        let v = arr[1].match(/<(.+?),(.+?),(.+?)>/);
        let a = arr[2].match(/<(.+?),(.+?),(.+?)>/);
        return {
            pos: { x: parseInt(pos[1]), y: parseInt(pos[2]), z: parseInt(pos[3]) },
            v: { x: parseInt(v[1]), y: parseInt(v[2]), z: parseInt(v[3]) },
            a: { x: parseInt(a[1]), y: parseInt(a[2]), z: parseInt(a[3]) },
            collided: false
        };
    });
}
function clone_particle(p) {
    return {
        pos: Object.assign({}, p.pos),
        v: Object.assign({}, p.v),
        a: Object.assign({}, p.a),
        collided: p.collided
    };
}
function average_a(particle) {
    return Math.abs(particle.a.x) + Math.abs(particle.a.y) + Math.abs(particle.a.z);
}
function simulate(particle) {
    let min_a = Infinity;
    let min_i;
    for (let i = 0; i < particle.length; i++) {
        const a = average_a(particle[i]);
        if (a < min_a) {
            min_i = i;
            min_a = a;
        }
    }
    return min_i;
}
function next_tick(p) {
    let _p = clone_particle(p);
    ['x', 'y', 'z'].forEach((axis) => {
        _p.v[axis] = _p.v[axis] + _p.a[axis];
        _p.pos[axis] = _p.pos[axis] + _p.v[axis];
    });
    return _p;
}
function simulate_collision(particle, tick_n) {
    let key;
    let i;
    let j;
    for (i = 0; i < tick_n; i++) {
        let pos = {};
        for (j = 0; j < particle.length; j++) {
            if (!particle[j].collided) {
                particle[j] = next_tick(particle[j]);
                // Create a table of positions
                key = particle[j].pos.x
                    + ',' + particle[j].pos.y
                    + ',' + particle[j].pos.z;
                pos[key] = pos[key] === undefined ? [j] : pos[key].concat(j);
            }
        }
        // Delete repeated positions
        for (const _key in pos) {
            if (pos[_key].length > 1) {
                pos[_key].forEach((n) => {
                    particle[n].collided = true;
                });
            }
        }
    }
    return particle.filter((p) => !p.collided).length;
}
function main() {
    let input = read_input('input/day_20.txt');
    let particles = parse_input(input);
    const a = simulate(particles);
    const b = simulate_collision(particles, 100);
    console.log({ first: a, second: b });
}
main();
