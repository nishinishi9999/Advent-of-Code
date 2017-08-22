/******************************
* Advent of code 2015 - Day 9
******************************/
var fs = require('fs');


const input = fs.readFileSync('./input/day_9.txt', 'utf8')
    .split('\r\n');


var min_dist = 10000;
var max_dist = 0;

function search_path(places, from_to, last, i, total)
    {
        if(i == 7)
            {
                if(total < min_dist) { min_dist = total; }
                if(total > max_dist) { max_dist = total; }
                
                return;
            }
        
        for(var j = 0; j < places.length; j++)
            {
                if(places[j] === false) { continue; }
                
                var dist = from_to[ last ][ places[j] ];
                
                var copy = places.slice();
                copy.splice(j, 1);
                
                search_path(copy, from_to, places[j], i+1, total+dist);
            }
    }


/**************
* Parse input
**************/
var from_to = {};

for(var i = 0; i < input.length; i++)
    {
        var line = input[i].split(' ');
        if(from_to[line[0]] === undefined) { from_to[line[0]] = {}; }
        if(from_to[line[2]] === undefined) { from_to[line[2]] = {}; }
        
        from_to[line[0]][line[2]] = parseInt(line[4]);
        from_to[line[2]][line[0]] = parseInt(line[4]);
    }

var places = Object.keys(from_to);


for(var i = 0; i < places.length; i++)
    {
        var copy  = places.slice();
        copy.splice(i, 1);
        
        search_path(copy, from_to, places[i], 0, 0);
    }

console.log(min_dist, max_dist);