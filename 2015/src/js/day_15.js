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
    const properties = {};
    input.forEach(line => {
        const parts = line.split(': ');
        properties[parts[0]] = {};
        for (const prop of parts[1].split(', ')) {
            const arr = prop.split(' ');
            properties[parts[0]][arr[0]] = parseInt(arr[1]);
        }
    });
    return properties;
}
function sum_prop(properties, prop, spoons) {
    const sum = Object.keys(properties).reduce((acc, name, i) => acc + (properties[name][prop] * spoons[i]), 0);
    return sum < 0 ? 0 : sum;
}
function search_highest(properties, props, i, spoon_n, spoons, max_spoons) {
    if (i === props.length - 1) {
        if (spoon_n === max_spoons)
            return spoons.reduce((acc, n, i) => acc * sum_prop(properties, props[i], spoons), 1);
        else
            return 0;
    }
    else {
        let high_n = 0;
        for (let j = 0; j + spoon_n <= max_spoons; j++) {
            let _n = search_highest(properties, props, i + 1, spoon_n + j, spoons.concat(j), max_spoons);
            if (_n > high_n)
                high_n = _n;
        }
        return high_n;
    }
}
function _search_highest(properties, props, i, spoon_n, spoons, max_spoons) {
    if (i === props.length) {
        if (spoon_n === max_spoons && sum_prop(properties, 'calories', spoons) === 500)
            return Array(spoons.length - 1).fill(0).reduce((acc, n, i) => acc * sum_prop(properties, props[i], spoons), 1);
        else
            return 0;
    }
    else {
        let high_n = 0;
        for (let j = 0; j + spoon_n <= max_spoons; j++) {
            let _n = _search_highest(properties, props, i + 1, spoon_n + j, spoons.concat(j), max_spoons);
            if (_n > high_n)
                high_n = _n;
        }
        return high_n;
    }
}
function main() {
    const input = Util.read_lines('../../input/day_15.txt');
    const properties = parse_input(input);
    const props = Object.keys(properties[Object.keys(properties)[0]]);
    const def_i = 0;
    const def_spoon_n = 0;
    const max_spoons = 100;
    const first = search_highest(properties, props, def_i, def_spoon_n, [], max_spoons);
    const second = _search_highest(properties, props, def_i, def_spoon_n, [], max_spoons);
    console.log({ first, second });
}
main();
