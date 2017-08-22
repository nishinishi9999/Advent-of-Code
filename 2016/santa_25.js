// santa 25

var fs = require('fs');
var sleep = require('sleep-promise');


var vars = {};


function get_val(x)
    {
        return vars[x] == undefined ? parseInt(x) : parseInt(vars[x]);
    }


process.on('message', function(a)
{
    vars['a'] = a;
    console.log('Thread initialized with start value: '+a);

    var input = fs.readFileSync('input_23.txt', 'utf8')
        .split('\n')
        .map( (line) => line.trim().split(' ') );


    for(var i = 0; i < input.length; i++)
        {
            var entry = input[i];
            
            if( entry[0] == 'inc' )
                {
                    vars[ entry[1] ]++;
                }
            else if( entry[0] == 'dec' )
                {
                    vars[ entry[1] ]--;
                }
            else if( entry[0] == 'cpy' )
                {
                    vars[ entry[2] ] = get_val(entry[1]);
                }
            else if( entry[0] == 'jnz' )
                {
                    var x = get_val(entry[1]);
                    var y = get_val(entry[2]);
                    
                    if(x != 0)
                        {
                            i--;
                            i += y;
                        }
                }
            else if( entry[0] == 'tgl' )
                {
                    var x = get_val(entry[1]);
                    
                    if(input[i+x] == undefined) { continue; }
                    
                    if     (input[i+x][0] == 'inc') { input[i+x][0] = 'dec'; }
                    else if(input[i+x][0] == 'dec') { input[i+x][0] = 'inc'; }
                    else if(input[i+x][0] == 'cpy') { input[i+x][0] = 'jnz'; }
                    else if(input[i+x][0] == 'jnz') { input[i+x][0] = 'cpy'; }
                    else if(input[i+x][0] == 'tgl') { input[i+x][0] = 'inc'; }
                }
            else if( entry[0] == 'out' )
                {
                    var x = get_val(entry[1]);
                    
                    console.log('out', x);
                }
            
            //console.log(i, vars);
        }
    
    
    console.log(vars);
});