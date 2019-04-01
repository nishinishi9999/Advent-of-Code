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
function parse_input(input) {
    let dist = {};
    input.forEach(line => {
        const parts = line.split(' ');
        const [a, b, _dist] = [parts[0], parts[2], parts[4]];
        if (dist[a] === undefined)
            dist[a] = {};
        if (dist[b] === undefined)
            dist[b] = {};
        dist[a][b] = parseInt(_dist);
        dist[b][a] = parseInt(_dist);
    });
    return dist;
}
function shortest_distance(dist, from, n, past) {
    switch (past.length === Object.keys(dist).length) {
        case true: return n;
        default: return Object.keys(dist[from]).map((to) => {
            switch (past.includes(to)) {
                case true: return Infinity;
                default: return shortest_distance(dist, to, n + dist[from][to], past.concat(to));
            }
        })
            .sort((a, b) => a - b)[0];
    }
}
function longest_distance(dist, from, n, past) {
    switch (past.length === Object.keys(dist).length) {
        case true: return n;
        default: return Object.keys(dist[from]).map((to) => {
            switch (past.includes(to)) {
                case true: return 0;
                default: return longest_distance(dist, to, n + dist[from][to], past.concat(to));
            }
        })
            .sort((a, b) => b - a)[0];
    }
}
function find_shortest(dist) {
    let shortest = Infinity;
    for (const from in dist) {
        const d = shortest_distance(dist, from, 0, [from]);
        if (d < shortest)
            shortest = d;
    }
    return shortest;
}
function find_longest(dist) {
    let longest = 0;
    for (const from in dist) {
        const d = longest_distance(dist, from, 0, [from]);
        if (d > longest)
            longest = d;
    }
    return longest;
}
function main() {
    const input = Util.read_lines('../../input/day_9.txt');
    const dist = parse_input(input);
    const first = find_shortest(dist);
    const second = find_longest(dist);
    console.log({ first, second });
}
main();
