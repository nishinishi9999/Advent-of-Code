// day 4
const fs = require('fs');

const A = 'abcdefghijklmnopqrstuvwxyz'.split('');

const input = fs.readFileSync('./input/day_4.txt', 'utf8')
    .split('\r\n')
    .map( (line) => line.split(' ') );
    


var a = 0;
var b = 0;
var line;

FIRST:
for(var i = 0; i < input.length; i++)
    {
        line = input[i];
        
        for(var j = 0; j < line.length; j++)
            {
                for(var k = j+1; k < line.length; k++)
                    {
                        if(line[j] == line[k])
                            {
                                continue FIRST;
                            }
                    }
            }
        
        a++;
    }


SECOND:
for(var i = 0; i < input.length; i++)
    {
        // Sort input by alphabetical order
        line = input[i].map( (word) => word.split('').sort( (a, b) => (A.indexOf(b) < A.indexOf(a)) ).join('') );
        
        for(var j = 0; j < line.length; j++)
            {
                for(var k = j+1; k < line.length; k++)
                    {
                        if(line[j] == line[k])
                            {
                                continue SECOND;
                            }
                    }
            }
        
        b++;
    }


console.log('first:', a, 'second:', b);
