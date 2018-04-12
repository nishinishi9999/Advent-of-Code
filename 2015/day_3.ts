// day 3
import * as fs from 'fs';


interface HousesJSON {
    [propName :string] :number;
}

function read_input(path :string) :string[] {
    return fs.readFileSync(path, 'utf8')
        .split('');
}

function next_pos(c :string, y :number, x :number) {
    switch(c) {
        case '<': return [y, x-1];
        case '>': return [y, x+1];
        case '^': return [y-1, x];
        case 'v': return [y+1, x];
        default: throw Error('Incorrect direction: ' + c);
    }
}

function house_n(input :string[], santa_n :number) :number {
    let [y, x] = [0, 0];
    let houses = { '0,0': 1 }
    let key :string;
    
    // Initialize house map
    let santa = new Array(santa_n).fill(0).map( (i) => ({
        y: 0,
        x: 0,
    }));
    
    
    for(let i = 0, turn = 0; i < input.length; i++, turn = (turn+1) % santa_n) {
        [ santa[turn].y, santa[turn].x ] = next_pos(input[i], santa[turn].y, santa[turn].x);
        
        key = `${santa[turn].y},${santa[turn].x}`;
        
        if(!houses[key]) houses[key] = 1;
        else houses[key]++;
    }
    
    return Object.keys(houses).length;
}

function main() :void {
    let input = read_input('input/day_3.txt');
    //let input = '^v'.split('');
    
    const a = house_n(input, 1);
    const b = house_n(input, 2);
    
    console.log({ first: a, second: b });
}


main();
