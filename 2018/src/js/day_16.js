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
class ASM {
    constructor(parts) {
        this.reg = [0, 0, 0, 0];
        this.state = this.parse_samples(parts[0]);
        this.code = this.parse_code(parts[1]);
        this.funcs = 'addr addi mulr muli banr bani borr bori setr seti gtir gtri gtrr eqir eqri eqrr'
            .split(' ');
        this.ops = this.find_ops();
    }
    parse_samples(input) {
        return input.split('\n\n').map(_ => {
            const lines = Util.lines(_);
            const [op, a, b, c] = lines[1].split(' ').map(Number);
            return {
                before: lines[0].split(': ')[1].slice(1, -1).split(', ').map(Number),
                after: lines[2].split(':  ')[1].slice(1, -1).split(', ').map(Number),
                op, a, b, c
            };
        });
    }
    parse_code(input) {
        return Util.lines(input).map(_ => _.split(' ').map(Number));
    }
    set_regs(arr) {
        for (let i = 0; i < arr.length; i++) {
            this.reg[i] = arr[i];
        }
    }
    are_equal(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }
    op_n() {
        return this.state.filter(s => {
            return this.funcs.filter(f_name => {
                this.set_regs(s.before);
                this.reg[s.c] = this[f_name](s.a, s.b);
                return this.are_equal(this.reg, s.after);
            }).length >= 3;
        }).length;
    }
    find_ops() {
        const ops = Array(16).fill('');
        let n = 0;
        while (ops.includes('')) {
            this.state.filter(s => ops[s.op] === '').forEach(s => {
                let f_names = [];
                this.funcs.forEach(f_name => {
                    this.set_regs(s.before);
                    this.reg[s.c] = this[f_name](s.a, s.b);
                    if (this.are_equal(this.reg, s.after))
                        f_names.push(f_name);
                });
                f_names = f_names.filter(f_name => !ops.includes(f_name));
                if (f_names.length === 1)
                    ops[s.op] = f_names[0];
            });
        }
        return ops;
    }
    run() {
        this.reg = [0, 0, 0, 0];
        this.code.forEach(([op, a, b, c]) => this.reg[c] = this[this.ops[op]](a, b));
        return this.reg[0];
    }
    addr(a, b) { return this.reg[a] + this.reg[b]; }
    addi(a, b) { return this.reg[a] + b; }
    mulr(a, b) { return this.reg[a] * this.reg[b]; }
    muli(a, b) { return this.reg[a] * b; }
    banr(a, b) { return this.reg[a] & this.reg[b]; }
    bani(a, b) { return this.reg[a] & b; }
    borr(a, b) { return this.reg[a] | this.reg[b]; }
    bori(a, b) { return this.reg[a] | b; }
    setr(a, b) { return this.reg[a]; }
    seti(a, b) { return a; }
    gtir(a, b) { return a > this.reg[b] ? 1 : 0; }
    gtri(a, b) { return this.reg[a] > b ? 1 : 0; }
    gtrr(a, b) { return this.reg[a] > this.reg[b] ? 1 : 0; }
    eqir(a, b) { return a === this.reg[b] ? 1 : 0; }
    eqri(a, b) { return this.reg[a] === b ? 1 : 0; }
    eqrr(a, b) { return this.reg[a] === this.reg[b] ? 1 : 0; }
}
function main() {
    const input = Util.read_file('./input/day_16.txt');
    const parts = input.split('\n\n\n');
    const asm = new ASM(parts);
    console.log('First:', asm.op_n());
    console.log('Second:', asm.run());
}
main();
