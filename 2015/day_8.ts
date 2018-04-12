// day 8
import * as fs from 'fs';


function read_input(path :string) {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n');
}

function diff(str :string) :number {
    return str.length - eval(str).length;
}

function encoded_str(str :string) {
    return '"'
        + str.replace(/\\/g, '\\\\')
             .replace(/"/g, '\\"')
        + '"';
}

function str_len_diff(input :string[]) :number {
    return input.map(diff)
        .reduce( (acc, n) => acc + n, 0 );
}

function _str_len_diff(input :string[]) :number {
    return input.map( (str) => encoded_str(str).length - str.length )
        .reduce( (acc, n) => acc + n, 0 );
}

function main() :void {
    let input = read_input('input/day_8.txt');
    
    const a = str_len_diff(input);
    const b = _str_len_diff(input);
    
    console.log({ first: a, second: b });
}


main();
