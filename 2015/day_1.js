/******************************
* Advent of code 2015 - Day 1
******************************/
const fs = require('fs');


const map   = { ')': -1, '(': 1 };
const input = fs.readFileSync('./input/day_1.txt', 'utf8').split('');


var floor = 0;
var pos;

for(var i = 0; i < input.length; i++)
    {
        floor += map[input[i]];
        
        if(floor == -1 && pos === undefined) { pos = i+1; }
    }

console.log(floor, pos);