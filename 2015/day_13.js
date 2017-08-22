/*******************************
* Advent of code 2015 - Day 13
*******************************/
var fs = require('fs');


const input = fs.readFileSync('./input/day_13.txt', 'utf8').split('\r\n');


var relationship  = {};
var res_happiness = 0;


function search_order(people, order, first, last, total)
    {
        if(people.length == 0)
            {
                total += relationship[last][first];
                total += relationship[first][last];
                
                if(total > res_happiness) { res_happiness = total; }
                return;
            }
        
        for(var i = 0; i < people.length; i++)
            {
                var happiness = relationship[last][people[i]] + relationship[people[i]][last];
                
                var copy = people.slice();
                copy.splice(i, 1);
                
                search_order(copy, order.concat(people[i]), first, people[i], total + happiness);
            }
    }


/**************
* Parse input
**************/
for(var i = 0; i < input.length; i++)
    {
        var line = input[i].substr(0, input[i].length-1).split(' ');
        var [a, b, status, quantity] = [ line[0], line[10], line[2], parseInt(line[3]) ];
        
        if(relationship[a] === undefined) { relationship[a] = {}; }
        
        relationship[a][b] = status == 'gain' ? quantity : -quantity;
    }

var people = Object.keys(relationship);

relationship['You'] = {};
for(var name in relationship)
    {
        if(name != 'You') { relationship[name]['You'] = 0; }
        if(name != 'You') { relationship['You'][name] = 0; }
    }


/*********
* Part 1
*********/
var copy  = people.slice();
var first = copy[0];
copy.splice(0, 1);

search_order(copy, [first], first, first, 0);

console.log(res_happiness);


/*********
* Part 2
*********/
res_happiness = 0;

people.push('You');

copy = people.slice();
copy.splice(0, 1);

search_order(copy, [first], first, first, 0);

console.log(res_happiness);