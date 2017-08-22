/******************************
* Advent of code 2015 - Day 8
******************************/
var fs = require('fs');


const input = fs.readFileSync('./input/day_8.txt', 'utf8')
    .split('\r\n')
    .map( (line) => line.split('') );

console.log(input);
//process.exit();

var literal_len = 0;
var memory_len  = 0;
var total       = 0;

var encode = '';
var enc_literal_len = 0;

for(var i = 0; i < input.length; i++)
    {
        literal_len += input[i].length;
        memory_len  += eval(input[i]).length;
        
        encode = input[i]
            .replace(/\\/g, '\\')
            .replace(/"/g, '\"');
        
        enc_literal_len += encode.length + 2; // Start and end "
    }

total = literal_len - memory_len;

console.log(total, enc_literal_len - memory_len);

/**
console.log( '"' + '""'.replace(/\\/g, '\\').replace(/"/g, '\\"') + '"' );
console.log( '"' + '"abc"'.replace(/\\/g, '\\').replace(/"/g, '\\"') + '"' );
console.log( '"' + '"aaa\\"aaa"'.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"' );
console.log( JSON.stringify('"\x27"' );
**/