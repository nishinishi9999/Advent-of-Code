/******************************
* Advent of code 2015 - Day 3
******************************/
var fs = require('fs');


const input = fs.readFileSync('./input/day_3.txt', 'utf8').split('');
const lr = { '<': -1, '>': 1 };
const ud = { '^': -1, 'v': 1 };


function houses_with_n_santas(n)
    {
        var map = { '0 0': 1 };
        var x   = new Array(n).fill(0);
        var y   = new Array(n).fill(0);
        
        for(var i = 0; i < input.length; i++)
            {
                var turn = i % n;
                
                if     ( lr[input[i]] ) { x[turn] += lr[input[i]]; }
                else if( ud[input[i]] ) { y[turn] += ud[input[i]]; }
                
                var pos = x[turn] + ' ' + y[turn];
                map[pos] = map[pos] === undefined ? 1 : map[pos] + 1;
            }

        return Object.keys(map).length;
    }


console.log( houses_with_n_santas(1), houses_with_n_santas(2) );