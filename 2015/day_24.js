/*******************************
* Advent of code 2015 - Day 24
*******************************/
var fs = require('fs');
var jsonfile = require('jsonfile');


var input = fs.readFileSync('./input/day_24.txt', 'utf8').split('\r\n').map( (n) => parseInt(n) );

const TOTAL = sum(input);
const THIRD = TOTAL / 3;

function sum(arr)
    {
        var res = 0;
        
        for(var i = 0; i < arr.length; i++)
            {
                if(arr[i] == false) { continue; }
                
                res += arr[i];
            }
        
        return res;
    }

function divide(input, division)
    {
        if( sum(input) == sum(division[0]) )
            {
                //
            }
        
        for(var i = 0; i < input.length; i++)
            {
                if(input[i] == false) { continue; }
            }
    }

var division = [ [], [] ];
//divide(input, division);


var LEN    = input.length;
var bin    = '';
var pad    = '0'.repeat(LEN);

var target = '1'.repeat(LEN);

var first  = 0;
var pos    = [];
var res    = [];

/**
FIRST_N:
for(var i = 1; bin != target; i++)
    {
        first = 0;
        
        bin = i.toString(2);
        bin = pad.substr(bin.length) + bin;
        
        for(var j = 0; j < LEN; j++)
            {
                if(bin[j] == '1') { first += input[j]; }
                
                if(first > THIRD) { continue FIRST_N; }
            }
        
        if(i % 1000000 == 0) { console.log('FIRST', bin, i, first); }
        if(first == THIRD) { pos.push(bin); }
    }
**/

pos = jsonfile.readFileSync('./pos.json');

var a, b, i, j, k;
var bin1, bin2;
var third;

FIRST_POS:
for(a = 0; a < pos.length; a++)
    {
        bin1 = pos[a];
        
        SECOND_POS:
        for(b = a+1; b < pos.length; b++)
            {
                bin2 = pos[b];
                
                for(i = 0; i <= LEN; i++)
                    {
                        if(bin1[i] == '1' && bin2[i] == '1') { continue SECOND_POS; }
                    }

                third = '';
                for(i = 0; i <= LEN; i++)
                    {
                        third += bin1[i] == '0' && bin2[i] == '0' ? '1' : '0';
                        
                    }
                //console.log(third);
            }
        
        console.log(a);
    }


console.log(res);