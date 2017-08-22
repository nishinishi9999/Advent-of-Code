/*******************************
* Advent of code 2015 - Day 19
*******************************/
var fs = require('fs');


const input = fs.readFileSync('./input/day_19.txt', 'utf8').split('\r\n');


var list = {};
var n    = {};

for(var i = 0; i < input.length-2; i++)
    {
        var line = input[i].split(' ');
        
        n[line[0]] = n[line[0]] == undefined ? 1 : n[line[0]]+1;
    }

var string = input[input.length-1];
var sub    = string.match(/[A-Z][a-z]*/g);

var total = 1;
for(var i = 0; i < sub.length; i++)
    {
        if( n[sub[i]] == undefined ) { console.error('NOT FOUND', sub[i]) }
        
        total *= n[ sub[i] ];
    }

//console.log(total, n);
//console.log(sub);