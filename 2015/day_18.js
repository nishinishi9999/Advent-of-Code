/*******************************
* Advent of code 2015 - Day 18
*******************************/
var fs = require('fs');


var input = fs.readFileSync('./input/day_18.txt', 'utf8')
    .split('\r\n')
    .map( (line) => line.split('') );


function n_neighbors(y, x)
    {
        var n = 0;
        
        for(var i = -1; i < 2; i++)
            {
                for(var j = -1; j < 2; j++)
                    {
                        if(
                            input[y+i] != undefined
                            && input[y+i][x+j]
                            && input[y+i][x+j] == '#'
                            && !(i == 0 && j == 0)
                          )
                            {
                                n++;
                            }
                    }
            }
        
        return n;
    }


for(var i = 0; i < 100; i++)
    {
        /**
        input[0][0]   = '#';
        input[0][99]  = '#';
        input[99][0]  = '#';
        input[99][99] = '#';
        **/
        
        var temp = new Array(100);
        for(var j = 0; j < 100; j++) { temp[j] = new Array(100); }
        
        for(var y = 0; y < 100; y++)
            {
                for(var x = 0; x < 100; x++)
                    {
                        var neighbors = n_neighbors(y, x);
                        
                        temp[y][x] = input[y][x] == '#'
                            ? neighbors == 2 || neighbors == 3
                                ? '#'
                                : '.'
                            : neighbors == 3
                                ? '#'
                                : '.';
                    }
            }
        
        input = temp;
        
    }

/**
input[0][0]   = '#';
input[0][99]  = '#';
input[99][0]  = '#';
input[99][99] = '#';
**/


var total = 0;

for(var y = 0; y < 100; y++)
    {
        for(var x = 0; x < 100; x++)
            {
                if(input[y][x] == '#') { total++; }
            }
    }

console.log(total);