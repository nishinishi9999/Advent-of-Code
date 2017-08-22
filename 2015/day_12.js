/*******************************
* Advent of code 2015 - Day 12
*******************************/
var jsonfile = require('jsonfile');


const input = jsonfile.readFileSync('./input/day_12.json');


var total     = 0;
var red_total = 0;


function deep_search(json, has_red)
    {
        var is_json = json.length === undefined;
        
        for(var key in json)
            {
                if(is_json && json[key] == 'red')
                    {
                        has_red = true;
                        break;
                    }
            }
        
        for(var key in json)
            {
                if( typeof(json[key]) == 'number' )
                    {
                        total += json[key];
                        
                        if(!has_red) { red_total += json[key]; }
                    }
                
                if(typeof(json[key]) == 'object')
                    {
                        deep_search(json[key], has_red);
                    }
            }
    }

deep_search(input, false);

console.log(total, red_total);