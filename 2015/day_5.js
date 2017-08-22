/******************************
* Advent of code 2015 - Day 5
******************************/
var fs = require('fs');


const input = fs.readFileSync('./input/day_5.txt', 'utf8').split('\r\n');


function contains_three_vowels(str)
    {
        var match = str.match(/a|i|u|e|o/g);
        
        return match != null && match.length >= 3;
    }

function contains_double_letter(str)    { return /(.)\1/.test(str);        }
function doesnt_contain_prohibited(str) { return !/ab|cd|pq|xy/.test(str); }

function contains_two_pairs(str) { return /(.{2}).*\1/.test(str); }
function contains_xyx(str)       { return /(.).\1/.test(str);     }


function is_nice(str, type)
    {
        if(type == 1)
            {
                return contains_three_vowels(str)
                    && contains_double_letter(str)
                    && doesnt_contain_prohibited(str);
            }
        else
            {
                return contains_two_pairs(str)
                    && contains_xyx(str);
            }
    }


var part_1_res = 0;
var part_2_res = 0;

for(var i = 0; i < input.length; i++)
    {
        if( is_nice(input[i], 1) ) { part_1_res++; }
        if( is_nice(input[i], 2) ) { part_2_res++; }
    }

console.log(part_1_res, part_2_res);