/******************************
* Advent of code 2015 - Day 4
******************************/
var fs  = require('fs');
var md5 = require('md5');


const input = 'bgvyzdsv';


function find_n_zeroes(n)
    {
        var zeroes = '0'.repeat(n);
        
        for(var i = 0;; i++)
            {
                var digest = md5(input + i);
                
                if(digest.substr(0, n) == zeroes)
                    {
                        return i;
                    }
            }
    }

console.log( find_n_zeroes(5), find_n_zeroes(6) );