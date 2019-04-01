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
function parse_arg(val) {
    const _val = parseInt(val);
    return Number.isInteger(_val)
        ? { arg_type: 'num', val: _val }
        : { arg_type: 'sig', val: val };
}
function parse_input(input) {
    return input.map(line => {
        const parts = line.split(' ');
        switch (parts.length) {
            case 3: return {
                cmd: "TO",
                arg1: parse_arg(parts[0]),
                to: parts[2],
                arg_n: 1
            };
            case 4: return {
                cmd: 'NOT',
                arg1: parse_arg(parts[1]),
                to: parts[3],
                arg_n: 1
            };
            case 5: return {
                cmd: parts[1],
                arg1: parse_arg(parts[0]),
                arg2: parse_arg(parts[2]),
                to: parts[4],
                arg_n: 2
            };
            default: throw Error("Cannot parse command: " + line);
        }
    });
}
class Machine {
    constructor(cmd, signals = {}) {
        this.MAX_VAL = 65535;
        this.signals = signals;
        this.cmd = cmd.slice();
        this.ptr = 0;
        this.done = 0;
    }
    get_val(arg) {
        if (arg.arg_type == 'num')
            return arg.val;
        else
            return this.signals[arg.val];
    }
    has_val(arg) {
        return arg.arg_type == 'num' || this.signals[arg.val] !== undefined;
    }
    can_run(cmd) {
        return this.has_val(cmd.arg1) && (cmd.arg_n == 1 || this.has_val(cmd.arg2));
    }
    not(n) { return n >= 0 ? this.MAX_VAL - n : this.MAX_VAL + n; }
    and(n, m) { return n & m; }
    or(n, m) { return n | m; }
    lshift(n, m) { return n << m; }
    rshift(n, m) { return n >> m; }
    run() {
        for (; this.cmd.length; this.ptr = (this.ptr + 1) % this.cmd.length) {
            const cmd = this.cmd[this.ptr];
            if (this.can_run(cmd)) {
                const a = this.get_val(cmd.arg1);
                const b = (cmd.arg_n == 2 ? this.get_val(cmd.arg2) : 0);
                let val;
                switch (cmd.cmd) {
                    case 'TO':
                        val = a;
                        break;
                    case 'NOT':
                        val = this.not(a);
                        break;
                    case 'AND':
                        val = this.and(a, b);
                        break;
                    case 'OR':
                        val = this.or(a, b);
                        break;
                    case 'LSHIFT':
                        val = this.lshift(a, b);
                        break;
                    case 'RSHIFT':
                        val = this.rshift(a, b);
                        break;
                }
                if (this.signals[cmd.to] === undefined)
                    this.signals[cmd.to] = val;
                this.cmd.splice(this.ptr, 1);
                this.ptr = 0;
            }
        }
        return this.signals.a;
    }
}
function main() {
    const input = Util.read_lines('../../input/day_7.txt');
    const cmd = parse_input(input);
    const first = new Machine(cmd).run();
    const second = new Machine(cmd, { b: first }).run();
    console.log({ first, second });
}
main();
