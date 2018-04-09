"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Advent of Code 2017
* Day 7
*
* URL: http://adventofcode.com/2017/day/7
**/
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n');
}
function parse_input(input) {
    let nodes = {};
    for (let i = 0; i < input.length; i++) {
        let match = input[i].match(/(\w+) \((\d+)\)(?: -> (.+))?/);
        const name = match[1];
        const weight = match[2];
        nodes[name] = {
            name: match[1],
            weight: parseInt(match[2]),
            sub_weight: -1,
            children: [],
            parent: ''
        };
        if (match[3] !== undefined) {
            const children = match[3].split(', ');
            nodes[name].children = children;
        }
    }
    return nodes;
}
// Destructive behaviour!
function link_parents(nodes) {
    for (const key in nodes) {
        if (nodes[key].children.length > 0) {
            for (const child of nodes[key].children) {
                nodes[child].parent = key;
            }
        }
    }
    return nodes;
}
function tree_base(nodes) {
    return Object.keys(nodes).filter((key) => nodes[key].parent === '')[0];
}
function are_subtrees_balanced(nodes, parent) {
    return nodes[parent].children
        .every((child) => nodes[child].sub_weight === nodes[nodes[parent].children[0]].sub_weight);
}
// Balance node weight
function balanced_weight(nodes, parent, ideal) {
    switch (nodes[parent].sub_weight > ideal) {
        case true: return nodes[parent].weight - (nodes[parent].sub_weight - ideal);
        default: return nodes[parent].weight + (nodes[parent].sub_weight - ideal);
    }
}
// Find unbalanced child
function unbalanced_child(nodes, parent) {
    let children = nodes[parent].children.slice()
        .sort((a, b) => nodes[b].sub_weight - nodes[a].sub_weight);
    switch (nodes[children[0]].sub_weight === nodes[children[1]].sub_weight) {
        case true: return [children[children.length - 1], nodes[children[children.length - 1]].sub_weight];
        default: return [children[0], nodes[children[1]].sub_weight];
    }
}
// Destructive behaviour!
function add_subtree_weights(nodes, parent) {
    nodes[parent].sub_weight = nodes[parent].weight;
    for (const _parent of nodes[parent].children) {
        nodes[parent].sub_weight += nodes[_parent].sub_weight === -1
            ? add_subtree_weights(nodes, _parent)
            : nodes[_parent].sub_weight;
    }
    return nodes[parent].sub_weight;
}
/*
  Has it children?
    True:
      Is every child subtree balanced?
        True:
          Return balanced weight
        False:
          Go to unbalanced tree
    False:
      Return ideal weight
*/
function find_unbalanced(nodes, parent, ideal) {
    switch (nodes[parent].children.length > 0) {
        case true: {
            switch (are_subtrees_balanced(nodes, parent)) {
                case true: return balanced_weight(nodes, parent, ideal);
                default: {
                    const [_parent, _ideal] = unbalanced_child(nodes, parent);
                    return find_unbalanced(nodes, _parent, _ideal);
                }
            }
        }
        default: return ideal;
    }
}
function main() {
    let input = read_input('./input/day_7.txt');
    let nodes = link_parents(parse_input(input));
    const a = tree_base(nodes);
    add_subtree_weights(nodes, a);
    const b = find_unbalanced(nodes, a, 0);
    console.log({ first: a, second: b });
}
main();
