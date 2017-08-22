/*******************************
* Advent of code 2015 - Day 25
*******************************/
var map = [];

var x = 1;

for(var i = 0; i < 10; i++)
    {
        if(map[i] === undefined) { map[i] = []; }
        
        for(var j = map.length-1; j > -1; j--)
            {
                map[j].push(x++);
            }
    }

console.log(map);