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
function parse_input(lines, A) {
    const steps = {};
    A.forEach(c => steps[c] = { req: [], state: 0 });
    lines.forEach(line => {
        const [req, step] = [line[5], line[36]];
        steps[step].req.push(req);
    });
    return steps;
}
function is_done(steps) {
    return Object.values(steps).every(_ => _.state === 2);
}
function first_ready(steps, A) {
    return A.find(c => steps[c].state === 0 && steps[c].req.every(_c => steps[_c].state === 2));
}
function first(steps, A) {
    const order = [];
    while (!is_done(steps)) {
        const c = first_ready(steps, A);
        if (c) {
            steps[c].state = 2;
            order.push(c);
        }
        else {
            throw 'No requirement found: ' + c;
        }
    }
    return order.join('');
}
function work(worker, steps, A) {
    const c = first_ready(steps, A);
    if (c) {
        steps[c].state = 1;
        worker.c = c;
        worker.s = 61 + A.indexOf(c);
    }
}
function second(steps, A) {
    const order = [];
    const workers = Array(5).fill(0).map(() => ({ c: '', s: 0 }));
    const q = [];
    let s = 0;
    for (; !is_done(steps); s++) {
        workers.forEach(worker => {
            if (worker.s) {
                worker.s--;
                if (!worker.s && worker.c) {
                    steps[worker.c].state = 2;
                    worker.c = '';
                    work(worker, steps, A);
                }
            }
            else {
                work(worker, steps, A);
            }
        });
    }
    return s - 2;
}
function main() {
    const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const input = Util.format_as_strings(Util.read_file('input/day_7.txt'));
    const _first = first(parse_input(input, A), A);
    const _second = second(parse_input(input, A), A);
    console.log('First:', _first);
    console.log('Second:', _second);
}
main();
