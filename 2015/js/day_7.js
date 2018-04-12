"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// day 7
const fs = require("fs");
function read_input(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map((line) => line.split(' '));
}
function parse_val(value) {
    return Number.isInteger(parseInt(value))
        ? parseInt(value)
        : value;
}
function parse_cmd(input) {
    return input.map((arr) => {
        switch (arr.length === 3) {
            case true: return {
                cmd: 'SET',
                args: [parse_val(arr[0])],
                to: arr[2],
                done: false
            };
            default: {
                switch (arr.length === 4) {
                    case true: return {
                        cmd: arr[0],
                        args: [parse_val(arr[1])],
                        to: arr[3],
                        done: false
                    };
                    default: return {
                        cmd: arr[1],
                        args: [parse_val(arr[0]), parse_val(arr[2])],
                        to: arr[4],
                        done: false
                    };
                }
            }
        }
    });
}
function get_val(wires, value) {
    return typeof (value) === 'number'
        ? value
        : wires[value];
}
function are_wires_ready(args, wires) {
    for (let i = 0; i < args.length; i++) {
        if (typeof (args[i]) === 'string' && wires[args[i]] === undefined)
            return false;
    }
    return true;
    /*
    return args.every( (arg) =>
        typeof(arg) === 'number' || wires[arg] !== undefined
    );
    */
}
function set_wire(wires, to, value) {
    let _wires = Object.assign({}, wires);
    _wires[to] = value;
    return _wires;
}
function run_cmd(cmd, wires) {
    switch (are_wires_ready(cmd.args, wires)) {
        case true: {
            switch (cmd.cmd) {
                case 'SET': return [true, set_wire(wires, cmd.to, get_val(wires, cmd.args[0]))];
                case 'AND': return [true, set_wire(wires, cmd.to, get_val(wires, cmd.args[0]) & get_val(wires, cmd.args[1]))];
                case 'OR': return [true, set_wire(wires, cmd.to, get_val(wires, cmd.args[0]) | get_val(wires, cmd.args[1]))];
                case 'NOT': return [true, set_wire(wires, cmd.to, 65535 - get_val(wires, cmd.args[0]))];
                case 'LSHIFT': return [true, set_wire(wires, cmd.to, get_val(wires, cmd.args[0]) << get_val(wires, cmd.args[1]))];
                case 'RSHIFT': return [true, set_wire(wires, cmd.to, get_val(wires, cmd.args[0]) >> get_val(wires, cmd.args[1]))];
                default: throw Error('Command not valid: ' + cmd.cmd);
            }
        }
        default: return [false, wires];
    }
}
function simulate(cmd, wires) {
    let done_n = 0;
    let success;
    for (let i = 0; done_n < cmd.length; i = (i + 1) % cmd.length) {
        if (cmd[i].done === false) {
            [success, wires] = run_cmd(cmd[i], wires);
            if (success) {
                cmd[i].done = true;
                done_n++;
            }
        }
    }
    return wires['a'];
}
function main() {
    let input = read_input('input/day_7.txt');
    const a = simulate(parse_cmd(input), {});
    const b = simulate(parse_cmd(input), { b: a });
    console.log({ first: a, second: b });
}
main();
