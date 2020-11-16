/**
* Advent of Code 2017
* Day 13
*
* URL: http://adventofcode.com/2017/day/13
**/
import * as fs from 'fs';


interface FirewallJSON {
    range  :number;
    depth  :number;
    pos    :number;
    dir    :number;
}


function read_input(path :string) :string[] {
    return fs.readFileSync(path, 'utf8')
        .trim()
        .split('\n');
}

function process_input(input :string[]) :FirewallJSON[] {
    const lines :number[][] = input.map( (line) => line.split(': ').map( (n) => parseInt(n) ) );
    const last  :number     = lines[ lines.length-1 ][0];
    
    const fw = new Array(last+1);
    
    for(let i = 0; i <= last; i++) {
        fw[i] = {
            range  : 0,
            depth  : 0,
            pos    : 0,
            dir    : 1
        };
    }
    
    for(const parts of lines) {
        const [range, depth] = [ parts[0], parts[1] ];
        
        fw[range].range = range;
        fw[range].depth = depth;
    }
    
    return fw;
}

function clone_fw(fw :FirewallJSON[]) :FirewallJSON[] {
    let _fw = new Array(fw.length);
    
    for(let i = 0; i < fw.length; i++) {
        _fw[i] = {
            range  : fw[i].range,
            depth  : fw[i].depth,
            pos    : fw[i].pos,
            dir    : fw[i].dir
        };
    }
    
    return _fw;
}

// see if it can go farther
// if not reverse dir and retroceed one
function next_pos(depth :number, pos :number, dir :number) :number[] {
    let _dir = dir;
    
    if( (_dir === 1 && pos === depth-1) || (_dir === -1 && pos === 0) ) {
        _dir *= -1;
    }
    
    return [pos + _dir, _dir];
}

function next_ps(fw :FirewallJSON[], i :number) :FirewallJSON[] {
    let _fw = clone_fw(fw);
    
    for(let j = i+1; j < _fw.length; j++) {
        const {depth, pos, dir} = _fw[j];
        
        [ _fw[j].pos, _fw[j].dir ] = next_pos(depth, pos, dir);
    }
    
    return _fw;
}

function severity(fw :FirewallJSON[], return_caught :boolean) :number {
    let _fw = clone_fw(fw);
    let s = 0;
    
    for(let i = 0; i < _fw.length; i++) {
        // Caught
        if(_fw[i].pos === 0) {
            if(return_caught) {
                return 1;
            }
            else {
                s += _fw[i].range * _fw[i].depth;
            }
        }
        
        _fw = next_ps(_fw, i);
    }
    
    return s;
}

function delay(fw :FirewallJSON[]) :number {
    let _fw = clone_fw(fw);
    let i :number;
    let s :number;
    
    for(i = 0;; i++) {
        //if(i === 500000) process.exit();
        s = severity(_fw, true);
        
        if(s === 0) break;
        else        _fw = next_ps(_fw, -1);
    }
    
    return i;
}

function main() {
    const input :string[]       = read_input('../../input/day_13.txt');
    const fw    :FirewallJSON[] = process_input(input);
    
    const a = severity(fw, false);
    const b = delay(fw);
    
    console.log(a, b);
}


main();
