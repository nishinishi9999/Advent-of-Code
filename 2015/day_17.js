/*******************************
* Advent of code 2015 - Day 17
*******************************/
var fs = require('fs');


const containers = fs.readFileSync('./input/day_17.txt', 'utf8')
    .split('\r\n')
    .map( (n) => parseInt(n) );

const POS = 1048575;


function pad_bin(bin)
    {
        var pad = '00000000000000000000';
        return pad.substr(bin.length) + bin;
    }


var res         = 0;
var min_res     = 1000000;
var container_n = {};

var bin;
var n;
var total;
var i, j;

BIN:
for(i = 1; i <= POS; i++)
    {
        total = 0;
        n     = 0;
        bin   = pad_bin( i.toString(2) );
        
        for(j = 0; j < bin.length; j++)
            {
                if(bin[j] == '1')
                    {
                        total += containers[j];
                        n++;
                    }
                
                if(total > 150) { continue BIN; }
            }
        
        if(total == 150)
            {
                res++;
                container_n[n] = container_n[n] == undefined ? 1 : container_n[n]+1;
            }
    }

var min_res = container_n[ Object.keys(container_n).sort( (a, b) => a-b )[0] ];

console.log(res, min_res);