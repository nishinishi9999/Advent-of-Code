/******************************
* Advent of code 2015 - Day 6
******************************/
var fs = require('fs');


const input = fs.readFileSync('./input/day_6.txt', 'utf8')
    .split('\r\n')
    .map( (line) => line.match(/(.+) (\d+),(\d+).+ (\d+),(\d+)/).slice(1) );


function turn_on(coord, map, type)
    {
        var [x1, y1, x2, y2] = coord;
        
        for(var y = y1-1; y < y2; y++)
            {
                for(var x = x1-1; x < x2; x++)
                    {
                        map[y][x] = type == 1 ? true : (map[y][x]+1);
                    }
            }
    }

function turn_off(coord, map, type)
    {
        var [x1, y1, x2, y2] = coord;
        
        for(var y = y1-1; y < y2; y++)
            {
                for(var x = x1-1; x < x2; x++)
                    {
                        map[y][x] = type == 1 ? false : (map[y][x]-1);
                        
                        if(map[y][x] < 0) { map[y][x] = 0; }
                    }
            }
    }

function toggle(coord, map, type)
    {
        var [x1, y1, x2, y2] = coord;
        
        for(var y = y1-1; y < y2; y++)
            {
                for(var x = x1-1; x < x2; x++)
                    {
                        map[y][x] = type == 1 ? !map[y][x] : (map[y][x]+2);
                    }
            }
    }


var light_map      = new Array(1000);
var brightness_map = new Array(1000);
for(var i = 0; i < 1000; i++) { light_map[i]      = new Array(1000).fill(false);  }
for(var i = 0; i < 1000; i++) { brightness_map[i] = new Array(1000).fill(0);      }

for(var i = 0; i < input.length; i++)
    {
        var com   = input[i][0];
        var coord = input[i].slice(1);
        
        if(com == 'turn on')
            {
                turn_on(coord, light_map,      1);
                turn_on(coord, brightness_map, 2);
            }
        else if(com == 'turn off')
            {
                turn_off(coord, light_map,      1);
                turn_off(coord, brightness_map, 2);
            }
        else if(com == 'toggle')
            {
                toggle(coord, light_map,      1);
                toggle(coord, brightness_map, 2);
            }
    }


var light_n      = 0;
var brightness_n = 0;

for(var y = 0; y < 1000; y++)
    {
        for(var x = 0; x < 1000; x++)
            {
                if(light_map[y][x]) { light_n++; }
                
                brightness_n += brightness_map[y][x];
            }
    }

console.log(light_n, brightness_n);