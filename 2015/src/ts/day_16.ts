// day 16
import * as fs from 'fs';


interface Grandma {
    children    :number;
    cats        :number;
    samoyeds    :number;
    pomeranians :number;
    vizslas     :number;
    goldfish    :number;
    trees       :number;
    cars        :number;
    perfumes    :number;
}


function read_input(path :string) :string[] {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n');
}

function parse_input(input :string[]) :Grandma[] {
    return input.map( (line) => {
        let attrs   = line.match(/(\w+) (\d+)|(\w+): (\d+)/g);
        
        let grandma = {
            children    : -1,
            cats        : -1,
            samoyeds    : -1,
            pomeranians : -1,
            vizslas     : -1,
            goldfish    : -1,
            trees       : -1,
            cars        : -1,
            perfumes    : -1
        }
        
        for(let i = 1; i < attrs.length; i++) {
            const [attr, val] = attrs[i].split(': ');
            
            grandma[attr] = parseInt(val);
        }
        
        return grandma;
    });
}

function is_subset(a :Grandma, b :Grandma) :boolean {
    return Object.keys(a).every( (key) => a[key] === -1
        || a[key] === b[key]
    );
}

function is_sue(a :Grandma, b :Grandma) :boolean {
    return Object.keys(a).every( (key) => {
        switch(key) {
            case 'cats'       :
            case 'trees'      : return a[key] === -1 || b[key]   < a[key];
            case 'pomeranians':
            case 'goldfish'   : return a[key] === -1 || b[key]   > a[key];
            default           : return a[key] === -1 || b[key] === a[key];
        }
    });
}

function find_grandma(grandma :Grandma[], target :Grandma, i :number) :number {
    if(i == grandma.length) return -1;
    
    switch( is_subset(grandma[i], target) ) {
        case true : return i + 1;
        default   : return find_grandma(grandma, target, i+1);
    }
}

function _find_grandma(grandma :Grandma[], target :Grandma, i :number) :number {
    if(i == grandma.length) return -1;
    
    switch( is_sue(grandma[i], target) ) {
        case true : return i + 1;
        default   : return _find_grandma(grandma, target, i+1);
    }
}

function main() :void {
    let input   = read_input('input/day_16.txt');
    let grandma = parse_input(input);
    
    let target = {
        children    : 3,
        cats        : 7,
        samoyeds    : 2,
        pomeranians : 3,
        akitas      : 0,
        vizslas     : 0,
        goldfish    : 5,
        trees       : 3,
        cars        : 2,
        perfumes    : 1
    };
    
    
    const a =  find_grandma(grandma, target, 0);
    const b = _find_grandma(grandma, target, 0);
    
    console.log({ first: a, second: b });
}


main();
