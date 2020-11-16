/**
* Advent of Code 2017
* Day 9
*
* URL: http://adventofcode.com/2017/day/9
**/
import * as fs from 'fs';


function read_input(path :string) :string {
    return fs.readFileSync(path, 'utf8');
}

function parse_input(input :string) :string {
    return input.replace(/!./g, '')
        .replace(/<.*?>/g, '')
        .replace(/,/g, '');
}

function _parse_input(input :string) :string {
    return input.replace(/!./g, '');
}

function find_subgroups(group :string) :string[] {
    // Remove enclosing brackets
    const _group = group.substr(1, group.length-2);
    
    let groups = [];
    let n      = 0;
    let start  = 0;
    
    for(let i = 0; i < _group.length; i++) {
        if(_group[i] === '{') {
            n++;
            
            if(n === 1) start = i;
        }
        else if(_group[i] === '}') {
            n--;
            
            if(n === 0) {
                groups.push( _group.substring(start, i+1) );
            }
        }
    }
    
    
    return groups;
}

function count_groups(groups :string[], level :number) :number {
    return groups.map( (group) => {
        switch(group === '{}') {
            case true : return level;
            default   : return level + count_groups( find_subgroups(group), level+1 );
        }
    }).reduce( (acc, n) => acc+n, 0 );
}

function _count_groups(group :string) :number {
    return (<string[]>group.match(/<(.*?)>/g))
        .reduce( (acc, _group) => acc + _group.length-2, 0 );
}

function main() :void {
    let input = read_input('../../input/day_9.txt');
    
    const a = count_groups([ parse_input(input) ], 1);
    const b = _count_groups( _parse_input(input) );
    
    console.log({ first: a, second: b });
}


main();
