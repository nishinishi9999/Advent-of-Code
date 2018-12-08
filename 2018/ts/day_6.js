"use strict";
exports.__esModule = true;
var Util = require("./util");
var Node = /** @class */ (function () {
    function Node(x, y, dist, n) {
        this.y = y;
        this.x = x;
        this.dist = dist;
        this.n = n;
    }
    return Node;
}());
function format_input(input) {
    return input.map(function (_) {
        return _.split(', ').map(function (_) {
            return parseInt(_);
        });
    });
}
function init_nodes(coords) {
    return coords.map(function (_a, i) {
        var x = _a[0], y = _a[1];
        return new Node(x, y, -1, i);
    });
}
function fill_nodes(nodes, node, max_dist) {
    if (node.dist < max_dist) {
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (_a) {
            var y_diff = _a[0], x_diff = _a[1];
            var _b, _c;
            var y = node.y + y_diff;
            var x = node.x + x_diff;
            if (nodes[y] && nodes[y][x]) {
                if (nodes[y][x].n !== node.n && nodes[y][x].dist > node.dist + 1) {
                    nodes[y][x].dist = node.dist + 1;
                    nodes[y][x].n = node.n;
                    fill_nodes(nodes, nodes[y][x], max_dist);
                }
            }
            else {
                var _node = new Node(x, y, node.dist + 1, node.n);
                Object.assign(nodes, (_b = {}, _b[y] = (_c = {}, _c[x] = _node, _c), _b));
                fill_nodes(nodes, _node, max_dist);
            }
        });
    }
}
function first(nodes) {
    var _nodes = {};
    var max_dist = 100;
    Object.values(nodes).forEach(function (node) {
        console.log(node);
        fill_nodes(nodes, node, max_dist);
    });
    console.log(nodes);
    return 1;
}
function main() {
    var coords = format_input(Util.format_as_strings(Util.read_file('input/day_6.txt')));
    var nodes = init_nodes(coords);
    var _first = first(nodes);
    //console.log('First:', _first);
}
main();
