// day 10
import * as fs from 'fs';


function look_and_say(input :string) {
    return input.match(/(\d)\1*/g)
        .map( (n) => n.length.toString() + n[0] )
        .join('');
}

function look_and_say_len(str :string, round_n :number) :number {
    for(let i = 0; i < round_n; i++) {
        str = look_and_say(str);
    }
    
    return str.length;
}

function main() {
    const input = '1321131112';
    
    const a = look_and_say_len(input, 40);
    const b = look_and_say_len(input, 50);
    
    console.log({ first: a, second: b });
}


main();
