// day 5
import * as fs from 'fs';


function read_input(path :string) :string[] {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n');
}

function is_nice(str :string) :boolean {
    return !/ab|cd|pq|xy/.test(str)
        && /(\w)\1/.test(str)
        && /[aiueo]/.test(str)
        && str.match(/[aiueo]/g).length >= 3;
}

function _is_nice(str :string) :boolean {
    return /(\w{2}).*\1/.test(str)
        && /(\w).\1/.test(str);
}

function nice_str_n(input :string[], mode :boolean) :number {
    switch(mode) {
        case true  : return input.filter(is_nice).length;
        case false : return input.filter(_is_nice).length;
    }
}

function main() {
    let input = read_input('input/day_5.txt');
    
    const a = nice_str_n(input, true);
    const b = nice_str_n(input, false);
    
    console.log({ first: a, second: b });
}


main();
