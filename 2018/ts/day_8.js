"use strict";
exports.__esModule = true;
var Util = require("./util");
var Node = /** @class */ (function () {
    function Node(children, meta) {
        this.children = children;
        this.meta = meta;
    }
    return Node;
}());
/*
 *
 * - Consume child_n and meta_len
 * - Enqueue meta_len
 * - Create empty node
 *
 *   if child_n === 0:
 *   - Consume node meta
 *   - Enqueue node in children
 *
 *   if q.node[0] has all children:
 *     - Dequeue child_n
 *     - Dequeue node
 *     - Dequeue children
 *     - Consume meta
 *     - Assign children and meta to node
 *     - Enqueue node as children
 *
 *   else
 *     - Enqueue child_n
 *     - Enqueue empty children array
 *     - Enqueue node
 *
 */
var Parser = /** @class */ (function () {
    function Parser(input) {
        this.input = input;
        this.q = {
            child_n: [],
            meta_len: [],
            child: [[]],
            node: []
        };
    }
    Parser.prototype.has_all_children = function () {
        return this.q.child[0].length === this.q.child_n[0];
    };
    Parser.prototype.header = function () {
        return this.input.splice(0, 2);
    };
    Parser.prototype.meta = function () {
        return this.input.splice(0, this.q.meta_len.shift());
    };
    Parser.prototype.enqueue = function (node, children, child_n) {
        this.q.node.unshift(node);
        this.q.child.unshift(children);
    };
    Parser.prototype.parse = function () {
        while (this.input.length) {
            var node = new Node([], []);
            var _a = this.header(), child_n = _a[0], meta_len = _a[1];
            this.q.meta_len.unshift(meta_len);
            if (child_n === 0) {
                node.meta = this.meta();
                this.q.child[0].unshift(node);
                while (this.has_all_children()) {
                    var node_1 = this.q.node.shift();
                    node_1.children = this.q.child.shift();
                    node_1.meta = this.meta();
                    this.q.child_n.shift();
                    this.q.child[0].push(node_1);
                }
            }
            else {
                this.q.child_n.unshift(child_n);
                this.q.child.unshift([]);
                this.q.node.unshift(node);
            }
        }
        return this.q.child[0][0];
    };
    return Parser;
}());
function format_input(str) {
    return str.split(' ').filter(function (_) { return _; }).map(function (_) { return parseInt(_); });
}
function first(node) {
    return node.meta.concat(node.children.map(function (_node) {
        return first(_node);
    }))
        .reduce(function (acc, n) { return acc + n; }, 0);
}
function second(node) {
    if (!node.children.length)
        return node.meta.reduce(function (acc, n) { return acc + n; }, 0);
    else
        return node.meta.map(function (n) {
            if (node.children[n - 1])
                return second(node.children[n - 1]);
            else
                return 0;
        }).reduce(function (acc, n) { return acc + n; });
}
function main() {
    var path = 'input/day_8.txt';
    var input = format_input(Util.read_file(path));
    var root = new Parser(input).parse();
    var _first = first(root);
    var _second = second(root);
    console.log('First:', _first);
    console.log('Second:', _second);
}
main();
