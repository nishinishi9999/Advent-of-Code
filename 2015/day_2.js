/******************************
* Advent of code 2015 - Day 2
******************************/
var fs = require('fs');


const input = fs.readFileSync('./input/day_2.txt', 'utf8')
    .split('\r\n')
    .map( (line) => line.split('x').map( (n) => parseInt(n) ) );


function paper_sqft(lwh)
    {
        var [l, w, h] = lwh;
        
        var sort = lwh.sort( (a, b) => a-b );
        var s    = sort[0] * sort[1];
        
        return 2*l*w + 2*w*h + 2*h*l + s;
    }

function ribbon_ft(lwh)
    {
        var [l, w, h] = lwh;
        
        var sort = lwh.sort( (a, b) => a-b );
        
        return sort[0]*2 + sort[1]*2 + l*w*h;
    }


var total_paper  = 0;
var total_ribbon = 0;

for(var i = 0; i < input.length; i++)
    {
        total_paper  += paper_sqft(input[i]);
        total_ribbon += ribbon_ft(input[i]);
    }

console.log(total_paper, total_ribbon);