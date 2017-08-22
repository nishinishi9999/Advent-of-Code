/*******************************
* Advent of code 2015 - Day 23
*******************************/
var fs = require('fs');

const input = fs.readFileSync('./input/day_23.txt', 'utf8')
    .replace(/,/g, '')
    .split('\r\n')
    .map( (line) => line.split(' ') );


function process(reg)
    {
        for(var i = 0; i < input.length && i >= 0; i++)
            {
                var parts = input[i];
                
                if     ( parts[0] == 'inc' ) { reg[parts[1]]++; }
                else if( parts[0] == 'hlf' ) { reg[parts[1]] = parseInt( reg[parts[1]] / 2 ); }
                else if( parts[0] == 'tpl' ) { reg[parts[1]] *= 3; }
                else if( parts[0] == 'jmp' ) { i += parseInt(parts[1]) - 1; }
                else if( parts[0] == 'jie' ) { if(reg[parts[1]] % 2 == 0) { i += parseInt(parts[2]) - 1; } }
                else if( parts[0] == 'jio' ) { if(reg[parts[1]]     == 1) { i += parseInt(parts[2]) - 1; } }
            }
        
        return reg.b;
    }

console.log( process({a: 0, b: 0}) );
console.log( process({a: 1, b: 0}) );