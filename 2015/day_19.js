/*******************************
* Advent of code 2015 - Day 19
*******************************/
var fs = require('fs');


var input = fs.readFileSync('./input/day_19.txt', 'utf8').split('\r\n').filter( (str) => str != '');


function get_pos(list, target)
    {
        var pos  = 0;
        var past = [];
        
        var target_div = target.split(/([A-Z][a-z]*)/g).filter( (str) => str != '' );
        
        for(var i = 0; i < target_div.length; i++)
            {
                var m = target_div[i];
                
                if( list[m] )
                    {
                        for(var j = 0; j < list[m].length; j++)
                            {
                                var past_str = '';
                                for(var k = 0; k < target_div.length; k++)
                                    {
                                        past_str += k == i
                                            ? list[m][j]
                                            : target_div[k];
                                    }
                                
                                if(past.includes(past_str)) { continue; }
                                
                                pos++;
                                
                                past.push(past_str);
                            }
                    }
            }
        
        
        return pos;
    }


var list   = {};
var target = input.splice( input.length-1, 1 )[0];

for(var i = 0; i < input.length; i++)
    {
        var [match, a, b] = input[i].match(/(\w+) => (\w+)/);
        
        if(list[a] == undefined) { list[a] = []; }
        
        list[a].push(b);
    }


var pos = get_pos(list, target);
console.log(pos);
console.log(list);
console.log(target);