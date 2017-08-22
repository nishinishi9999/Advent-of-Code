/*******************************
* Advent of code 2015 - Day 15
*******************************/
var fs = require('fs');


const input = fs.readFileSync('./input/day_15.txt', 'utf8')
    .replace(/:/g, '')
    .replace(/,/g, '')
    .split('\r\n');

var res          = 0;
var res_calories = 0;


function get_pos(characteristic, list, list2, i, qty, qty_sum)
    {
        if(i == 4 && qty_sum == 100)
            {
                var total = 1;
                
                for(var j = 0; j < list2.length-1; j++)
                    {
                        var sub =
                              characteristic[ list[0] ][ list2[j] ] * qty[0]
                            + characteristic[ list[1] ][ list2[j] ] * qty[1]
                            + characteristic[ list[2] ][ list2[j] ] * qty[2]
                            + characteristic[ list[3] ][ list2[j] ] * qty[3];
                        
                        total *= sub < 0 ? 0 : sub;
                        
                        if(total == 0) { break; }
                    }
                
                if(total > res) { res = total; }
                
                if(
                     (( characteristic[ list[0] ][ 'calories' ] * qty[0]
                      + characteristic[ list[1] ][ 'calories' ] * qty[1]
                      + characteristic[ list[2] ][ 'calories' ] * qty[2]
                      + characteristic[ list[3] ][ 'calories' ] * qty[3]) == 500 )
                      && total > res_calories
                  )
                    {
                        res_calories = total;
                    }
                
                return;
            }
        else if(qty_sum >= 100 || i >= 4)
            {
                return;
            }
        
        for(var j = 0; j < 100; j++)
            {
                qty[i] = j;
                
                get_pos(characteristic, list, list2, i+1, qty, qty_sum+j);
            }
    }


/**************
* Parse input
**************/
var characteristic = {};

for(var i = 0; i < input.length; i++)
    {
        var line = input[i].split(' ');
        
        characteristic[line[0]] = {};
        
        for(var j = 1; j < line.length; j += 2)
            {
                characteristic[line[0]][line[j]] = parseInt(line[j+1]);
            }
    }

var list  = Object.keys(characteristic);
var list2 = Object.keys(characteristic[list[0]]);


get_pos(characteristic, list, list2, 0, [0, 0, 0, 0], 0);
console.log(res, res_calories);