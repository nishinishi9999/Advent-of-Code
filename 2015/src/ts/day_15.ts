// day 15
import * as fs from 'fs';


interface Properties {
    [propName :string] :{
        [propName :string] :number;
    };
}


function read_input(path :string) :string[][] {
    return fs.readFileSync(path, 'utf8')
        .split('\r\n')
        .map( (line) => line.split(': ') );
}

function parse_input(input :string[][]) :Properties {
    let properties = {};
    
    for(let i = 0; i < input.length; i++) {
        properties[ input[i][0] ] = {};
        
        for( const prop of input[i][1].split(', ') ) {
            let arr = prop.split(' ');
            
            properties[ input[i][0] ][ arr[0] ] = parseInt( arr[1] );
        }
    }
    
    return properties;
}

function sum_prop(properties :Properties, prop :string, spoons :number[]) :number {
    let sum = Object.keys(properties).reduce( (acc, name, i) =>
        acc + (properties[name][prop] * spoons[i])
    , 0);
    
    return sum < 0 ? 0 : sum;
}

function search_highest(properties :Properties, props :string[], i :number, spoon_n, spoons :number[], max_spoons :number) :number {
    switch(i === props.length-1) {
        case true: {
            switch(spoon_n === max_spoons) {
                case true: return spoons.reduce( (acc, n, i) =>
                    acc * sum_prop(properties, props[i], spoons)
                , 1);
                default: return 0;
            }
        }
        default: {
            let high_n  = 0;
            
            for(let j = 0; j + spoon_n <= max_spoons; j++) {
                let _n = search_highest(properties, props, i+1, spoon_n + j, spoons.concat(j), max_spoons);
                
                if(_n > high_n) high_n = _n;
            }
            
            return high_n;
        }
    }
}

function _search_highest(properties :Properties, props :string[], i :number, spoon_n, spoons :number[], max_spoons :number) :number {
    switch(i === props.length) {
        case true: {
            switch(spoon_n === max_spoons && sum_prop(properties, 'calories', spoons) === 500) {
                case true: return Array(spoons.length-1).fill(0).reduce( (acc, n, i) =>
                    acc * sum_prop(properties, props[i], spoons)
                , 1);
                default: return 0;
            }
        }
        default: {
            let high_n  = 0;
            
            for(let j = 0; j + spoon_n <= max_spoons; j++) {
                let _n = _search_highest(properties, props, i+1, spoon_n + j, spoons.concat(j), max_spoons);
                
                if(_n > high_n) high_n = _n;
            }
            
            return high_n;
        }
    }
}

function main() :void {
    let input      = read_input('input/day_15.txt');
    let properties = parse_input(input);
    let props      = Object.keys( properties[ Object.keys(properties)[0] ] );
    
    const def_i       = 0;
    const def_spoon_n = 0;
    const max_spoons  = 100;
    
    const a = search_highest(properties, props, def_i, def_spoon_n, [], max_spoons);
    const b = _search_highest(properties, props, def_i, def_spoon_n, [], max_spoons);
    
    console.log({ first: a, second: b });
}


main();
