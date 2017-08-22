/*******************************
* Advent of code 2015 - Day 14
*******************************/
var fs = require('fs');


const input = fs.readFileSync('./input/day_14.txt', 'utf8').split('\r\n');


var reindeer = {};

for(var i = 0; i < input.length; i++)
    {
        var line = input[i].split(' ');
        var [name, speed, fly_s, rest_s] = [ line[0], parseInt(line[3]), parseInt(line[6]), parseInt(line[13]) ];
        
        reindeer[name] =
            {
                speed   : speed,
                fly_s   : fly_s,
                rest_s  : rest_s,
                resting : 0,
                to_rest : fly_s,
                total   : 0,
                points  : 0
            };
    }


for(var i = 0; i < 2503; i++)
    {
        for(var name in reindeer)
            {
                if(reindeer[name].resting > 0)
                    {
                        reindeer[name].resting--;
                    }
                else
                    {
                        reindeer[name].total += reindeer[name].speed;
                        reindeer[name].to_rest--;
                        
                        if(reindeer[name].to_rest == 0)
                            {
                                reindeer[name].resting = reindeer[name].rest_s;
                                reindeer[name].to_rest = reindeer[name].fly_s;
                            }
                    }
            }
        
        /****************************************************************************
        * Add a point to the leading reindeer and those that have the same distance
        ****************************************************************************/
        var lead = Object.keys(reindeer).sort( (a, b) => reindeer[b].total - reindeer[a].total );
        
        lead.filter ( (name) => reindeer[name].total == reindeer[ lead[0] ].total )
            .forEach( (name) => reindeer[name].points++ );
        
    }

console.log(reindeer);

var res_name        = Object.keys(reindeer).sort( (a, b) => reindeer[b].total - reindeer[a].total )[0];
var res_points_name = Object.keys(reindeer).sort( (a, b) => reindeer[b].total - reindeer[a].total )[0];

console.log( res_name,        reindeer[res_name].total         );
console.log( res_points_name, reindeer[res_points_name].points );