const fs = require('fs');

const input = fs.readFileSync('./input/day_1.txt', 'utf8');
const dist  = input.length/2;


var a = 0; // first part
var b = 0; // second part


for(var i = 0; i < input.length-1; i++)
    {
        // Compare to next character
        if(input[i] == input[i+1])
            {
                a += parseInt( input[i] );
            }
        
        // Compare to character (input.length/2) positions away from i
        if(input[i] == input[ (i + dist) % (input.length)  ])
            {
                b += parseInt( input[i] );
            }
    }

// Compare first to last character
if( input[0] == input[input.length-1] )
    {
        a += parseInt( input[0] );
    }


console.log(a);
console.log(b);