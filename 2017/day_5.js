// day 5
const fs = require('fs');

const INPUT = fs.readFileSync('./input/day_5.txt', 'utf8').split('\r\n').map( (n) => parseInt(n) );


var a = 0;
var b = 0;

var i, temp, input;

/**
* First part
**/
input = INPUT.slice();

for(i = 0; i < input.length; )
    {
        temp = input[i];
        input[i]++;
        
        i += temp;
        
        a++;
    }

/**
* Second part
**/
input = INPUT.slice();

for(i = 0; i < input.length; )
    {
        temp = input[i];
        input[i] += input[i] >= 3 ? -1 : 1;
        
        i += temp;
        
        b++;
    }


console.log('first:', a, 'second:', b);