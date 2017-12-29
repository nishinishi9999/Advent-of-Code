// day 7
const fs = require('fs');

var input = fs.readFileSync('./input/day_7.txt', 'utf8')
    .split('\r\n');


var nodes = {};


function find_weight(root, name)
    {
        var node = nodes[name];
        var w = node.weight;
        
        for(var i = 0; i < node.children.length; i++)
            {
                w += find_weight(root, node.children[i]);
            }
        
        return w;
    }


function find_unbalance(name, i)
    {
        var node     = nodes[name];
        if(node.children === undefined) { return; }
        
        var children = node.children;
        var w = [];
        
        var diff_name;
        
        
        for(var j = 0; j < children.length; j++)
            {
                w.push( find_weight(children[j], children[j]) );
                
                diff_name = w[0] == w[1] ? children[2] :
                            w[0] == w[2] ? children[1] :
                            w[1] == w[2] ? children[0] :
                            name;
            }
        
        console.log(name, ' -> ', diff_name);
        
        if(name != diff_name) find_unbalance(diff_name);
    }


/**
* Parse input
**/
for(var i = 0; i < input.length; i++)
    {
        var match = input[i].match(/(\w+) \((\d+)\)(?: -> (.+))?/);
        var name  = match[1];
        
        nodes[name] = {};
        nodes[name].weight = parseInt(match[2]);
        nodes[name].children  = [];
        //nodes[name].order  = 0;
        nodes[name].parent = '';
        
        if(match[3] !== undefined)
            {
                var children = match[3].split(', ');
                nodes[name].children = children;
            }
    }


/**
* Create tree
**/
var keys = Object.keys(nodes);
var node, name;
var i, j;

for(i = 0; i < keys.length; i++)
    {
        name = keys[i];
        node = nodes[name];
        
        if( node.children.length > 0 )
            {
                for(j = 0; j < node.children.length; j++)
                    {
                        nodes[ node.children[j] ].parent = name;
                        //nodes[ node.children[j] ].order  = node.order+1;
                    }
            }
    }


var a, b;
for(var i = 0; i < keys.length; i++) { if(nodes[keys[i]].parent === '') { a = keys[i]; } }
find_unbalance(a, 0);

//console.log("\n"+'ugml', find_weight('ugml', 'ugml'));

console.log('first:', a, 'second:', b);
