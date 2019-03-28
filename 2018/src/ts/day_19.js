"use strict";
exports.__esModule = true;
var Util = require("./util");
var ASM = /** @class */ (function () {
    function ASM(code, reg0) {
        var _a;
        this.reg = Array(6).fill(0);
        this.reg[0] = reg0;
        _a = this.parse_code(code), this.ip = _a[0], this.instr = _a[1];
    }
    ASM.prototype.parse_code = function (code) {
        var lines = Util.lines(code);
        return [
            parseInt(lines[0][4]),
            lines.slice(1).map(function (_) { return _.split(' '); }).map(function (_a) {
                var op = _a[0], a = _a[1], b = _a[2], c = _a[3];
                return ({
                    op: op,
                    a: parseInt(a),
                    b: parseInt(b),
                    c: parseInt(c)
                });
            })
        ];
    };
    ASM.prototype.run = function () {
        for (; this.reg[this.ip] < this.instr.length; this.reg[this.ip]++) {
            var instr = this.instr[this.reg[this.ip]];
            this.reg[instr.c] = this[instr.op](instr.a, instr.b);
        }
        return this.reg[0];
    };
    ASM.prototype.addr = function (a, b) { return this.reg[a] + this.reg[b]; };
    ASM.prototype.addi = function (a, b) { return this.reg[a] + b; };
    ASM.prototype.mulr = function (a, b) { return this.reg[a] * this.reg[b]; };
    ASM.prototype.muli = function (a, b) { return this.reg[a] * b; };
    ASM.prototype.banr = function (a, b) { return this.reg[a] & this.reg[b]; };
    ASM.prototype.bani = function (a, b) { return this.reg[a] & b; };
    ASM.prototype.borr = function (a, b) { return this.reg[a] | this.reg[b]; };
    ASM.prototype.bori = function (a, b) { return this.reg[a] | b; };
    ASM.prototype.setr = function (a, b) { return this.reg[a]; };
    ASM.prototype.seti = function (a, b) { return a; };
    ASM.prototype.gtir = function (a, b) { return a > this.reg[b] ? 1 : 0; };
    ASM.prototype.gtri = function (a, b) { return this.reg[a] > b ? 1 : 0; };
    ASM.prototype.gtrr = function (a, b) { return this.reg[a] > this.reg[b] ? 1 : 0; };
    ASM.prototype.eqir = function (a, b) { return a === this.reg[b] ? 1 : 0; };
    ASM.prototype.eqri = function (a, b) { return this.reg[a] === b ? 1 : 0; };
    ASM.prototype.eqrr = function (a, b) { return this.reg[a] === this.reg[b] ? 1 : 0; };
    return ASM;
}());
function part2() {
    var reg = Array(6).fill(0);
    //reg[0] = 1;
    var ip = 17;
    var past = [];
    while (ip < 36) {
        if (![0, 1, 2, 3, 6, 7, 8, 11, 12, 15, 16, 17, 26, 27].includes(ip))
            console.log(ip);
        //console.log(ip, reg);
        //past.push({ip, reg: reg.slice()});
        switch (ip) {
            case 1:
                reg[3] = 1;
                reg[1] = 1;
                reg[2] = reg[3] * reg[1] === reg[5] ? 1 : 0;
                ip = reg[2] + 6; // 6 | 7
                break;
            case 2:
                reg[1] = 1;
                reg[2] = reg[3] * reg[1] === reg[5] ? 1 : 0;
                ip = reg[2] + 6; // 6 | 7
                break;
            case 3:
                reg[2] = reg[3] * reg[1] === reg[5] ? 1 : 0;
                ip = reg[2] + 6; // 6 | 7
                break;
            case 6:
                reg[1]++;
                reg[2] = reg[1] > reg[5] ? 1 : 0;
                ip = reg[2] + 11;
                break;
            case 7:
                reg[1]++;
                reg[0] += reg[3];
                reg[2] = reg[1] > reg[5] ? 1 : 0;
                ip = reg[2] + 11; // 11 | 12
                break;
            case 8:
                reg[1]++;
                reg[2] = reg[1] > reg[5] ? 1 : 0;
                ip = reg[2] + 11; // 11 | 12
                break;
            case 11:
                reg[2] = reg[3] * reg[1] === reg[5] ? 1 : 0;
                ip = reg[2] + 6; // 6 | 7
                break;
            case 12:
                reg[3]++;
                reg[2] = reg[3] > reg[5] ? 1 : 0;
                ip = reg[2] + 15; // 15 | 16
                break;
            case 15:
                reg[1] = 1;
                reg[2] = reg[3] === reg[5] ? 1 : 0;
                ip = reg[2] + 6; // 6 | 7
                break;
            case 16:
                ip = 257;
                break;
            case 17:
                reg[5] = Math.pow((reg[5] + 2), 2) * 19 * 11;
                reg[2] = (reg[2] + 4) * 22 + 5; // 5 | 93
                reg[5] += reg[2];
                ip = reg[0] + 26; // 26 | 27
                break;
            case 26:
                reg[3] = 1;
                reg[1] = 1;
                reg[2] = reg[5] === 1 ? 1 : 0;
                ip = reg[2] + 6; // 6 | 7
                break;
            case 27:
                reg[5] += (27 * 28 + 29) * 30 * 14 * 32;
                reg[0] = 0;
                reg[3] = 1;
                reg[1] = 3;
                reg[2] = 0;
                ip = 11;
                break;
            default: throw ip;
        }
    }
    //console.log(past.slice(-100));
    return reg[0];
}
function main() {
    var code = Util.read_file('./input/day_19.txt');
    var asm = new ASM(code);
    //console.log('First:',  new ASM(code, 0).run());
    console.log('Second:', part2());
}
main();
