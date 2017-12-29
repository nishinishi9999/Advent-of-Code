/*******************************
* Advent of code 2015 - Day 24
*******************************/
var fs = require('fs');


var input = fs.readFileSync('./input/day_24.txt', 'utf8').split('\r\n')
    .map( (n) => parseInt(n) );


var TOTAL   = sum(input);
var THIRD   = TOTAL / 3;
var QUARTER = TOTAL / 4;
var RES_ENTANGLEMENT = Infinity;


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

/*************************************
* n     : Target iteration
* i     : Current iteration
* prev_j: Previous index
* total : Sum total up to now
* Part  : Weight of the first group
*************************************/
function find_group_1(n, i, prev_j, total, ent, weight)
    {
        var temp;
        var ret = false;
        
        if(n == i)
            {
                if(total == weight && sum(input) == (TOTAL-weight))
                    {
                        RES_ENTANGLEMENT = ent;
                        
                        return true;
                    }
                else
                    {
                        return false;
                    }
            }
        
        for(var j = prev_j+1; j < input.length; j++)
            {
                if(input[j] == false) { continue; }
                
                temp = input[j];
                
                if(total + temp <= weight && ent*temp < RES_ENTANGLEMENT)
                    {
                        input[j] = false;
                        
                        ret = find_group_1( n, i+1, j, total+temp, ent*temp, weight ) || ret;
                        
                        input[j] = temp;
                    }
            }
        
        
        return ret;
    }


for(var i = 1; i < input.length; i++)
    {
        var ret = find_group_1(i, 0, -1, 0, 1, THIRD);
        if(ret) { break; }
    }
        
console.log(RES_ENTANGLEMENT);
RES_ENTANGLEMENT = Infinity;


for(var i = 1; i < input.length; i++)
    {
        var ret = find_group_1(i, 0, -1, 0, 1, QUARTER);
        if(ret) { break; }
    }

console.log(RES_ENTANGLEMENT);