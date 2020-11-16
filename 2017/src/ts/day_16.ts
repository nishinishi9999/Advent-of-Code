/**
* Advent of Code 2017
* Day 16
*
* URL: http://adventofcode.com/2017/day/16
**/
import * as fs from 'fs';


interface CmdJSON {
    cmd  :string;
    args :number[] | string[];
}


function read_input(path :string) :string[] {
    return fs.readFileSync(path, 'utf8')
        .split(',');
}

function clone_cmd(cmd :CmdJSON[]) {
    return cmd.map( (c :CmdJSON) => ({ cmd: c.cmd, args: c.args.slice() }) );
}

function parse_input(input :string[]) :CmdJSON[] {
    return input.map( (line) => {
        const cmd  = line[0];
        const args = line.substr(1);
        
        return {
            cmd: cmd,
            args: cmd === 's'
                ? [parseInt(args)]
                : cmd === 'x'
                    ? args.split('/').map( (n) => parseInt(n) )
                    : args.split('/')
        };
    });
}

function spin(arr :string[], n :number) :string[] {
    let last  :string;
    let _arr = arr.slice();
    let temp  :string;
    let temp2 :string;
    let i     :number;
    let j     :number;
    
    
    for(i = 0; i < n; i++) {
        last = _arr[_arr.length-1];
        temp = _arr[0];
        
        for(j = 0; j < _arr.length-1; j++) {
            temp2     = _arr[j+1];
            _arr[j+1] = temp;
            temp      = temp2;
        }
        
        _arr[0] = last;
    }
    
    return _arr;
}

function exchange(arr :string[], i :number, j :number) :string[] {
    let _arr = arr.slice();
    let temp :string;
        
    temp    = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = temp;
        
    return _arr;
}

function partner(arr :string[], a :string, b :string) :string[] {
    return exchange(arr, arr.indexOf(a), arr.indexOf(b));
}

function exec_cmd(cmd :string, args :number[] | string[], arr :string[]) :string[] | never {
    switch(cmd) {
        case 's' : return spin    ( arr, <number>args[0] );
        case 'x' : return exchange( arr, <number>args[0], <number>args[1] );
        case 'p' : return partner ( arr, <string>args[0], <string>args[1] );
        default  : throw Error('Unknown command: ' + cmd);
    }
}

function repetition_index(cmd :CmdJSON[], arr :string[]) :number {
    const round_n = 1000000;
    let _cmd    = clone_cmd(cmd);
    let _arr    = arr.slice();
    let arr_str = arr.join('');
    let i :number;
    let j :number;
    
    for(i = 0; i < round_n; i++) {
        for(j = 0; j < _cmd.length; j++) {
            _arr = exec_cmd(_cmd[j].cmd, _cmd[j].args, _arr);
        }
        
        if(arr_str === _arr.join('')) {
            return i;
        }
    }
    
    return 0;
}

function exec_cmd_list(cmd :CmdJSON[], round_n :number) :string {
    let _cmd    = clone_cmd(cmd);
    let arr     = 'abcdefghijklmnop'.split('');
    
    const rep_index = repetition_index(_cmd, arr);
    
    
    for(let j = 0; j < round_n % (rep_index+1); j++) {
        for(let i = 0; i < _cmd.length; i++) {
            arr = exec_cmd(_cmd[i].cmd, _cmd[i].args, arr);
        }
    }
        
    
    return arr.join('');
}

function main() :void {
    const input = read_input('../../input/day_16.txt');
    const cmd   = parse_input(input);
    
    const a = exec_cmd_list(cmd, 1);
    const b = exec_cmd_list(cmd, 1000000000);
    
    console.log({ first: a, second: b });
}


main();
