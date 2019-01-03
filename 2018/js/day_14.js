"use strict";
const util = require('util');
class Elf {
    constructor(pos) {
        this.pos = pos;
    }
}
function split_n(n) {
    return n.toString().split('').map(Number);
}
function round(recipes, elves) {
    const a = recipes[elves[0]];
    const b = recipes[elves[1]];
    recipes.push(...split_n(a + b));
    elves[0] = (elves[0] + a + 1) % recipes.length;
    elves[1] = (elves[1] + b + 1) % recipes.length;
}
function first(off) {
    const elves = [0, 1];
    const recipes = [3, 7];
    while (recipes.length < off + 10)
        round(recipes, elves);
    return recipes.slice(off, off + 10).join('');
}
function second(n) {
    const elves = [0, 1];
    const recipes = [3, 7];
    const last = split_n(n);
    let i;
    let last_i = 0;
    while (true) {
        const a = recipes[elves[0]];
        const b = recipes[elves[1]];
        const _recipes = split_n(a + b);
        for (let j = 0; j < _recipes.length; j++) {
            if (_recipes[j] === last[last_i])
                last_i++;
            else
                last_i = 0;
            if (last_i === last.length)
                return recipes.length + j - last_i;
        }
        recipes.push(..._recipes);
        elves[0] = (elves[0] + a + 1) % recipes.length;
        elves[1] = (elves[1] + b + 1) % recipes.length;
    }
    return 0;
}
function main() {
    const input = 556061;
    console.log('First:', first(input));
    console.log('Second:', second(input));
}
main();
