/*******************************
* Advent of code 2015 - Day 16
*******************************/
var fs = require('fs');


const input = fs.readFileSync('./input/day_16.txt', 'utf8')
    .replace(/:/g, '')
    .replace(/,/g, '')
    .split('\r\n');

const target =
    {
        children    : 3,
        cats        : 7,
        samoyeds    : 2,
        pomeranians : 3,
        akitas      : 0,
        vizslas     : 0,
        goldfish    : 5,
        trees       : 3,
        cars        : 2,
        perfumes    : 1
    }


/**************
* Parse input
**************/
var aunts = {};
for(var i = 0; i < input.length; i++)
    {
        var line = input[i].split(' ');
        
        aunts[line[1]] = {};
        
        //'children cats samoyeds pomeranians akitas vizslas goldfish trees cars perfumes'.split(' ')
        //    .forEach( (p) => aunts[line[1]][p] = false );
        
        for(var j = 2; j < line.length; j += 2)
            {
                aunts[line[1]][line[j]] = parseInt(line[j+1]);
            }
    }


var res;

AUNT:
for(var aunt in aunts)
    {
        for(var obj in aunts[aunt])
            {
                if(aunts[aunt][obj] != target[obj]) { continue AUNT; }
            }
        
        res = aunt;
        break;
    }

console.log(res);


AUNT:
for(var aunt in aunts)
    {
        for(var obj in aunts[aunt])
            {
                if(obj == 'cats' || obj == 'trees')
                    {
                        if(aunts[aunt][obj] <= target[obj]) { continue AUNT; }
                    }
                else if(obj == 'pomeranians' || obj == 'goldfish')
                    {
                        if(aunts[aunt][obj] >= target[obj]) { continue AUNT; }
                    }
                else
                    {
                        if(aunts[aunt][obj] != target[obj]) { continue AUNT; }
                    }
            }
        
        res = aunt;
        break;
    }

console.log(res);